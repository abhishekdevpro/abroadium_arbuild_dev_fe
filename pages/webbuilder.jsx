import React, { useState, useRef, useEffect, useContext } from "react";
import Language from "../components/form/Language";
import axios from "axios";
import Meta from "../components/meta/Meta";
import FormCP from "../components/form/FormCP";
import dynamic from "next/dynamic";
import DefaultResumeData from "../components/utility/DefaultResumeData";
import SocialMedia from "../components/form/SocialMedia";
import WorkExperience from "../components/form/WorkExperience";
import Skill from "../components/form/Skill";
import PersonalInformation from "../components/form/PersonalInformation";
import Summary from "../components/form/Summary";
import Projects from "../components/form/Projects";
import Education from "../components/form/Education";
import Certification from "../components/form/certification";
import ColorPickers from "./ColorPickers";
import Preview from "../components/preview/Preview";
import TemplateSelector from "../components/preview/TemplateSelector";
import { PDFExport } from "@progress/kendo-react-pdf";
import LoadUnload from "../components/form/LoadUnload";
import MyResume from "./dashboard/MyResume";
import { useRouter } from "next/router";
import Sidebar from "./dashboard/Sidebar";
import { toast } from "react-toastify";
import LoaderButton from "../components/utility/LoaderButton";
import useLoader from "../hooks/useLoader";
import Modal from "./adminlogin/Modal";
import { AlertCircle, Menu, X } from "lucide-react";
import Image from "next/image";
import { ResumeContext } from "../components/context/ResumeContext";
import ResumeLoader from "../components/ResumeLoader/Loader";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";
import Button from "../components/buttonUIComponent";
import Highlightmenubar from "../components/preview/highlightmenu";
import AICredits from "../components/dashboard/AICredits";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"; // icons
const Print = dynamic(() => import("../components/utility/WinPrint"), {
  ssr: false,
});

export default function WebBuilder() {
  const [formClose, setFormClose] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [isFinished, setIsFinished] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pdfExportComponent = useRef(null);
  const { PayerID } = router.query;
  const [isSaved, setIsSaved] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setisDownloading] = useState(false);
  const { improve } = router.query;
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [sampleResumeData, setSampleResumeData] = useState(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentVerified, setIsPaymentVerified] = useState(false);
  const templateRef = useRef(null);
  const {
    resumeData,
    setResumeData,
    setHeaderColor,
    setBgColor,
    setSelectedFont,
    selectedFont,
    backgroundColorss,
    headerColor,
    setResumeStrength,
    resumeStrength,
    exp,
  } = useContext(ResumeContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchResumeData = async () => {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (id && token) {
        try {
          const response = await axios.get(
            `https://api.abroadium.com/api/jobseeker/resume-list/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );

          if (response.data.status === "success") {
            const { data } = response.data;
            // console.log(data,"rnd");
            const parsedData = data.ai_resume_parse_data;

            setResumeData(parsedData.templateData);
            setResumeStrength(data.resume_strenght_details);

            if (parsedData.templateData.templateDetails) {
              setBgColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setHeaderColor(
                parsedData.templateData.templateDetails.backgroundColor || ""
              );
              setSelectedTemplate(
                parsedData.templateData.templateDetails.templateId ||
                  "template1"
              );
              setSelectedFont(
                parsedData.templateData.templateDetails.font ||
                  "Times New Roman"
              );
            }
          }
        } catch (error) {
          console.error("Error fetching resume data:", error);
          toast.error("Failed to fetch resume data");
        }
      }
    };

    fetchResumeData();
  }, [router.query]);

  useEffect(() => {
    const path = window.location.pathname;
    const id = path.split("/").pop();
    setResumeId(id);
  }, []);

  const sections = [
    {
      label: "Personal Details",
      component: <PersonalInformation />,
      showErrorIcon: resumeStrength?.is_personal_info === false,
    },
    {
      label: "Social Links",
      component: <SocialMedia />,
      showErrorIcon: resumeStrength?.is_social === false,
    },
    {
      label: "Summary",
      component: <Summary />,
      showErrorIcon: resumeStrength?.is_personal_summery === false,
    },
    {
      label: "Education",
      component: <Education />,
      showErrorIcon: resumeStrength?.is_education === false,
    },
    {
      label: "Experience",
      component: <WorkExperience />,
      showErrorIcon: resumeStrength?.is_work_history === false,
    },
    {
      label: "Projects",
      component: <Projects />,
      showErrorIcon: resumeStrength?.is_project === false,
    },
    {
      label: "Skills",
      showErrorIcon: resumeStrength?.is_skills === false,
      component: Array.isArray(resumeData?.skills) ? (
        resumeData.skills.map((skill, index) => (
          <Skill title={skill.title} currentSkillIndex={index} key={index} />
        ))
      ) : (
        <p>No skills available</p>
      ),
    },
    {
      label: "Languages",
      component: <Language />,
      showErrorIcon: resumeStrength?.is_languages === false,
    },
    {
      label: "Certifications",
      component: <Certification />,
      showErrorIcon: resumeStrength?.is_certifications === false,
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
    setIsMobileMenuOpen(false);
  };

  const handleFontChange = (e) => {
    setSelectedFont(e.target.value);
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

  const [showModal, setShowModal] = useState(false);

  const downloadAsBackend = async () => {
    setisDownloading(true);

    if (!templateRef.current) {
      toast.error("Template reference not found");
      setisDownloading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const fullHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,

        {
          html: fullHtml,
          pdf_type: selectedPdfType, // ✅ Move pdf_type here
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
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

  const downloadAsPDF = () => {
    downloadAsBackend();
    handleFinish();
  };
  // const downloadAsPDF = async () => {
  //   setisDownloading(true); // Start loading immediately

  //   try {
  //     // ✅ Wait for handleFinish to complete
  //     await handleFinish();

  //     if (!templateRef.current) {
  //       toast.error("Template reference not found");
  //       return;
  //     }

  //     const token = localStorage.getItem("token");
  //     const htmlContent = templateRef.current.innerHTML;

  //     const fullContent = `
  //       <style>
  //         @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
  //       </style>
  //       ${htmlContent}
  //     `;

  //     // ✅ Wait 5 seconds if needed
  //     // await new Promise((resolve) => setTimeout(resolve, 5000));

  //     const response = await axios.get(
  //       `https://api.abroadium.com/api/jobseeker/download-resume/${resumeId}?pdf_type=${selectedPdfType}`,
  //       {
  //         headers: {
  //           Authorization: token,
  //           "Content-Type": "application/pdf",
  //         },
  //         responseType: "blob",
  //       }
  //     );

  //     if (response.status === 200) {
  //       const url = window.URL.createObjectURL(
  //         new Blob([response.data], { type: "application/pdf" })
  //       );
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.setAttribute("download", `resume.pdf`);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       window.URL.revokeObjectURL(url);

  //       toast.success("Resume Downloaded Successfully");
  //     } else {
  //       toast.error(response.data.message || "Error while downloading");
  //     }
  //   } catch (error) {
  //     console.error("PDF generation error:", error);

  //     if (
  //       error?.response?.status === 403 &&
  //       error?.response?.data instanceof Blob
  //     ) {
  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         try {
  //           const errorData = JSON.parse(reader.result);
  //           const errorMessage =
  //             errorData.message || errorData.error || "Access denied";
  //           toast.error(errorMessage);
  //         } catch (err) {
  //           toast.error("Access denied. Please check your plan.");
  //         }
  //       };
  //       reader.readAsText(error.response.data);
  //     } else {
  //       const errorMessage =
  //         error?.response?.data?.message ||
  //         error?.message ||
  //         "Failed to generate and open PDF";
  //       toast.error(errorMessage);
  //     }
  //   } finally {
  //     setisDownloading(false); // Stop loader
  //   }
  // };

  const createPaymentForPlan5 = async () => {
    if (!resumeId) {
      toast.error("Resume ID not found");
      return;
    }

    setIsPaymentProcessing(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/payment/create-payment",
        {
          resume_id: parseInt(resumeId),
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
          downloadAsBackend();
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

  const verifyPaymentAndDownload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const razorpayPaymentId = urlParams.get("razorpay_payment_id");
    const razorpayPaymentLinkId = urlParams.get("razorpay_payment_link_id");
    const razorpaySignature = urlParams.get("razorpay_signature");

    if (!razorpayPaymentId || !razorpaySignature) {
      toast.error("Payment verification parameters not found");
      return;
    }

    setIsPaymentProcessing(true);
    try {
      const formData = new FormData();
      formData.append("razorpay_payment_id", razorpayPaymentId);
      formData.append("razorpay_payment_link_id", razorpayPaymentLinkId);
      formData.append("razorpay_signature", razorpaySignature);

      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/payment/payment-callback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Payment verified successfully!");
        setIsPaymentVerified(true);
        // Now proceed with actual download
        downloadAsBackend();
      } else {
        toast.error("Payment verification failed");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error(
        error.response?.data?.message || "Payment verification failed"
      );
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  useEffect(() => {
    if (PayerID) {
      verifyPayment();
    }
  }, [PayerID]);

  const verifyPayment = async () => {
    try {
      const orderId = localStorage.getItem("orderid");
      const token = localStorage.getItem("token");

      if (orderId && token && PayerID) {
        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/paypal/verify-order?orderid=${orderId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.status === "success") {
          setPaymentVerified(true);
          toast.success("Payment verified successfully!");

          localStorage.removeItem("orderid");
          await downloadPDF(orderId, resumeId, token);
        } else {
          toast.error("Payment verification failed. Please try again.");
          router.push("/payment-failed");
        }
      }
    } catch (error) {
      console.error("Payment Verification Error:", error);
      toast.error(
        error?.response?.data?.message || "Payment verification failed"
      );
      router.push("/payment-failed");
    }
  };

  // const downloadPDF = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.abroadium.com/api/jobseeker/download-file/11/${resumeId}`,
  //       // https://api.ciblijob.fr/api/user/download-resume/1530?pdf_type=1
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(
  //       new Blob([response.data], { type: "application/pdf" })
  //     );
  //     const link = document.createElement("a");
  //     link.href = url;

  //     link.setAttribute("download", `resume.pdf`);
  //     document.body.appendChild(link);
  //     link.click();

  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);

  //     toast.success("PDF downloaded successfully!");
  //   } catch (error) {
  //     console.error("PDF Download Error:", error);
  //     toast.error("Failed to download the PDF. Please try again.");
  //   }
  // };

  const handleFinish = async (showToast = true) => {
    if (!resumeData) return;

    const templateData = {
      templateData: {
        name: resumeData.name || "",
        position: resumeData.position || "",
        contactInformation: resumeData.contactInformation || "",
        phone_code: resumeData.phone_code || "",
        email: resumeData.email || "",
        address: resumeData.address || "",
        profilePicture: resumeData.profilePicture || "",
        socialMedia:
          resumeData.socialMedia?.map((media) => ({
            socialMedia: media.platform || "",
            link: media.link || "",
            socialMedia: media.socialMedia || "",
          })) || [],
        summary: resumeData.summary || "",
        is_fresher: resumeData.is_fresher || false,
        education:
          resumeData.education?.map((edu) => ({
            school: edu.school || "",
            degree: edu.degree || "",
            startYear: edu.startYear,
            endYear: edu.endYear,
            location: edu.location || "",
          })) || [],
        workExperience:
          resumeData.workExperience?.map((exp) => ({
            company: exp.company,
            position: exp.position,
            description: exp.description,
            // keyAchievements: Array.isArray(exp.keyAchievements)
            //   ? exp.keyAchievements
            //   : [exp.keyAchievements],
            keyAchievements: Array.isArray(exp.keyAchievements)
              ? exp.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : exp.keyAchievements && exp.keyAchievements.trim?.()
              ? [exp.keyAchievements.trim()]
              : [],
            startYear: exp.startYear,
            endYear: exp.endYear,
            location: exp.location,
          })) || [],
        projects:
          resumeData.projects?.map((project) => ({
            title: project.title || "",
            link: project.link || "",
            description: project.description,
            keyAchievements: Array.isArray(project.keyAchievements)
              ? project.keyAchievements.filter((item) => item?.trim?.()) // filter out empty strings or undefined
              : project.keyAchievements && project.keyAchievements.trim?.()
              ? [project.keyAchievements.trim()]
              : [],
            startYear: project.startYear,
            endYear: project.endYear,
            name: project.name,
          })) || [],
        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills.map((skill) => ({
              title: skill.title || "",
              skills: skill.skills || [],
            }))
          : [],
        languages: resumeData.languages || [],
        certifications: resumeData.certifications || [],
        templateDetails: {
          templateId: selectedTemplate,
          backgroundColor: backgroundColorss || "",
          font: selectedFont || "Times New Roman",
        },
        no_of_experience: exp,
      },
    };

    const htmlContent = templateRef?.current?.innerHTML;
    if (!htmlContent) {
      toast.error("Error: Template content is missing.");
      return;
    }

    const resumeHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;

    try {
      const id = router.query.id || resumeId;
      if (!id) {
        console.error("Resume ID not found.");
        toast.error("Error: Resume ID is missing.");
        return;
      }

      const url = `https://api.abroadium.com/api/jobseeker/resume-update/${id}`;
      const response = await axios.put(
        url,
        { ...templateData, resume_html: resumeHtml },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        setIsSaved(true);
        if (showToast) {
          toast.success(response.data.message || "Resume saved successfully.");
        }
      } else {
        toast.error(response.data.error || "Error while saving the resume.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
      console.error("Error updating resume:", error);
    }
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      await handleFinish(); // Ensure handleFinish is an async function
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEditor = () => {
    setIsFinished(false);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const userProfileResponse = await axios.get(
          "https://api.abroadium.com/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (userProfileResponse.data.status === "success") {
          const userData = userProfileResponse.data.data;
          setFormData((prevData) => ({
            ...prevData,
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            phone: userData.phone || "",
            email: userData.email || "",
          }));
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(resumeStrength, "resumeStrength");

  const fetchSampleResumeData = async () => {
    try {
      setIsLoadingSample(true);
      const { id } = router.query;
      const token = localStorage.getItem("token");
      const htmlContent = templateRef.current.innerHTML;

      const resumeHtml = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
      </style>
      ${htmlContent}
    `;
      if (!id) {
        toast.error("Resume ID not found");
        return;
      }

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/resume/preview/${id}`,
        { resume_html: resumeHtml }, // ✅ payload here
        {
          headers: {
            Authorization: token,
          },
          responseType: "blob", // ✅ tells axios to expect binary data
        }
      );

      console.log("API Response:", response.data); // Debug log

      // Convert blob to image URL
      if (response.data) {
        const imageUrl = URL.createObjectURL(response.data);
        setPreviewImage(imageUrl);
        setShowSampleModal(true);
        toast.success("Sample resume loaded successfully");
      } else {
        toast.error("Failed to fetch sample resume data");
      }
    } catch (error) {
      console.error("Error fetching sample resume:", error);
      toast.error("Error loading sample resume");
    } finally {
      setIsLoadingSample(false);
    }
  };
  return (
    <>
      <Meta
        title="Abroadium - AI Resume Builder"
        description="ATSResume is a cutting-edge resume builder that helps job seekers create a professional, ATS-friendly resume in minutes..."
        keywords="ATS-friendly, Resume optimization..."
      />
      {/* <ResumeLoader /> */}
      <div className="min-h-screen bg-gray-50">
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
                    {currentSection === sections.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                  {/* AI Credits Component */}
                  <div className="hidden lg:block">
                    <AICredits />
                  </div>

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
                      selectmultiplecolor={backgroundColorss}
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

            <div className="sticky top-0 z-10 w-full bg-white shadow-sm">
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
                            {improve && section.showErrorIcon && (
                              <AlertCircle className="text-red-500 w-5 h-5" />
                            )}
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
                <div className="sticky top-20 p-4">
                  <Preview
                    ref={templateRef}
                    selectedTemplate={selectedTemplate}
                  />
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="hidden md:flex w-screen px-8 py-4 justify-center items-center bg-white shadow">
              <div className="hidden lg:flex items-center gap-4">
                {/* AI Credits Component */}
                <div className="hidden lg:block">
                  <AICredits />
                </div>

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
                    selectmultiplecolor={backgroundColorss}
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
                  {loading ? <SaveLoader /> : "Save Resume"}
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
                    "Sample Resume"
                  )}
                </button>
                <button
                  onClick={() => {
                    // Check if Razorpay payment parameters are present
                    const urlParams = new URLSearchParams(
                      window.location.search
                    );
                    const hasRazorpayParams =
                      urlParams.get("razorpay_payment_id") &&
                      urlParams.get("razorpay_signature");

                    if (hasRazorpayParams) {
                      verifyPaymentAndDownload();
                    } else {
                      downloadAsPDF();
                    }
                  }}
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
                  Edit Resume
                </button>
              </div>
            </div>
            <div className="z-10">
              <Highlightmenubar />
              {!showSampleModal && (
                <Preview
                  ref={templateRef}
                  selectedTemplate={selectedTemplate}
                />
              )}
            </div>
          </div>
        )}
      </div>
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upgrade Required
            </h2>
            <p className="text-gray-600 mb-6">
              You’ve reached your download limit. Please upgrade your plan to
              continue.
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
                  Quick payment to download this resume
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {showSampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-3 border-b bg-white relative z-20">
              <h2 className="text-lg font-semibold text-gray-800">
                Sample Resume Preview
              </h2>
              <button
                onClick={() => {
                  setShowSampleModal(false);
                  setSampleResumeData(null);

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
                      <img
                        src={previewImage}
                        alt="Sample Resume Preview"
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
                          Loading sample resume...
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
