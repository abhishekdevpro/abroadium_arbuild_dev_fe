"use client";

import { useContext, useState, useEffect, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { AlertCircle, X, Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/router";

const PersonalInformation = () => {
  const {
    resumeData,
    setResumeData,
    handleProfilePicture,
    handleChange,
    resumeStrength,
    setResumeStrength,
    deleteProfilePicture,
  } = useContext(ResumeContext);
  const router = useRouter();
  const { improve } = router.query;

  const [activeTooltip, setActiveTooltip] = useState(null);
  const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); // Default to India
  const [isLoading, setIsLoading] = useState({
    jobTitle: false,
    location: false,
    autoFix: false,
    countryCodes: false,
  });
  const [resolvedFields, setResolvedFields] = useState({});

  const dummyImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlie4MsQ9pJSSKY7DoEpxn3uBAq-rT7in1sA&s";

  useEffect(() => {
    const fetchCountryCodes = async () => {
      setIsLoading((prev) => ({ ...prev, countryCodes: true }));
      try {
        const response = await fetch(
          "https://api.abroadium.com/api/jobseeker/countries"
        );
        if (response.ok) {
          const data = await response.json();
          const sortedCountries = data.data.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setCountryCodes(sortedCountries);
        }
      } catch (error) {
        console.error("Error fetching country codes:", error);
      }
      setIsLoading((prev) => ({ ...prev, countryCodes: false }));
    };

    fetchCountryCodes();
  }, []);

  const fetchJobTitles = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setJobTitleSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, jobTitle: true }));
    try {
      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const jobTitles = data.data.map((item) => item.name);
        setJobTitleSuggestions(jobTitles);
        setShowJobTitleDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching job titles:", error);
    }
    setIsLoading((prev) => ({ ...prev, jobTitle: false }));
  };

  const fetchLocations = async (keyword) => {
    if (!keyword || keyword.length < 1) {
      setLocationSuggestions([]);
      return;
    }

    setIsLoading((prev) => ({ ...prev, location: true }));
    try {
      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker/locations?locations=${encodeURIComponent(
          keyword
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        const locations = data.data.location_names.map((item) => item);
        setLocationSuggestions(locations);
        setShowLocationDropdown(true);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
    setIsLoading((prev) => ({ ...prev, location: false }));
  };

  const handleAutoFix = async (field, content) => {
    if (!content) return;

    setIsLoading((prev) => ({ ...prev, autoFix: true }));

    try {
      let endpoint = "";
      let key = "";

      if (field === "name") {
        endpoint = "/ai-username";
        key = "user name";
      } else if (field === "position") {
        endpoint = "/ai-jobtitle";
        key = "job title";
      } else if (field === "contactInformation") {
        endpoint = "/ai-contact";
        key = "contact information";
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://api.abroadium.com/api/jobseeker${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            key: key,
            keyword: "auto improve",
            content: content,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data.resume_analysis) {
          let updatedValue = null;

          if (field === "name") {
            updatedValue = data.data.resume_analysis.user_name;
          } else if (field === "position") {
            updatedValue = data.data.resume_analysis.job_title;
          } else if (field === "contactInformation") {
            updatedValue = data.data.resume_analysis.contact;
          }

          if (updatedValue) {
            const event = {
              target: {
                name: field,
                value: updatedValue,
              },
            };
            handleChange(event);
            setActiveTooltip(null);

            // Clear errors for this field
            if (resumeStrength?.personal_info_strenght) {
              const updatedStrength = {
                ...resumeStrength,
                personal_info_strenght: {
                  ...resumeStrength.personal_info_strenght,
                  [field]: [],
                },
              };
              setResumeStrength(updatedStrength);
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error auto-fixing ${field}:`, error);
    } finally {
      setIsLoading((prev) => ({ ...prev, autoFix: false }));
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   handleChange(e);
  //  console.log(value.length,"length");
  //   if (value.length > 10) return;

  //   if (name === "position") {
  //     fetchJobTitles(value);
  //   } else if (name === "address") {
  //     fetchLocations(value);
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target

    // Define max lengths for different fields
    const maxLengths = {
      name: 30,
      position: 20,
      contactInformation: 10,
      email: 50,
      address: 50,
    }

    // Check if value exceeds max length for the field
    if (maxLengths[name] && value.length > maxLengths[name]) {
      return
    }

    handleChange(e)

    if (name === "position") {
      fetchJobTitles(value)
    } else if (name === "address") {
      fetchLocations(value)
    }
  }
  const selectSuggestion = (field, value) => {
    const event = {
      target: { name: field, value },
    };
    handleChange(event);
    if (field === "position") {
      setShowJobTitleDropdown(false);
    } else {
      setShowLocationDropdown(false);
    }
  };

  const selectCountryCode = (country) => {
    const newCountryCode = `+${country.phonecode}`;
    setSelectedCountryCode(newCountryCode);

    // Update contact information with new country code
    if (resumeData.contactInformation) {
      const updatedContact = {
        target: {
          name: "contactInformation",
          value: `${resumeData.contactInformation.replace(
            /^(\+\d+\s*)?/,
            ""
          )}`,
        },
      };
      handleChange(updatedContact);
    }

    setShowCountryCodeDropdown(false);
  };

  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };

  const getSuggestions = (field) => {
    return resumeStrength?.personal_info_strenght?.[field] || [];
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowJobTitleDropdown(false);
      setShowLocationDropdown(false);
      setShowCountryCodeDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const formFields = [
    { field: "name", placeholder: "Full Name", type: "text" },
    {
      field: "position",
      placeholder: "Job Title",
      type: "text",
      hasSuggestions: true,
    },
    {
      field: "contactInformation",
      placeholder: "Contact Number",
      type: "tel",
      hasCountryCode: true,
    },
    { field: "email", placeholder: "Email", type: "email" },
    {
      field: "address",
      placeholder: "Address",
      type: "text",
      hasSuggestions: true,
    },
  ];
  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };
  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];

  //   // Special check for contact information to ensure it's validated correctly
  //   if (field === "contactInformation") {
  //     const contactValue = resumeData[field];
  //     console.log("Contact Value: ", contactValue); // Debugging line

  //     const isValidContact = /^(\+\d{1,3}\s?)?$$?\d+$$?[\d\s\-]+$/.test(
  //       contactValue
  //     );
  //     console.log("Is Valid Contact: ", isValidContact); // Debugging line

  //     if (contactValue && !isValidContact) {
  //       return true; // Invalid phone number format
  //     }
  //     return false; // Valid phone number
  //   }

  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };
  // const hasErrors = (field) => {
  //   const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
  //   const fieldValue = resumeData[field]?.trim(); // Trim to check for empty values

  //   // If the field has a value, don't show error (this makes the error disappear instantly)
  //   if (fieldValue) return false;

  //   // Only show errors for empty fields or fields with API-reported errors
  //   return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  // };

  const hasErrors = (field) => {
    const strengthInfo = resumeStrength?.personal_info_strenght?.[field];
    const fieldValue = resumeData[field]?.trim(); // Trim to check for empty values

    // Check for empty required fields
    if (!fieldValue) return true;

    // Special validation for contact information
    if (field === "contactInformation") {
      const isValidContact = /^(\+\d{1,3}\s?)?\(?\d+\)?[\d\s\-]+$/.test(
        fieldValue
      );
      if (!isValidContact) return true;
    }

    // Check for API-reported errors
    return Array.isArray(strengthInfo) && strengthInfo.length > 0;
  };

  const handleContactChange = (e) => {
    const { value } = e.target;
    const fullContactValue = `${value.replace(/^(\+\d+\s*)?/, "")}`;

    // console.log("Updated Contact Value: ", fullContactValue); // Debugging line

    const updatedContact = {
      target: {
        name: "contactInformation",
        value: fullContactValue,
      },
    };
    handleChange(updatedContact);
  };
  // console.log(resumeStrength, "rss");
  const markAsResolved = (field) => {
    // Mark this field as resolved
    setResolvedFields((prev) => ({ ...prev, [field]: true }));

    // Also clear any errors in the resumeStrength for this field
    if (resumeStrength?.personal_info_strenght) {
      const updatedStrength = {
        ...resumeStrength,
        personal_info_strenght: {
          ...resumeStrength.personal_info_strenght,
          [field]: [],
        },
      };
      // console.log(updatedStrength, "ups");
      setResumeStrength(updatedStrength);
    }

    // Close the tooltip
    setActiveTooltip(null);
  };
  const fileInputRef = useRef(null);

  // Enhanced delete function that also resets the file input
  const handleDelete = (e) => {
    deleteProfilePicture(e);

    // Reset the file input to clear the filename
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full items-center md:mt-10 md:px-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white">
        Detail Information
      </h2>

      <div className="flex flex-col items-center gap-6 w-full">
        {/* <div className="flex flex-col items-center gap-4">
          <img
            src={resumeData.profilePicture || dummyImage}
            alt="Profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
          />
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
            onChange={handleProfilePicture}
          />
        </div>
        <button
        onClick={deleteProfilePicture}
        className="bg-red-500 text-white text-sm py-2 px-4 rounded-md cursor-pointer hover:bg-red-600 transition-colors"
      >
        Delete
      </button> */}
        {/* <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <img
          src={resumeData.profilePicture || dummyImage}
          alt="Profile"
          className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
        />
        
        {resumeData.profilePicture && (
          <button
            onClick={deleteProfilePicture}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            aria-label="Delete profile picture"
          >
            ✕
          </button>
        )}
      </div>
      
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
        onChange={handleProfilePicture}
      />
    </div> */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={resumeData?.profilePicture || dummyImage}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover"
            />

            {resumeData?.profilePicture && (
              <button
                onClick={handleDelete}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Delete profile picture"
              >
                ✕
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            name="profileImage"
            accept="image/*"
            className="bg-gray-300 text-sm text-black py-2 px-4 rounded-md cursor-pointer hover:bg-gray-400 transition-colors"
            onChange={handleProfilePicture}
          />
        </div>

        <div className="flex flex-col gap-4 w-full max-w-xl">
          {formFields.map(
            ({ field, placeholder, type, hasSuggestions, hasCountryCode }) => (
              <div
                key={field}
                className="relative group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center relative">
                  {/* If field has a country code (for contact number) */}

                  {hasCountryCode && (
                    <div className="relative w-full">
                      <div className="flex items-center">
                        {/* Country Code Selector */}
                        {/* <div
                          className="absolute left-2 z-10 flex items-center cursor-pointer"
                          onClick={() =>
                            setShowCountryCodeDropdown(!showCountryCodeDropdown)
                          }
                        >
                          <span className="text-gray-700 mr-1">
                            {selectedCountryCode}
                          </span>
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        </div>

                        {showCountryCodeDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg z-50">
                            {countryCodes.map((country) => (
                              <div
                                key={country.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
                                onClick={() => selectCountryCode(country)}
                              >
                                <span>{country.name}</span>
                                <span>+{country.phonecode}</span>
                              </div>
                            ))}
                          </div>
                        )} */}
                        {/* <input
                          type={type}
                          placeholder={placeholder}
                          name={field}
                          className={`w-full p-2 pl-2 border rounded-md outline-none transition-colors ${
                            improve && hasErrors(field)
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          value={
                            resumeData[field]
                              ? resumeData[field].replace(/^(\+\d+\s*)?/, "")
                              : ""
                          }
                          onChange={
                            field === "contactInformation"
                              ? handleContactChange
                              : handleInputChange
                          }
                        /> */}
                        <input
                          type={type}
                          placeholder={placeholder}
                          name={field}
                          className={`w-full p-2 pl-2 border rounded-md outline-none transition-colors ${
                            improve && hasErrors(field)
                              ? "border-red-500 focus:border-red-600"
                              : "border-gray-300 focus:border-blue-500"
                          }`}
                          value={
                            resumeData[field]
                              
                          }
                          onChange={
                            field === "contactInformation"
                              ? handleContactChange
                              : handleInputChange
                          }
                          minLength={3} // ✅ minimum number of characters
                          maxLength={10} // ✅ maximum number of characters
                        />

                        {/* Error Icon for Contact Information */}
                        {improve &&
                          hasErrors(field) &&
                          !resolvedFields[field] && (
                            <button
                              type="button"
                              className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                              onClick={() =>
                                setActiveTooltip(
                                  activeTooltip === field ? null : field
                                )
                              }
                              aria-label="Show suggestions"
                            >
                              <AlertCircle className="w-5 h-5" />
                            </button>
                          )}
                      </div>
                    </div>
                  )}

                  {/* If field does NOT have a country code */}
                  {!hasCountryCode && (
                    <div className="relative w-full">
                      {/* Input Field */}
                      <input
                        type={type}
                        placeholder={placeholder}
                        name={field}
                        className={`w-full p-2 border rounded-md outline-none transition-colors ${
                          improve && hasErrors(field)
                            ? "border-red-500 focus:border-red-600"
                            : "border-gray-300 focus:border-blue-500"
                        }`}
                        value={resumeData[field] || ""}
                        onChange={handleInputChange}
                        onFocus={() => {
                          if (field === "position")
                            setShowJobTitleDropdown(true);
                          if (field === "address")
                            setShowLocationDropdown(true);
                        }}
                      />

                      {/* Error Icon for Other Fields */}
                      {improve &&
                        hasErrors(field) &&
                        !resolvedFields[field] && (
                          <button
                            type="button"
                            className="absolute right-2 mt-2 text-red-500 hover:text-red-600 transition-colors"
                            onClick={() =>
                              setActiveTooltip(
                                activeTooltip === field ? null : field
                              )
                            }
                            aria-label="Show suggestions"
                          >
                            <AlertCircle className="w-5 h-5" />
                          </button>
                        )}

                      {/* Loading Indicator for Job Title & Address Suggestions */}
                      {hasSuggestions &&
                        isLoading[
                          field === "position" ? "jobTitle" : "location"
                        ] && (
                          <div className="absolute right-8">
                            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                          </div>
                        )}
                    </div>
                  )}
                </div>

                {hasSuggestions &&
                  (field === "position"
                    ? showJobTitleDropdown && jobTitleSuggestions.length > 0
                    : showLocationDropdown &&
                      locationSuggestions.length > 0) && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {(field === "position"
                        ? jobTitleSuggestions
                        : locationSuggestions
                      ).map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => selectSuggestion(field, suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}

                {activeTooltip === field && hasErrors(field) && (
                  <div className="absolute z-50 left-8 w-80 bg-white rounded-lg shadow-xl transform transition-all duration-200 ease-in-out border border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <span className="font-medium text-black">
                            Suggestions
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {(field === "name" || field === "position") && (
                            <button
                              onClick={() =>
                                handleAutoFix(field, resumeData[field])
                              }
                              disabled={
                                isLoading.autoFix || !resumeData[field]?.trim()
                              }
                              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isLoading.autoFix ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Auto Fix"
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => markAsResolved(field)}
                            className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md shadow hover:bg-green-700 transition-all"
                          >
                            Mark Resolved
                          </button>
                          <button
                            onClick={() => setActiveTooltip(null)}
                            className="text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      {getSuggestions(field).map((msg, i) => (
                        <div
                          key={i}
                          className="flex items-start space-x-3 mb-3 last:mb-0"
                        >
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-400 mt-2"></div>
                          <p className="text-black text-sm">{msg}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
