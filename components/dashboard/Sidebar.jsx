import React, { useState, useRef, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ResumeContext } from "../../components/context/ResumeContext";
import DashboardPreview from "../preview/DashboardPreview";
import FullScreenLoader from "../ResumeLoader/Loader"; // Assuming you already have this component
import axios from "axios";
import { Download, Edit, Plus } from "lucide-react";
import { SaveLoader } from "../ResumeLoader/SaveLoader";
import Button from "../buttonUIComponent";

const Sidebar = ({ score, resumeId }) => {
  // console.log(resumes,"lllll");
  const templateRef = useRef(null);
  const router = useRouter();

  const { resumeData, setResumeData, setHeaderColor, setBgColor } =
    useContext(ResumeContext);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false); // Loader state
  const [resumeTitle, setResumeTitle] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handleEdit = () => {
    setShowLoader(true);
    setTimeout(() => {
      router.push({
        pathname: `/dashboard/aibuilder/${resumeId}`,
      });
    }, 2000);
  };

  const handleCreate = () => {
    setShowLoader(true); // Show the loader
    setTimeout(() => {
      setShowLoader(false); // Hide the loader after 5 seconds
      router.push("/dashboard/resume-builder"); // Navigate to the desired route
    }, 5000);
  };

  const fetchResumeData = async () => {
    if (!resumeId) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(
          `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.status === "success") {
          const { data } = response.data;
          const parsedData = data.ai_resume_parse_data;

          setResumeData(parsedData.templateData);
          setResumeTitle(data.resume_title || "Untitled Resume");
          if (parsedData?.templateData?.templateDetails) {
            const { backgroundColor, templateId } =
              parsedData.templateData.templateDetails;
            setBgColor(backgroundColor || "#000");
            setHeaderColor(backgroundColor || "");
            setSelectedTemplate(templateId || "template1");
          }
        }
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchResumeData();
  }, [resumeId]);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const token = localStorage.getItem("token");

      // First, get the resume data to extract HTML content
      const resumeResponse = await axios.get(
        `https://api.abroadium.com/api/jobseeker/resume-list/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (resumeResponse.data.status === "success") {
        const { data } = resumeResponse.data;
        const parsedData = data.ai_resume_parse_data;

        // Create a temporary div to render the template
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = parsedData.resume_html || "";

        const htmlContent = tempDiv.innerHTML;
        const fullHtml = `
          <style>
            @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
          </style>
          ${htmlContent}
        `;

        // Download with enhanced functionality
        const response = await axios.post(
          `https://api.abroadium.com/api/jobseeker/download-resume/${resumeId}?pdf_type=1`,
          {
            html: fullHtml,
            pdf_type: 1,
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
        link.setAttribute("download", `resume_${resumeId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Show success message using toast if available
        if (typeof window !== "undefined" && window.toast) {
          window.toast.success("Resume downloaded successfully!");
        }
      }
    } catch (error) {
      console.error("PDF generation error:", error);

      const apiError = error.response?.data;
      const statusCode = error.response?.status;

      if (statusCode === 403) {
        setShowUpgradeModal(true); // Show upgrade popup
      } else if (apiError?.error) {
        if (typeof window !== "undefined" && window.toast) {
          window.toast.error(apiError.error);
        } else {
          alert(apiError.error);
        }
      } else if (apiError?.message) {
        if (typeof window !== "undefined" && window.toast) {
          window.toast.error(apiError.message);
        } else {
          alert(apiError.message);
        }
      } else {
        if (typeof window !== "undefined" && window.toast) {
          window.toast.error("Something went wrong. Please try again.");
        } else {
          alert("Something went wrong. Please try again.");
        }
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const createPaymentForPlan5 = async () => {
    if (!resumeId) {
      alert("Resume ID not found");
      return;
    }

    setIsPaymentProcessing(true);
    try {
      const token = localStorage.getItem("token");
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
          if (typeof window !== "undefined" && window.toast) {
            window.toast.success("Redirecting to payment...");
          } else {
            alert("Redirecting to payment...");
          }
          // Redirect to the payment URL
          window.location.href = response.data.payment_url;
        } else {
          if (typeof window !== "undefined" && window.toast) {
            window.toast.success("Payment created successfully!");
          } else {
            alert("Payment created successfully!");
          }
          // After successful payment, proceed with download
          handleDownload();
          setShowUpgradeModal(false);
        }
      } else {
        if (typeof window !== "undefined" && window.toast) {
          window.toast.error(
            response.data.message || "Failed to create payment"
          );
        } else {
          alert(response.data.message || "Failed to create payment");
        }
      }
    } catch (error) {
      console.error("Payment Error:", error);
      if (typeof window !== "undefined" && window.toast) {
        window.toast.error(
          error.response?.data?.message || "Failed to create payment"
        );
      } else {
        alert(error.response?.data?.message || "Failed to create payment");
      }
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  return (
    <div className="w-full md:w-[400px] p-4 border-r border-gray-200">
      {showLoader && <FullScreenLoader />} {/* Show the loader */}
      {!showLoader /* Hide other content when loader is visible */ && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">{resumeTitle}</h2>
            <Link href="/dashboard/resumelist" className="text-primary ">
              View All
            </Link>
          </div>

          <div className="border border-gray-200 rounded-lg shadow-sm p-2 mb-4 relative h-[500px]">
            {loading ? (
              // <div className="flex items-center justify-center h-full">
              //   Loading...
              // </div>
              <div className="flex items-center justify-center h-full">
                <div className="w-10 h-10 border-4 border-gray-300 border-[#002a48] rounded-full animate-spin"></div>
              </div>
            ) : (
              <DashboardPreview
                ref={templateRef}
                selectedTemplate={selectedTemplate}
              />
            )}
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              onClick={handleEdit}
              disabled={!resumeId} // Disable Button if resumeId is null
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                !resumeId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Edit />
              Edit
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!resumeId}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ${
                !resumeId ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Download />
              {isDownloading ? (
                <SaveLoader loadingText="Downloading" />
              ) : (
                "Download"
              )}
            </Button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Resume Strength:</span>
              <div className="flex items-center gap-2">
                <span className="bg-success/20 text-success px-2 py-1 rounded-full text-sm">
                  {score}
                </span>
                {/* <Button className="text-blue-600 hover:text-blue-700 text-sm">
                  Improve
                </Button> */}
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            onClick={handleCreate}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 hover:bg-primary/90 text-white rounded-full "
          >
            <Plus />
            Create New Resume
          </Button>
        </>
      )}
      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Upgrade Required
            </h2>
            <p className="text-gray-600 mb-6">
              You`&apos;`ve reached your download limit. Please upgrade your
              plan to continue.
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
    </div>
  );
};

export default Sidebar;
