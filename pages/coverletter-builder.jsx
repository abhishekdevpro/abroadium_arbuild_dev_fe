import { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import { CoverLetterContext } from "../components/context/CoverLetterContext";
import CoverLetterEditor from "../components/cv/coverletterform/CoverLetterEditor";
import TemplateSelector from "../components/cv/coverletter/CvSelector";
import CoverLetterPreview from "../components/cv/coverletter/CoverLetterPreview";
import ColorPickers from "./ColorPickers";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import MobileCoverLetterBuilder from "./mobile-cv-builder";
import Button from "../components/buttonUIComponent";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import PersonalInformation from "../components/cv/coverletterform/PersonalInformation";
import LetterDetails from "../components/cv/coverletterform/LetterDetails";
import IntroductionAndBodyForm from "../components/cv/coverletterform/IntroductionAndBodyForm";
import ClosingGratitudeAndSignatureForm from "../components/cv/coverletterform/ClosingGratitudeAndSignatureForm";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";
function CoverLetterBuilder() {
  const {
    coverLetterData,
    setCoverLetterData,
    backgroundColorss,
    selectedFont,
    setSelectedFont,
    setBgColor,
    setHeaderColor,
    setPhoto,
    photo,
  } = useContext(CoverLetterContext);
  const router = useRouter();
  const templateRef = useRef(null);
  const [token, setToken] = useState(null);
  const [coverletterId, setCoverLetterId] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [currentSection, setCurrentSection] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    // Check on mount
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);
  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
  };

  const sections = [
    {
      label: "Personal Details",
      component: <PersonalInformation />,
    },
    {
      label: "Letter Details",
      component: <LetterDetails />,
    },
    {
      label: "Introduction & Body",
      component: <IntroductionAndBodyForm />,
    },
    {
      label: "Closing & Signature",
      component: <ClosingGratitudeAndSignatureForm />,
    },
  ];

  const handleNext = () => {
    handleFinish(false);
    if (currentSection === sections.length - 1) {
      setIsFinished(true);
    } else {
      setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  const handleSectionClick = (index) => {
    handleFinish(false);
    setCurrentSection(index);
  };

  const nextSection = () => {
    handleFinish(false);
    if (currentSection < sections.length - 1) {
      handleSectionClick(currentSection + 1);
    }
  };

  const prevSection = () => {
    handleFinish(false);
    if (currentSection > 0) {
      handleSectionClick(currentSection - 1);
    }
  };

  const handleBackToEditor = () => {
    setIsFinished(false);
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token && !hasFetchedData) {
        setHasFetchedData(true);
        try {
          const response = await axios.get(
            `https://api.abroadium.com/api/jobseeker/coverletter/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;

            const parsedData = data.cover_letter_obj;
            setCoverLetterData(parsedData.coverletterInfo);

            if (parsedData?.coverletterInfo?.templateDetails) {
              setBgColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.coverletterInfo.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.coverletterInfo.templateDetails.templateId ||
                  "template1"
              );
              setSelectedFont(
                parsedData.coverletterInfo.templateDetails.font ||
                  "Times New Roman"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching cover letter data:", error);
        }
      }
    };

    fetchResumeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, hasFetchedData]);
  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setCoverLetterId(id);
  }, []);

  const formatCoverLetterData = (data) => {
    // console.log(data, ">>>data");
    return {
      closing: data.closing || "",
      body: data.body || "",
      gratitude: data.gratitude || "",
      introduction: data.introduction || "",
      letterDetails: {
        companyName: data.letterDetails?.companyName || "",
        date: data.letterDetails?.date || "",
        jobTitle: data.letterDetails?.jobTitle || "",
        reference: data.letterDetails?.reference || "",
        salutation: data.letterDetails?.salutation || "",
      },

      signature: data.signature || "",
      templateDetails: {
        templateId: selectedTemplate,
        backgroundColor: backgroundColorss || "",
        font: selectedFont || "Times New Roman",
      },
      personalDetails: {
        name: data.personalDetails?.name || "",
        position: data.personalDetails?.position || "",
        address: data.personalDetails?.address || "",
        email: data.personalDetails?.email || "",
        contact: data.personalDetails?.contact || "",
        photo: data.photo || "",
      },
      photo: data.photo || "",
    };
  };

  const handleFinish = async (showToast = true) => {
    if (!coverLetterData) return;
    const coverletterInfo = {
      coverletterInfo: formatCoverLetterData(coverLetterData),
    };
    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      toast.error("Error: Template content is missing.");
      return;
    }

    const coverletterHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
    try {
      const coverletterId = router.query.id || localStorage.getItem("id");
      if (!coverletterId) {
        toast.error("Cover Letter ID not found");
        return;
      }

      const response = await axios.put(
        `https://api.abroadium.com/api/jobseeker/coverletter/${coverletterId}`,

        { ...coverletterInfo, cover_letter_html: coverletterHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        // setIsSaved(true);
        // localStorage.setItem("isSaved", "true");
        if (showToast) {
          toast.success(
            response.data.message || "Cover Letter saved Successfully"
          );
        }
      } else {
        toast.error(
          response.data.error || "Error while saving the Cover Letter"
        );
      }
    } catch (error) {
      toast.error(error?.message || "Error updating resume!");
      console.error("Error updating resume:", error);
    }
  };
  const downloadAsPDF = async () => {
    setisDownloading(true);
    handleFinish();

    if (!templateRef.current) {
      toast.error("Template reference not found");
      setisDownloading(false);
      return;
    }

    try {
      const htmlContent = templateRef.current.innerHTML;

      const fullContent = `
        <style>
          @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        </style>
        ${htmlContent}
      `;

      downloadPDF();
    } catch (error) {
      console.error("PDF generation error:", error);

      const apiError = error.response?.data;
      const statusCode = error.response?.status;

      if (statusCode === 403) {
        setShowUpgradeModal(true); // Show upgrade popup
      } else if (apiError?.error) {
        toast.error(apiError.error);
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setisDownloading(false);
    }
  };
  const downloadPDF = async () => {
    try {
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/download-coverletter/${coverletterId}?pdf_type=${selectedPdfType}`,
        // {
        //   // html: fullHtml,
        //   pdf_type: selectedPdfType, // ✅ Move pdf_type here
        // },
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;

      link.setAttribute("download", `resume.pdf`);
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);
      toast.error("pdf error");
    }
  };

  const fetchSampleResumeData = async () => {
    try {
      setIsLoadingSample(true);
      const { id } = router.query;
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const coverletterHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
      if (!id) {
        toast.error("Cover Letter ID not found");
        return;
      }

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/coverletter/preview/${id}`,
        { resume_html: coverletterHtml },
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob",
        }
      );

      console.log("API Response:", response.data);

      // Convert blob to image URL
      if (response.data) {
        const imageUrl = URL.createObjectURL(response.data);
        setPreviewImage(imageUrl);
        setShowSampleModal(true);
        toast.success("Sample cover letter loaded successfully");
      } else {
        toast.error("Failed to fetch sample cover letter data");
      }
    } catch (error) {
      console.error("Error fetching sample cover letter:", error);
      toast.error("Error loading sample cover letter");
    } finally {
      setIsLoadingSample(false);
    }
  };

  const createPaymentForPlan5 = async () => {
    if (!coverletterId) {
      toast.error("Cover Letter ID not found");
      return;
    }

    setIsPaymentProcessing(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/payment/create-payment",
        {
          coverletter_id: parseInt(coverletterId),
          plan_id: 5,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (response.data.payment_url) {
          toast.success("Redirecting to payment...");
          // Redirect to the payment URL
          window.location.href = response.data.payment_url;
        } else {
          toast.success("Payment created successfully!");
          // After successful payment, proceed with download
          downloadPDF();
          setShowUpgradeModal(false);
        }
      } else {
        toast.error(response.data.message || "Failed to create payment");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Failed to create payment");
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      await handleFinish();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isMobile ? (
        <MobileCoverLetterBuilder
          selectedFont={selectedFont}
          handleFontChange={handleFontChange}
          backgroundColorss={backgroundColorss}
          setBgColor={setBgColor}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          setSelectedPdfType={setSelectedPdfType}
          selectedPdfType={selectedPdfType}
          handleFinish={handleFinish}
          downloadAsPDF={downloadAsPDF}
          templateRef={templateRef}
        />
      ) : (
        <div className="min-h-screen bg-gray-50">
          {/* Sticky Navbar */}
          <div className="sticky top-0 z-50 bg-white shadow-md">
            <Navbar />
          </div>

          {!isFinished ? (
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <div className="w-full bg-gray-200 p-4 shadow-sm">
                <div className="hidden md:flex flex-col lg:flex-row items-center justify-between gap-4">
                  <div className="flex w-full lg:w-auto gap-4">
                    <Button
                      variant="primary"
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentSection === 0}
                      className="w-40 h-10 rounded-full  text-white font-medium relative transform transition-all duration-300 ease-in-out 
             hover:scale-105 hover:font-semibold hover:text-xl hover:bg-primary/90 
             disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </Button>

                    <Button
                      variant="success"
                      type="button"
                      onClick={handleNext}
                      className="w-40 h-10 rounded-full  text-white font-medium hover:bg-success/90 relative transform transition-all duration-300 ease-in-out 
             hover:scale-105 hover:font-semibold hover:text-xl"
                    >
                      {currentSection === sections.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>

                  <div className="hidden lg:flex items-center gap-6">
                    {/* Font Selector */}
                    <select
                      value={selectedFont}
                      onChange={handleFontChange}
                      className="hidden sm:block rounded-full border-2 border-primary px-5 py-2 bg-white text-primaryfont-medium 
transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/20 hover:text-primary text-primary"
                    >
                      <option value="" disabled>
                        Fonts
                      </option>
                      <option value="Ubuntu">Ubuntu</option>
                      <option value="Calibri">Calibri</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Roboto">Roboto</option>
                      <option value="Poppins">Poppins</option>
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Courier New">Courier New</option>
                      <option value="Tahoma">Tahoma</option>
                      <option value="Verdana">Verdana</option>
                      <option value="Trebuchet MS">Trebuchet MS</option>
                      <option value="Lucida Console">Lucida Console</option>
                      <option value="Comic Sans MS">Comic Sans MS</option>
                      <option value="Source Sans Pro">Source Sans Pro</option>
                      <option value="Inter">Inter</option>
                    </select>

                    {/* Color Picker and Template Selector */}
                    <div className="flex items-center gap-4 shrink-0">
                      <ColorPickers
                        selectedColor={backgroundColorss}
                        onChange={setBgColor}
                      />
                      <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        setSelectedPdfType={setSelectedPdfType}
                        selectedPdfType={selectedPdfType}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky top-16 z-10 w-full bg-white shadow-sm">
                <div className="hidden md:flex justify-center items-center p-4">
                  <nav className="bg-gray-100 rounded-full p-2">
                    <div className="flex items-center">
                      <Button
                        onClick={() => prevSection()}
                        className="p-2 hover:bg-gray-200 rounded-full "
                        disabled={currentSection === 0}
                      >
                        {/* Chevron Left Icon Here */}
                      </Button>

                      <div className="flex-1 overflow-x-auto scrollbar-hide ">
                        <ul className="flex flex-row gap-3 items-center py-2 px-4  ">
                          {sections.map((section, index) => (
                            <li
                              key={index}
                              className={`flex items-center justify-between gap-2 px-4 py-2 
  cursor-pointer transition-all duration-200 rounded-full border-2 
  hover:scale-[1.02] hover:font-semibold hover:text-base 
  disabled:opacity-50 disabled:cursor-not-allowed

  ${
    currentSection === index
      ? "border-primary bg-primary text-white font-semibold shadow-md"
      : "border-primary bg-white text-primary hover:bg-success hover:text-white"
  }`}
                              onClick={() => handleSectionClick(index)}
                            >
                              <span>{section.label}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button
                        onClick={() => nextSection()}
                        className="p-2 hover:bg-gray-200 rounded-full "
                        disabled={currentSection === sections.length - 1}
                      >
                        {/* Chevron Right Icon Here */}
                      </Button>
                    </div>
                  </nav>
                </div>
              </div>

              <div className="flex flex-col md:flex-row flex-grow p-4">
                <div className="w-[40%] bg-primary">
                  <main className="w-full mx-auto md:p-4">
                    <form>{sections[currentSection].component}</form>
                    <div className="mt-12 left-0 right-0 flex justify-center gap-6">
                      {/* Previous Button */}
                      <Button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentSection === 0}
                        className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-medium 
          relative transform transition-all duration-300 ease-in-out 
          hover:scale-110 hover:bg-black 
          disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowLeft className="h-6 w-6" />
                      </Button>

                      {/* Next / Finish Button */}
                      <Button
                        variant="success"
                        type="button"
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium 
          relative transform transition-all duration-300 ease-in-out 
          hover:scale-110 hover:bg-success/90"
                      >
                        {currentSection === sections.length - 1 ? (
                          <CheckCircle className="h-6 w-6" /> // Finish icon
                        ) : (
                          <ArrowRight className="h-6 w-6" /> // Next icon
                        )}
                      </Button>
                    </div>
                  </main>
                </div>

                <aside className="w-[60%] min-h-screen border-l bg-gray-50">
                  <div className="sticky top-32 p-4">
                    <CoverLetterPreview
                      selectedTemplate={selectedTemplate}
                      ref={templateRef}
                    />
                  </div>
                </aside>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {/* Sticky Navbar for finished state */}

              <div className="hidden md:flex w-screen px-8 py-4 justify-center items-center bg-white shadow">
                <div className="hidden lg:flex items-center gap-4">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className="hidden sm:block rounded-full border-2 border-primary px-5 py-2 bg-white text-primary font-medium 
transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/20 hover:text-primary"
                  >
                    <option value="">Font</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Calibri">Calibri</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Lucida Console">Lucida Console</option>
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="Source Sans Pro">Source Sans Pro</option>
                    <option value="Inter">Inter</option>
                  </select>

                  <div className="flex items-center">
                    <ColorPickers
                      selectedColor={backgroundColorss}
                      onChange={setBgColor}
                    />
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      setSelectedTemplate={setSelectedTemplate}
                      setSelectedPdfType={setSelectedPdfType}
                      selectedPdfType={selectedPdfType}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex w-screen px-8 py-4 justify-center items-center bg-white shadow">
                <div className="flex gap-4">
                  <button
                    onClick={handleClick}
                    className={`px-6 py-2 rounded-full flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-success/30 cursor-not-allowed"
                        : "bg-success hover:bg-success/90 active:bg-success"
                    } text-white transition-colors duration-200`}
                    disabled={loading}
                  >
                    {loading ? <SaveLoader /> : "Save Cover Letter"}
                  </button>
                  <button
                    onClick={fetchSampleResumeData}
                    disabled={isLoadingSample}
                    className={`px-6 py-2 rounded-full flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-black/10 cursor-not-allowed"
                        : "bg-black hover:bg-black/50 active:bg-black"
                    } text-white transition-colors duration-200`}
                  >
                    {isLoadingSample ? (
                      <SaveLoader loadingText="Loading Sample" />
                    ) : (
                      "Sample Cover Letter"
                    )}
                  </button>
                  <button
                    onClick={downloadAsPDF}
                    className={`px-6 py-2 rounded-full flex items-center justify-center gap-2 ${
                      loading
                        ? "bg-primary/30 cursor-not-allowed"
                        : "bg-primary hover:bg-primary/90 active:bg-primary"
                    } text-white transition-colors duration-200`}
                    disabled={loading}
                  >
                    {isDownloading ? (
                      <SaveLoader loadingText="Downloading" />
                    ) : (
                      "Download"
                    )}
                  </button>

                  <button
                    onClick={handleBackToEditor}
                    className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    Edit Cover Letter
                  </button>
                </div>
              </div>
              <div className="z-10">
                {!showSampleModal && (
                  <CoverLetterPreview
                    selectedTemplate={selectedTemplate}
                    ref={templateRef}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upgrade Required
            </h2>
            <p className="text-gray-600 mb-6">
              You&apos;ve reached your download limit. Please upgrade your plan
              to continue.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => router.push("/payment")}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Upgrade Plan
                </button>
              </div>

              {/* Pay & Download Button */}
              <div className="border-t pt-4">
                <button
                  onClick={createPaymentForPlan5}
                  className="w-full px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPaymentProcessing}
                >
                  {isPaymentProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    "Pay & Download"
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Quick payment to download this cover letter
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sample Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 border-b bg-white relative z-20">
              <h2 className="text-lg font-semibold text-gray-800">
                Sample Cover Letter Preview
              </h2>
              <button
                onClick={() => {
                  setShowSampleModal(false);
                  if (previewImage) {
                    URL.revokeObjectURL(previewImage);
                    setPreviewImage(null);
                  }
                }}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex justify-center p-2 relative overflow-hidden">
              <div className="relative flex justify-center">
                <div
                  className="relative"
                  style={{
                    transform: "scale(0.6)",
                    transformOrigin: "top center",
                    width: "794px",
                    height: "1123px",
                  }}
                >
                  <div className="relative z-0 ">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Sample Cover Letter Preview"
                        width={794}
                        height={1123}
                        className="max-w-full h-auto"
                        style={{
                          transform: "scale(0.6)",
                          transformOrigin: "top center",
                          width: "794px",
                          height: "1123px",
                        }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">
                          Loading sample cover letter...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 border-t bg-gray-50 relative z-20">
              <p className="text-xs text-gray-600 text-center">
                This is a sample preview with watermark. Download the full
                version without watermark.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoverLetterBuilder;
