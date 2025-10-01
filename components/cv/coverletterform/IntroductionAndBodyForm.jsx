// import React, { useContext } from "react";
// import { CoverLetterContext } from "../../context/CoverLetterContext";
// import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
// const IntroductionAndBodyForm = () => {
//   const { coverLetterData, setCoverLetterData } =
//     useContext(CoverLetterContext);

//   const handleIntroductionChange = (value) => {
//     setCoverLetterData((prevData) => ({
//       ...prevData,
//       introduction: value,
//     }));
//   };

//   const handleBodyChange = (index, value) => {
//     setCoverLetterData((prevData) => {
//       const updatedBody = [...prevData.body];
//       updatedBody[index] = value;
//       return {
//         ...prevData,
//         body: updatedBody,
//       };
//     });
//   };

//   const addBodyParagraph = () => {
//     setCoverLetterData((prevData) => ({
//       ...prevData,
//       body: [...prevData.body, ""], // Add a new empty paragraph
//     }));
//   };

//   const removeBodyParagraph = (index) => {
//     setCoverLetterData((prevData) => {
//       const updatedBody = prevData.body.filter((_, i) => i !== index);
//       return {
//         ...prevData,
//         body: updatedBody,
//       };
//     });
//   };

//   return (
//     <div className="p-4 md:p-8   rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-white">
//         Introduction & Body
//       </h2>

//       {/* Introduction Section */}
//       <div className="mb-6">
//         <label className="block text-white font-medium mb-2">
//           Introduction
//         </label>
//         <textarea
//           value={coverLetterData.introduction}
//           onChange={(e) => handleIntroductionChange(e.target.value)}
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           rows="4"
//           placeholder="Write your introduction here"
//         ></textarea>
//       </div>

//       {/* Body Section */}
//       <h3 className="text-xl font-semibold mb-4 text-white">Body Paragraphs</h3>
//       {coverLetterData.body.map((paragraph, index) => (
//         <div key={index} className="mb-4">
//           <div className="flex justify-between items-center">
//             <label className="block text-white font-medium mb-2">
//               Paragraph {index + 1}
//             </label>
//             <button
//               type="button"
//               onClick={() => removeBodyParagraph(index)}
//               aria-label="Remove"
//               className="p-2 text-white bg-red-700 rounded-lg text-xl mb-2"
//             >
//               <MdRemoveCircle />
//             </button>
//           </div>

//           <textarea
//             value={paragraph}
//             onChange={(e) => handleBodyChange(index, e.target.value)}
//             className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="4"
//             placeholder={`Write paragraph ${index + 1}`}
//           ></textarea>
//         </div>
//       ))}

//       {/* Add Paragraph Button */}

//       <button
//         type="button"
//         aria-label="Add"
//         className="p-2 text-white bg-black rounded-lg text-sm"
//         onClick={addBodyParagraph}
//       >
//         <span> ✙ Add section</span>
//       </button>
//     </div>
//   );
// };

// export default IntroductionAndBodyForm;

// import { useContext } from "react";
// import { CoverLetterContext } from "../../context/CoverLetterContext";
// import dynamic from "next/dynamic";

// import "react-quill/dist/quill.snow.css";
// import { Plus } from "lucide-react";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// const IntroductionAndBodyForm = () => {
//   const { coverLetterData, setCoverLetterData } =
//     useContext(CoverLetterContext);

//   const handleBodyChange = (index, value) => {
//     setCoverLetterData((prevData) => {
//       const updatedBody = [...prevData.body];
//       updatedBody[index] = value;
//       return {
//         ...prevData,
//         body: updatedBody,
//       };
//     });
//   };

//   const handleAIAssist = (index) => {
//     console.log(index);
//   };

//   return (
//     <div className="p-4 md:p-8 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-white">
//         Cover Letter Sections
//       </h2>

//       {coverLetterData.body.map((paragraph, index) => (
//         <div key={index} className="mb-4">
//           <div className="flex justify-between items-center">
//             <label className="block text-white font-medium mb-2">
//               Paragraph {index + 1}
//             </label>
//             <button
//               onClick={() => handleAIAssist(index)}
//               type="button"
//               className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg text-sm mb-2 hover:bg-gray-800 transition-all duration-300"
//             >
//               <Plus className="w-5 h-5" />
//               <span>AI Assist</span>
//             </button>
//           </div>

//           <ReactQuill
//             value={paragraph}
//             onChange={(value) => handleBodyChange(index, value)}
//             theme="snow"
//             placeholder={`Write paragraph ${index + 1}`}
//             className="bg-white"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default IntroductionAndBodyForm;

"use client";

import { useContext, useState, useEffect } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Plus, X } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/router";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const IntroductionAndBodyForm = () => {
  const { coverLetterData, setCoverLetterData } =
    useContext(CoverLetterContext);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const router = useRouter();

  const handleBodyChange = (index, value) => {
    // Remove HTML tags to get plain text length
    const plainText = value.replace(/<[^>]*>/g, "");

    // Limit to 1000 characters per paragraph
    if (plainText.length <= 1000) {
      setCoverLetterData((prevData) => {
        const updatedBody = [...prevData.body];
        updatedBody[index] = value;
        return { ...prevData, body: updatedBody };
      });
    }
  };

  const handleAIAssist = async (index) => {
    setLoadingIndex(index);
    setActiveIndex(index);
    setSelectedSuggestionIndex(0); // default to the first suggestion

    const { personalDetails } = coverLetterData;
    const { letterDetails } = coverLetterData;

    let endpoint = "";
    let payload = {};

    if (index === 0) {
      endpoint =
        "https://api.abroadium.com/api/jobseeker/aisummery-section1-coverletter";
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
        location: personalDetails.address,
      };
    } else if (index === 1) {
      endpoint =
        "https://api.abroadium.com/api/jobseeker/aisummery-section2-coverletter";
      payload = {
        target_role: personalDetails.position,
      };
    } else if (index === 2) {
      endpoint =
        "https://api.abroadium.com/api/jobseeker/aisummery-section3-coverletter";
      payload = {
        name: personalDetails.name,
        target_role: personalDetails.position,
        company_name: letterDetails.companyName,
      };
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setPopupContent("Unauthorized: No token found.");
        setPopupVisible(true);
        setLoadingIndex(null);
        return;
      }

      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const data = response.data.data;
      setPopupContent(
        data?.cover_letter_analysis?.professional_summaries?.join("\n\n") ||
          "No content received."
      );

      setPopupVisible(true);
    } catch (error) {
      // Check if it's a 403 error (API limit exceeded)
      if (error.response?.status === 403) {
        setShowUpgradePopup(true);
      } else {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong.";
        setPopupContent(message);
        setPopupVisible(true);
      }
      console.error(error);
    } finally {
      setLoadingIndex(null);
    }
  };

  const insertToParagraph = () => {
    if (activeIndex !== null && Array.isArray(splitContent)) {
      const selectedText = splitContent[selectedSuggestionIndex];
      handleBodyChange(activeIndex, selectedText || "");
      setPopupVisible(false);
    }
  };
  const splitContent = popupContent
    .split("\n\n")
    .filter((s) => s.trim() !== "");

  const sectionTitles = [
    "Introduction: Stating Intent Clearly",
    "Hook: Why You’re a Fit",
    "Proof & Sign-Off: Show Value and Close Strong",
  ];
  return (
    <div className="p-4 md:p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Cover Letter Sections
      </h2>

      {coverLetterData.body.map((paragraph, index) => {
        return (
          <div key={index} className="mb-6">
            <div className="flex justify-between items-center">
              <label className="block text-white font-medium mb-2">
                {sectionTitles[index] || `Paragraph ${index + 1}`}
              </label>
              <button
                onClick={() => handleAIAssist(index)}
                type="button"
                className="flex items-center gap-2 p-2 px-4 bg-black text-white rounded-lg text-sm mb-2 hover:bg-gray-800 transition-all duration-300"
                disabled={loadingIndex === index}
              >
                <Plus className="w-5 h-5" />
                <span>
                  {loadingIndex === index ? "Loading..." : "AI Assist"}
                </span>
              </button>
            </div>

            <ReactQuill
              value={paragraph}
              onChange={(value) => handleBodyChange(index, value)}
              theme="snow"
              placeholder={`Write: ${
                sectionTitles[index] || `Paragraph ${index + 1}`
              }`}
              className="bg-white"
            />
            <div className="text-sm text-gray-500 mt-1 text-right">
              {(paragraph?.replace(/<[^>]*>/g, "") || "").length}/1000
            </div>
          </div>
        );
      })}

      {/* Popup Modal */}
      {popupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">AI Suggested Content</h3>
            {splitContent.map((text, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="ai-suggestion"
                  value={idx}
                  checked={selectedSuggestionIndex === idx}
                  onChange={() => setSelectedSuggestionIndex(idx)}
                  className="mt-1"
                />
                <span className="whitespace-pre-line">{text}</span>
              </label>
            ))}
            <div className="mt-4 flex justify-end">
              <button
                onClick={insertToParagraph}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Insert to{" "}
                {sectionTitles[activeIndex] || `Paragraph ${activeIndex + 1}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Plan Popup */}
      {showUpgradePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setShowUpgradePopup(false)}
              className="absolute top-2 right-2 text-black hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  API Limit Exceeded
                </h3>
                <p className="text-gray-600 mb-6">
                  You`&apos;`ve reached your AI assistance limit. Upgrade your
                  plan to continue using AI features and unlock unlimited
                  assistance.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push("/payment")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  Upgrade Plan
                </button>

                <button
                  onClick={() => setShowUpgradePopup(false)}
                  className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Continue Without AI
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroductionAndBodyForm;
