import Image from "next/image";
import { useState, useContext, useEffect } from "react";
import { ResumeContext } from "../context/ResumeContext";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { SaveLoader } from "../ResumeLoader/SaveLoader";

const countries = [
  { id: "us", name: "United States", flag: "/assets/uslogo.png" },
  { id: "ca", name: "Canada", flag: "/assets/canada.png" },
  { id: "in", name: "India", flag: "/assets/indiaflag.png" },
  { id: "uk", name: "United Kingdom", flag: "/assets/unitedkingdomflag.png" },
  { id: "de", name: "Germany", flag: "/assets/germanyflag.png" },
  { id: "au", name: "Australia", flag: "/assets/australiaflag.png" },
  { id: "fr", name: "France", flag: "/assets/franceflag.png" },
  { id: "nl", name: "Netherlands", flag: "/assets/netherlandsflag.png" },
  { id: "ie", name: "Ireland", flag: "/assets/irelandflag.png" },
  { id: "sg", name: "Singapore", flag: "/assets/singaporeflag.png" },
];

export default function CountrySelection({ onBack, onSelectCountry }) {
  const router = useRouter();
  const { resumeData, setResumeData } = useContext(ResumeContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const resumeId = router.query.id || localStorage.getItem("resumeId");
        if (!resumeId || !token) {
          toast.error("Resume ID or token not found");
          return;
        }

        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.code == 200 || response.data.status == "success") {
          const parsedAIData = response.data.data.ai_resume_parse_data;
          setResumeData(parsedAIData.templateData);

          // Set initial location value if it exists
          if (parsedAIData.location) {
            const locationValue = parsedAIData.location;
            setSelectedCountry(locationValue);
          }
        } else {
          toast.error(response.data.message || "Failed to fetch resume data");
        }
      } catch (error) {
        toast.error(error?.message || "Error fetching resume data");
        console.error("Error fetching resume:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, [router.query.id, token]);

  const handleSaveCountry = async () => {
    if (!resumeData) return;

    if (!selectedCountry) {
      toast.error("Please select a country before proceeding");
      return;
    }

    const requestData = {
      templateData: resumeData,
      location: selectedCountry, // Send location as individual parameter
    };

    setIsLoading(true);

    try {
      const resumeId = router.query.id || localStorage.getItem("resumeId");

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/resume-update/${resumeId}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        toast.success(response.data.message || "Country saved successfully");
        onSelectCountry(selectedCountry);
      } else {
        toast.error(response.data.error || "Error while saving the country");
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isNextButtonDisabled = () => {
    return loading || !selectedCountry || isLoading;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-100 flex flex-col">
      <header className="bg-primar text-white px-4 py-6 flex items-center justify-between"></header>
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <div className="max-w-3xl text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-primary hover:text-primary/90 leading-snug mb-2">
            For which country to tailor your resume to its specific
            requirements.
          </h1>
          <p className="text-md md:text-lg text-success hover:text-success/90 ">
            Select the country to tailor your resume to its specific
            requirements.
          </p>
        </div>

        <div className="py-10 px-4 w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              ...countries.filter((c) => ["us", "ca", "in"].includes(c.id)),
              ...countries.filter((c) => !["us", "ca", "in"].includes(c.id)),
            ].map((country) => (
              <button
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`p-5 rounded-2xl shadow-md border border-gray-200 flex flex-col items-center transition-all duration-200 group ${
                  selectedCountry === country.id
                    ? "bg-primary text-white shadow-xl scale-105"
                    : "bg-primary/20 hover:bg-primary hover:text-white hover:shadow-xl"
                }`}
              >
                <Image
                  src={country.flag}
                  alt={country.name}
                  width={100}
                  height={100}
                  loading="lazy"
                  className="mb-4 transition-transform duration-200 group-hover:scale-105"
                />
                <span className="text-primary group-hover:text-white font-semibold text-lg mb-2 transition-colors duration-200">
                  {country.name}
                </span>
                <span className="text-xl text-gray-400 group-hover:text-success transition-colors duration-200">
                  →
                </span>
              </button>
            ))}
          </div>

          {!selectedCountry && (
            <p className="text-red-500 text-sm mt-4 text-center">
              Please select a country to continue
            </p>
          )}

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-8 py-3 bg-white border-2 border-gray-300 rounded-xl text-gray-700 
              font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSaveCountry}
              disabled={isNextButtonDisabled()}
              className={`px-8 py-3 rounded-lg font-medium transition-all shadow-md 
                ${
                  isNextButtonDisabled()
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
            >
              {isLoading ? <SaveLoader loadingText="Saving" /> : "Next"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
