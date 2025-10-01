import React, { useState, useRef } from "react";
import { ArrowLeft, Download, Save, X } from "lucide-react";
import TemplateSelector from "../components/cv/coverletter/CvSelector";
import CoverLetterEditor from "../components/cv/coverletterform/CoverLetterEditor";
import Navbar from "./Navbar/Navbar";
import ColorPickers from "./ColorPickers";
import CoverLetterPreview from "../components/cv/coverletter/CoverLetterPreview";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import Image from "next/image";
import { SaveLoader } from "../components/ResumeLoader/SaveLoader";

const MobileCoverLetterBuilder = ({
  selectedFont,
  handleFontChange,
  backgroundColorss,
  setBgColor,
  selectedTemplate,
  setSelectedTemplate,
  handleFinish,
  downloadAsPDF,
  templateRef,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedPdfType, setSelectedPdfType] = useState("1");
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoadingSample, setIsLoadingSample] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router = useRouter();
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
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

  const downloadPDF = async () => {
    try {
      const { id } = router.query;
      const token = localStorage.getItem("token");

      if (!id) {
        toast.error("Cover Letter ID not found");
        return;
      }

      if (!token) {
        toast.error("Authentication token not found");
        return;
      }

      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/download-coverletter/${id}?pdf_type=${selectedPdfType}`,
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
      link.setAttribute("download", `coverletter.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF Download Error:", error);

      const apiError = error.response?.data;
      const statusCode = error.response?.status;

      if (statusCode === 403) {
        setShowUpgradeModal(true); // Show upgrade popup
      } else if (apiError?.error) {
        toast.error(apiError.error);
      } else if (apiError?.message) {
        toast.error(apiError.message);
      } else {
        toast.error("Failed to download the PDF. Please try again.");
      }
    }
  };

  const handleDownloadAsPDF = async () => {
    setIsDownloading(true);
    try {
      await handleFinish();
      await downloadPDF();
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const createPaymentForPlan5 = async () => {
    const { id } = router.query;
    const token = localStorage.getItem("token");

    if (!id) {
      toast.error("Cover Letter ID not found");
      return;
    }

    setIsPaymentProcessing(true);
    try {
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/payment/create-payment",
        {
          coverletter_id: parseInt(id),
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar />
      </div>

      {!isPreviewMode ? (
        // Form Mode
        <div className="flex flex-col min-h-screen bg-[#002a48]">
          {/* Editor Section */}
          <div className="flex-grow p-4">
            <CoverLetterEditor />
          </div>

          {/* Next Button */}
          <div className="sticky bottom-0 w-full p-4 bg-white shadow-t">
            <button
              onClick={togglePreviewMode}
              className="w-full bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-medium"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        // Preview Mode
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Sticky Options Bar */}
          <div className="sticky top-[64px] z-40 bg-gray-200 p-4 shadow-sm">
            <div className="flex flex-row flex-wrap justify-center items-center ">
              {/* Font Selector */}
              <select
                value={selectedFont}
                onChange={handleFontChange}
                className=" h-10 rounded-lg border border-blue-800 px-4 font-bold text-blue-800 bg-white"
              >
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

              {/* Color Picker */}
              <ColorPickers
                selectmultiplecolor={backgroundColorss}
                onChange={setBgColor}
              />

              {/* Template Selector */}
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                setSelectedPdfType={setSelectedPdfType}
              />
            </div>
          </div>

          {/* Preview Content */}
          <div className=" ">
            {!showSampleModal && (
              <CoverLetterPreview
                selectedTemplate={selectedTemplate}
                ref={templateRef}
              />
            )}
          </div>

          {/* Fixed Bottom Actions */}
          {/* <div className="sticky bottom-0 w-full bg-white shadow-t p-4"> */}
          <div className="flex items-center justify-center gap-2 p-2 fixed bottom-0 left-0 right-0 bg-white shadow-lg">
            <button
              onClick={togglePreviewMode}
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg text-sm"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={handleFinish}
              className="flex items-center justify-center gap-2 bg-blue-950 text-white px-4 py-3 rounded-lg text-sm"
            >
              <Save size={16} />
              Save
            </button>
            <button
              onClick={fetchSampleResumeData}
              disabled={isLoadingSample}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm ${
                isLoadingSample
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-black/80"
              } text-white`}
            >
              {isLoadingSample ? (
                <SaveLoader loadingText="Loading" />
              ) : (
                <>
                  <span>Sample</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownloadAsPDF}
              disabled={isDownloading}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm ${
                isDownloading
                  ? "bg-yellow-300 cursor-not-allowed"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white`}
            >
              {isDownloading ? (
                <SaveLoader loadingText="Downloading" />
              ) : (
                <>
                  <Download size={16} />
                  Download
                </>
              )}
            </button>
          </div>
        </div>
        // </div>
      )}

      {showSampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[500px] max-h-[80vh] flex flex-col overflow-hidden">
            {/* Header */}
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

            {/* Preview Area */}
            <div className="flex-1 flex justify-center items-center p-2">
              {previewImage ? (
                <div className="w-[400px] h-[400px] flex items-center justify-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={previewImage}
                    alt="Sample Cover Letter Preview"
                    width={794}
                    height={1200}
                    className="w-full h-full"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">
                    Loading sample cover letter...
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t bg-gray-50 relative z-20 text-center">
              <p className="text-xs text-gray-600">
                This is a sample preview with watermark. Download the full
                version without watermark.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Upgrade Plan
                </button>
              </div>

              {/* Pay & Download Button */}
              {/* <div className="border-t pt-4">
                <button
                  onClick={createPaymentForPlan5}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCoverLetterBuilder;
