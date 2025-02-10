// // import FormButton from "./FormButton";
// // import React, { useContext, useState } from "react";
// // import dynamic from "next/dynamic";
// // import "react-quill/dist/quill.snow.css";
// // import { ResumeContext } from "../context/ResumeContext";
// // import { Trash } from "lucide-react";
// // import axios from "axios";
// // const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// // const Projects = () => {
// //   const { resumeData, setResumeData } = useContext(ResumeContext);
// //   const [activeTooltip, setActiveTooltip] = useState(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [loadingStates, setLoadingStates] = useState({});
// //   const [error, setError] = useState("");
// //   const [summaries, setSummaries] = useState([]);
// //   const [selectedSummaries, setSelectedSummaries] = useState([]);
// //   const [showPopup, setShowPopup] = useState(false);
// //   const [popupIndex, setPopupIndex] = useState(null);
// //   const [searchValue, setSearchValue] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [locationSuggestions, setLocationSuggestions] = useState([]);
// //   const [showLocationDropdown, setShowLocationDropdown] = useState(false);
// //   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([]);
// //   const [companySuggestions, setCompanySuggestions] = useState([]);
// //   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false);
// //   const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
// //   const [expandedExperiences, setExpandedExperiences] = useState([]);
// //   const [popupType, setPopupType] = useState(""); // Track popup type
// //   const [descriptions, setDescriptions] = useState([]); // Stores descriptions
// //   const [keyAchievements, setKeyAchievements] = useState([]); // Stores key achievements

// //   const [selectedDescriptions, setSelectedDescriptions] = useState([]); // Stores selected descriptions
// //   const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([]); // Stores selected key achievements

// //   const token = localStorage.getItem("token");
// //   const months = [
// //     "January",
// //     "February",
// //     "March",
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //   ];
// //   const years = Array.from({ length: 40 }, (_, index) => 1980 + index);

// //   const handleProjects = (e, index) => {
// //     const newProjects = [...resumeData.projects];
// //     newProjects[index][e.target.name] = e.target.value;
// //     setResumeData({ ...resumeData, projects: newProjects });
// //   };

// //   const handleKeyAchievement = (e, projectIndex, achievementIndex) => {
// //     const newProjects = [...resumeData.projects];
// //     if (!Array.isArray(newProjects[projectIndex].keyAchievements)) {
// //       newProjects[projectIndex].keyAchievements = [];
// //     }
// //     newProjects[projectIndex].keyAchievements[achievementIndex] =
// //       e.target.value;
// //     setResumeData({ ...resumeData, projects: newProjects });
// //   };

// //   const addKeyAchievement = (projectIndex) => {
// //     const newProjects = [...resumeData.projects];
// //     if (!Array.isArray(newProjects[projectIndex].keyAchievements)) {
// //       newProjects[projectIndex].keyAchievements = [];
// //     }
// //     newProjects[projectIndex].keyAchievements.push("");
// //     setResumeData({ ...resumeData, projects: newProjects });
// //   };

// //   const removeKeyAchievement = (projectIndex, achievementIndex) => {
// //     const newProjects = [...resumeData.projects];
// //     newProjects[projectIndex].keyAchievements.splice(achievementIndex, 1);
// //     setResumeData({ ...resumeData, projects: newProjects });
// //   };

// //   const addProjects = () => {
// //     setResumeData({
// //       ...resumeData,
// //       projects: [
// //         ...(resumeData.projects || []),
// //         {
// //           title: "",
// //           link: "",
// //           description: "",
// //           keyAchievements: [""], // Initialize with one empty achievement
// //           startYear: "",
// //           startMonth: "",
// //           endYear: "",
// //           endMonth: "",
// //           name: "",
// //         },
// //       ],
// //     });
// //   };

// //   const removeProjects = (index) => {
// //     const newProjects = [...(resumeData.projects || [])];
// //     newProjects.splice(index, 1);
// //     setResumeData({ ...resumeData, projects: newProjects });
// //   };
// //   const handleAIAssistDescription = async (index) => {
// //     // setLoadingStates((prev) => ({ ...prev, [index]: true }));
// //     setLoadingStates((prev) => ({
// //       ...prev,
// //       [`description_${index}`]: true, // ✅ Separate loading state for description
// //     }));
// //     setError("");

// //     try {
// //       const response = await axios.post(
// //         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-summery-data",
// //         {
// //           key: "professional_experience",
// //           keyword:
// //             "Generate multiple professional summaries and descriptions for professional experience",
// //           content:
// //             resumeData.projects[index].description || "Project description",
// //           company_name: resumeData.projects[index].name || "N/A",
// //           job_title: resumeData.projects[index].title || "Project",
// //           location: resumeData.projects[index].link || "N/A",
// //         },
// //         {
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       setDescriptions(response.data.data.resume_analysis.project_summaries); // ✅ Store in descriptions state
// //       setPopupIndex(index);
// //       setPopupType("description");
// //       setShowPopup(true);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       // setLoadingStates((prev) => ({ ...prev, [index]: false }));
// //       setLoadingStates((prev) => ({
// //         ...prev,
// //         [`description_${index}`]: false, // ✅ Reset only description button
// //       }));
// //     }
// //   };
// //   const handleAIAssistKey = async (index) => {
// //     setLoadingStates((prev) => ({
// //       ...prev,
// //       [`key_${index}`]: true, // ✅ Separate loading state for key achievements
// //     }));
// //     setError("");

// //     try {
// //       const response = await axios.post(
// //         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-key-data",
// //         {
// //           key: "professional_experience",
// //           keyword:
// //             "Generate professional summary and Checklist of professional experience in manner of content and information",
// //           content:
// //             resumeData.projects[index].description || "Project description",
// //           company_name: resumeData.projects[index].name || "N/A",
// //           job_title: resumeData.projects[index].title || "Project",
// //           location: resumeData.projects[index].link || "N/A",
// //         },
// //         {
// //           headers: {
// //             Authorization: token,
// //           },
// //         }
// //       );

// //       setKeyAchievements(response.data.data.resume_analysis.responsibilities); // ✅ Store in keyAchievements state
// //       setPopupIndex(index);
// //       setPopupType("keyAchievements");
// //       setShowPopup(true);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoadingStates((prev) => ({
// //         ...prev,
// //         [`key_${index}`]: false, // ✅ Reset only key achievements button
// //       }));
// //     }
// //   };

// //   const handleSummarySelect = (item) => {
// //     if (popupType === "description") {
// //       setSelectedDescriptions((prev) =>
// //         prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
// //       );
// //     } else {
// //       setSelectedKeyAchievements((prev) =>
// //         prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
// //       );
// //     }
// //   };

// //   const handleSaveSelectedSummary = (index, e) => {
// //     e.preventDefault();
// //     const newWorkExperience = [...resumeData.projects];

// //     if (popupType === "description") {
// //       newWorkExperience[index].description = selectedDescriptions.join(" ");
// //     } else {
// //       newWorkExperience[index].KeyAchievements = selectedKeyAchievements;
// //     }

// //     setResumeData({
// //       ...resumeData,
// //       projects: newWorkExperience,
// //     });

// //     setShowPopup(false);
// //   };
// //   return (
// //     <div className="flex-col-gap-3 w-full mt-10 px-10">
// //       <h2 className="input-title text-white text-3xl">Projects</h2>
// //       {resumeData.projects && resumeData.projects.length > 0 ? (
// //         resumeData.projects.map((project, projectIndex) => (
// //           <div key={projectIndex} className="f-col">
// //             <input
// //               type="text"
// //               placeholder="Project Name"
// //               name="name"
// //               className="w-full other-input border-black border"
// //               value={project.name}
// //               onChange={(e) => handleProjects(e, projectIndex)}
// //             />
// //             <input
// //               type="text"
// //               placeholder="Link"
// //               name="link"
// //               className="w-full other-input border-black border"
// //               value={project.link}
// //               onChange={(e) => handleProjects(e, projectIndex)}
// //             />
// //             <div className="flex justify-between mb-2">
// //               <label className="text-white">Description</label>

// //               <button
// //                 type="button"
// //                 className="border bg-black text-white px-3 rounded-3xl"
// //                 onClick={() => handleAIAssistDescription(projectIndex)}
// //                 disabled={loadingStates[`description_${projectIndex}`]} // ✅ Correct variable
// //               >
// //                 {loadingStates[`description_${projectIndex}`]
// //                   ? "Loading..."
// //                   : "+ Smart Assist"}
// //               </button>
// //             </div>
// //             <textarea
// //               placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used."
// //               className="w-full other-input border-black border h-100 max-w-[33rem] p-2"
// //               value={project.description}
// //               onChange={(e) =>
// //                 handleProjects(
// //                   { target: { name: "description", value: e.target.value } },
// //                   projectIndex
// //                 )
// //               }
// //             />

// //             {/* Key Achievements Section */}
// //             <div className="mt-4">
// //               <label className="text-white mb-2 block">Key Achievements</label>
// //               {Array.isArray(project.keyAchievements) &&
// //                 project.keyAchievements.map((achievement, achievementIndex) => (
// //                   <div key={achievementIndex} className="flex gap-2 mb-2">
// //                     <textarea
// //                       placeholder="Enter key achievement"
// //                       className="w-full other-input border-black border p-2"
// //                       value={achievement}
// //                       onChange={(e) =>
// //                         handleKeyAchievement(e, projectIndex, achievementIndex)
// //                       }
// //                     />
// //                     <button
// //                       onClick={() =>
// //                         removeKeyAchievement(projectIndex, achievementIndex)
// //                       }
// //                       className="bg-red-500 text-white px-2 py-1 rounded"
// //                       type="button"
// //                     >
// //                       <Trash />
// //                     </button>
// //                   </div>
// //                 ))}
// //               <button
// //                 onClick={() => addKeyAchievement(projectIndex)}
// //                 className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
// //                 type="button"
// //               >
// //                 Add Achievement
// //               </button>
// //               <button
// //                 type="button"
// //                 className="border bg-black text-white px-3 rounded-3xl"
// //                 onClick={() => handleAIAssistKey(projectIndex)}
// //                 disabled={loadingStates[`key_${projectIndex}`]} // ✅ Correct variable
// //               >
// //                 {loadingStates[`key_${projectIndex}`]
// //                   ? "Loading..."
// //                   : "+ Key Assist"}
// //               </button>
// //             </div>

// //             <div className="">
// //               <label className="mt-2 text-white">Start Date</label>
// //               <div className="flex-wrap-gap-2">
// //                 <select
// //                   name="startMonth"
// //                   className="other-input border-black border flex-1"
// //                   value={project.startMonth}
// //                   onChange={(e) => handleProjects(e, projectIndex)}
// //                 >
// //                   <option value="">Select Month</option>
// //                   {months.map((month, idx) => (
// //                     <option key={idx} value={month}>
// //                       {month}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <select
// //                   name="startYear"
// //                   className="other-input border-black border flex-1"
// //                   value={project.startYear}
// //                   onChange={(e) => handleProjects(e, projectIndex)}
// //                 >
// //                   <option value="">Select Year</option>
// //                   {years.map((year, idx) => (
// //                     <option key={idx} value={year}>
// //                       {year}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <label className="mt-2 text-white">End Date</label>
// //               <div className="flex-wrap-gap-2">
// //                 <select
// //                   name="endMonth"
// //                   className="other-input border-black border flex-1"
// //                   value={project.endMonth}
// //                   onChange={(e) => handleProjects(e, projectIndex)}
// //                 >
// //                   <option value="">Select Month</option>
// //                   {months.map((month, idx) => (
// //                     <option key={idx} value={month}>
// //                       {month}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <select
// //                   name="endYear"
// //                   className="other-input border-black border flex-1"
// //                   value={project.endYear}
// //                   onChange={(e) => handleProjects(e, projectIndex)}
// //                 >
// //                   <option value="">Select Year</option>
// //                   {years.map((year, idx) => (
// //                     <option key={idx} value={year}>
// //                       {year}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>
// //             </div>
// //           </div>
// //         ))
// //       ) : (
// //         <p className="text-white">
// //           No projects available. Add a new project to get started.
// //         </p>
// //       )}
// //       <FormButton
        // size={resumeData.projects ? resumeData.projects.length : 0}
        // add={addProjects}
        // remove={removeProjects}
// //       />
// //       {showPopup && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// //           <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
// //             <h3 className="text-xl font-bold mb-4">
// //               {popupType === "description"
// //                 ? "Select Description"
// //                 : "Select Key Achievements"}
// //             </h3>
// //             <div className="space-y-3 max-h-96 overflow-y-auto">
// //               {(popupType === "description"
// //                 ? descriptions
// //                 : keyAchievements
// //               ).map((item, index) => (
// //                 <div key={index} className="flex items-start gap-3">
// //                   <input
// //                     type="checkbox"
// //                     checked={
// //                       popupType === "description"
// //                         ? selectedDescriptions.includes(item)
// //                         : selectedKeyAchievements.includes(item)
// //                     }
// //                     onChange={() => handleSummarySelect(item)}
// //                     className="mt-1"
// //                   />
// //                   <p className="text-gray-800">{item}</p>
// //                 </div>
// //               ))}
// //             </div>
// //             <button
// //               onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
// //               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
// //             >
// //               Save Selection
// //             </button>
// //             <button
// //               onClick={() => setShowPopup(false)}
// //               className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
// //             >
// //               Close
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Projects;


// "use client"
// import { useContext, useState } from "react"
// import dynamic from "next/dynamic"
// import "react-quill/dist/quill.snow.css"
// import { ResumeContext } from "../context/ResumeContext"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import axios from "axios"
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

// const Projects = () => {
//   const { resumeData, setResumeData } = useContext(ResumeContext)
//   const [activeTooltip, setActiveTooltip] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)
//   const [loadingStates, setLoadingStates] = useState({})
//   const [error, setError] = useState("")
//   const [summaries, setSummaries] = useState([])
//   const [selectedSummaries, setSelectedSummaries] = useState([])
//   const [showPopup, setShowPopup] = useState(false)
//   const [popupIndex, setPopupIndex] = useState(null)
//   const [searchValue, setSearchValue] = useState("")
//   const [searchResults, setSearchResults] = useState([])
//   const [locationSuggestions, setLocationSuggestions] = useState([])
//   const [showLocationDropdown, setShowLocationDropdown] = useState(false)
//   const [jobTitleSuggestions, setJobTitleSuggestions] = useState([])
//   const [companySuggestions, setCompanySuggestions] = useState([])
//   const [showJobTitleDropdown, setShowJobTitleDropdown] = useState(false)
//   const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
//   const [expandedProjects, setExpandedProjects] = useState([])
//   const [popupType, setPopupType] = useState("")
//   const [descriptions, setDescriptions] = useState([])
//   const [keyAchievements, setKeyAchievements] = useState([])
//   const [selectedDescriptions, setSelectedDescriptions] = useState([])
//   const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([])

//   const token = localStorage.getItem("token")
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ]
//   const years = Array.from({ length: 40 }, (_, index) => 1980 + index)

//   const handleProjects = (e, index) => {
//     e.preventDefault()
//     const newProjects = [...resumeData.projects]
//     newProjects[index][e.target.name] = e.target.value
//     setResumeData({ ...resumeData, projects: newProjects })
//   }

//   const handleKeyAchievement = (e, projectIndex) => {
//     const newProjects = [...resumeData.projects]
//     newProjects[projectIndex].keyAchievements = e.target.value
//     setResumeData({ ...resumeData, projects: newProjects })
//   }

//   const addProjects = () => {
//     setResumeData({
//       ...resumeData,
//       projects: [
//         ...(resumeData.projects || []),
//         {
//           title: "",
//           link: "",
//           description: "",
//           keyAchievements: "",
//           startYear: "",
//           startMonth: "",
//           endYear: "",
//           endMonth: "",
//           name: "",
//         },
//       ],
//     })
//     setExpandedProjects([...expandedProjects, resumeData.projects.length])
//   }

//   const removeProjects = (index) => {
//     const newProjects = [...(resumeData.projects || [])]
//     newProjects.splice(index, 1)
//     setResumeData({ ...resumeData, projects: newProjects })
//     setExpandedProjects(expandedProjects.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)))
//   }

//   const toggleProjectExpansion = (index) => {
//     setExpandedProjects((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
//   }

//   const handleAIAssistDescription = async (index) => {
//     setLoadingStates((prev) => ({
//       ...prev,
//       [`description_${index}`]: true,
//     }))
//     setError("")

//     try {
//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-summery-data",
//         {
//           key: "professional_experience",
//           keyword: "Generate multiple professional summaries and descriptions for professional experience",
//           content: resumeData.projects[index].description || "Project description",
//           company_name: resumeData.projects[index].name || "N/A",
//           job_title: resumeData.projects[index].title || "Project",
//           location: resumeData.projects[index].link || "N/A",
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       )

//       setDescriptions(response.data.data.resume_analysis.project_summaries)
//       setPopupIndex(index)
//       setPopupType("description")
//       setShowPopup(true)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoadingStates((prev) => ({
//         ...prev,
//         [`description_${index}`]: false,
//       }))
//     }
//   }

//   const handleAIAssistKey = async (index) => {
//     setLoadingStates((prev) => ({
//       ...prev,
//       [`key_${index}`]: true,
//     }))
//     setError("")

//     try {
//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-key-data",
//         {
//           key: "professional_experience",
//           keyword:
//             "Generate professional summary and Checklist of professional experience in manner of content and information",
//           content: resumeData.projects[index].description || "Project description",
//           company_name: resumeData.projects[index].name || "N/A",
//           job_title: resumeData.projects[index].title || "Project",
//           location: resumeData.projects[index].link || "N/A",
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         },
//       )

//       setKeyAchievements(response.data.data.resume_analysis.responsibilities)
//       setPopupIndex(index)
//       setPopupType("keyAchievements")
//       setShowPopup(true)
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoadingStates((prev) => ({
//         ...prev,
//         [`key_${index}`]: false,
//       }))
//     }
//   }

//   const handleSummarySelect = (item) => {
//     if (popupType === "description") {
//       setSelectedDescriptions((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//     } else {
//       setSelectedKeyAchievements((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
//     }
//   }

//   const handleSaveSelectedSummary = (index, e) => {
//     e.preventDefault()
//     const newProjects = [...resumeData.projects]

//     if (popupType === "description") {
//       newProjects[index].description = selectedDescriptions.join(" ")
//     } else {
//       newProjects[index].keyAchievements = selectedKeyAchievements.join("\n")
//     }

//     setResumeData({
//       ...resumeData,
//       projects: newProjects,
//     })

//     setShowPopup(false)
//   }
//   const handleSelect = (e, index, fieldName) => {
//     e.preventDefault() // Prevent form submission
//     const newProjects = [...resumeData.projects]
//     newProjects[index][fieldName] = e.target.value
//     setResumeData({ ...resumeData, projects: newProjects })
//   }

//   return (
//     <div className="flex-col-gap-3 w-full mt-10 px-10">
//       <h2 className="input-title text-white text-3xl">Projects</h2>
//       {resumeData.projects && resumeData.projects.length > 0 ? (
//         resumeData.projects.map((project, projectIndex) => (
//           <div key={projectIndex} className="f-col mb-4 border border-gray-300 rounded-lg p-4">
//             <div className="flex justify-between items-center mb-2">
//               <h3 className="text-white text-xl">{project.name || `Project ${projectIndex + 1}`}</h3>
//               <button onClick={() => toggleProjectExpansion(projectIndex)} className="text-white">
//                 {expandedProjects.includes(projectIndex) ? <ChevronUp /> : <ChevronDown />}
//               </button>
//             </div>
//             {expandedProjects.includes(projectIndex) && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Project Name"
//                   name="name"
//                   className="w-full other-input border-black border mb-2"
//                   value={project.name}
//                   onChange={(e) => handleProjects(e, projectIndex)}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Link"
//                   name="link"
//                   className="w-full other-input border-black border mb-2"
//                   value={project.link}
//                   onChange={(e) => handleProjects(e, projectIndex)}
//                 />
//                 <div className="flex justify-between mb-2">
//                   <label className="text-white">Description</label>
//                   <button
//                     type="button"
//                     className="border bg-black text-white px-3 rounded-3xl"
//                     onClick={() => handleAIAssistDescription(projectIndex)}
//                     disabled={loadingStates[`description_${projectIndex}`]}
//                   >
//                     {loadingStates[`description_${projectIndex}`] ? "Loading..." : "+ Smart Assist"}
//                   </button>
//                 </div>
//                 <textarea
//                   placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used."
//                   className="w-full other-input border-black border h-24 max-w-[33rem] p-2 mb-2"
//                   value={project.description}
//                   onChange={(e) =>
//                     handleProjects({ target: { name: "description", value: e.target.value } }, projectIndex)
//                   }
//                 />
//                 <div className="mt-4">
//                   <div className="flex justify-between mb-2">
//                     <label className="text-white">Key Achievements</label>
//                     <button
//                       type="button"
//                       className="border bg-black text-white px-3 rounded-3xl"
//                       onClick={() => handleAIAssistKey(projectIndex)}
//                       disabled={loadingStates[`key_${projectIndex}`]}
//                     >
//                       {loadingStates[`key_${projectIndex}`] ? "Loading..." : "+ Key Assist"}
//                     </button>
//                   </div>
//                   <textarea
//                     placeholder="Enter key achievements (one per line)"
//                     className="w-full other-input border-black border h-24 max-w-[33rem] p-2 mb-2"
//                     value={project.keyAchievements}
//                     onChange={(e) => handleKeyAchievement(e, projectIndex)}
//                   />
//                 </div>
//                 <div className="">
//                   <label className="mt-2 text-white">Start Date</label>
//                   <div className="flex-wrap-gap-2">
//                     <select
//                       name="startMonth"
//                       className="other-input border-black border flex-1"
//                       value={project.startMonth}
//                       oonChange={(e) => handleSelect(e, projectIndex, 'startMonth')}
//                     >
//                       <option value="">Select Month</option>
//                       {months.map((month, idx) => (
//                         <option key={idx} value={month}>
//                           {month}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       name="startYear"
//                       className="other-input border-black border flex-1"
//                       value={project.startYear}
//                       onChange={(e) => handleSelect(e, projectIndex, 'startYear')}
//                     >
//                       <option value="">Select Year</option>
//                       {years.map((year, idx) => (
//                         <option key={idx} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <label className="mt-2 text-white">End Date</label>
//                   <div className="flex-wrap-gap-2">
//                     <select
//                       name="endMonth"
//                       className="other-input border-black border flex-1"
//                       value={project.endMonth}
//                       onChange={(e) => handleSelect(e, projectIndex, 'endMonth')}
//                     >
//                       <option value="">Select Month</option>
//                       {months.map((month, idx) => (
//                         <option key={idx} value={month}>
//                           {month}
//                         </option>
//                       ))}
//                     </select>
//                     <select
//                       name="endYear"
//                       className="other-input border-black border flex-1"
//                       value={project.endYear}
//                       onChange={(e) => handleSelect(e, projectIndex, 'endYear')}
//                     >
//                       <option value="">Select Year</option>
//                       {years.map((year, idx) => (
//                         <option key={idx} value={year}>
//                           {year}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeProjects(projectIndex)}
//                   className="bg-red-500 text-white px-4 py-2 rounded mt-4"
//                   type="button"
//                 >
//                   Remove Project
//                 </button>
//               </>
//             )}
//           </div>
//         ))
//       ) : (
//         <p className="text-white">No projects available. Add a new project to get started.</p>
//       )}
//       <button onClick={addProjects} className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button">
//         Add Project
//       </button>
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
//             <h3 className="text-xl font-bold mb-4">
//               {popupType === "description" ? "Select Description" : "Select Key Achievements"}
//             </h3>
//             <div className="space-y-3 max-h-96 overflow-y-auto">
//               {(popupType === "description" ? descriptions : keyAchievements).map((item, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <input
//                     type="checkbox"
//                     checked={
//                       popupType === "description"
//                         ? selectedDescriptions.includes(item)
//                         : selectedKeyAchievements.includes(item)
//                     }
//                     onChange={() => handleSummarySelect(item)}
//                     className="mt-1"
//                   />
//                   <p className="text-gray-800">{item}</p>
//                 </div>
//               ))}
//             </div>
//             <button
//               onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
//               className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
//             >
//               Save Selection
//             </button>
//             <button
//               onClick={() => setShowPopup(false)}
//               className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Projects

"use client"

import { useContext, useState } from "react"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"
import { ResumeContext } from "../context/ResumeContext"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"
import FormButton from "./FormButton"
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

const Projects = () => {
  const { resumeData, setResumeData } = useContext(ResumeContext)
  const [loadingStates, setLoadingStates] = useState({})
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [popupIndex, setPopupIndex] = useState(null)
  const [expandedProjects, setExpandedProjects] = useState([])
  const [popupType, setPopupType] = useState("")
  const [descriptions, setDescriptions] = useState([])
  const [keyAchievements, setKeyAchievements] = useState([])
  const [selectedDescriptions, setSelectedDescriptions] = useState([])
  const [selectedKeyAchievements, setSelectedKeyAchievements] = useState([])

  const token = localStorage.getItem("token")
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const years = Array.from({ length: 40 }, (_, index) => 2000 + index)

  const handleProjects = (e, index) => {
    const newProjects = [...resumeData.projects]
    newProjects[index][e.target.name] = e.target.value
    setResumeData({ ...resumeData, projects: newProjects })
  }

  const handleKeyAchievement = (e, projectIndex) => {
    // const newProjects = [...resumeData.projects]
    // newProjects[projectIndex].keyAchievements = e.target.value
    // setResumeData({ ...resumeData, projects: newProjects })
    const newProjects = [...resumeData.projects];
    const achievements = e.target.value.split('\n').filter(item => item.trim())
    newProjects[projectIndex].keyAchievements = achievements
    setResumeData({ ...resumeData, projects: newProjects })
  }

  const addProjects = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...(resumeData.projects || []),
        {
          title: "",
          link: "",
          description: "",
          keyAchievements: "",
          startYear: "",
          startMonth: "",
          endYear: "",
          endMonth: "",
          name: "",
        },
      ],
    })
    setExpandedProjects([...expandedProjects, resumeData.projects.length])
  }

  const removeProjects = (index) => {
    const newProjects = [...(resumeData.projects || [])]
    newProjects.splice(index, 1)
    setResumeData({ ...resumeData, projects: newProjects })
    setExpandedProjects(expandedProjects.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)))
  }

  const toggleProjectExpansion = (index, e) => {
    e.preventDefault() // Prevent the default button behavior
    setExpandedProjects((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const handleAIAssistDescription = async (index) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`description_${index}`]: true,
    }))
    setError("")

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-summery-data",
        {
          key: "professional_experience",
          keyword: "Generate multiple professional summaries and descriptions for professional experience",
          content: resumeData.projects[index].description || "Project description",
          company_name: resumeData.projects[index].name || "N/A",
          job_title: resumeData.projects[index].title || "Project",
          location: resumeData.projects[index].link || "N/A",
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      setDescriptions(response.data.data.resume_analysis.project_summaries)
      setPopupIndex(index)
      setPopupType("description")
      setShowPopup(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`description_${index}`]: false,
      }))
    }
  }

  const handleAIAssistKey = async (index) => {
    setLoadingStates((prev) => ({
      ...prev,
      [`key_${index}`]: true,
    }))
    setError("")

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/ai-resume-project-key-data",
        {
          key: "professional_experience",
          keyword:
            "Generate professional summary and Checklist of professional experience in manner of content and information",
          content: resumeData.projects[index].description || "Project description",
          company_name: resumeData.projects[index].name || "N/A",
          job_title: resumeData.projects[index].title || "Project",
          location: resumeData.projects[index].link || "N/A",
        },
        {
          headers: {
            Authorization: token,
          },
        },
      )

      setKeyAchievements(response.data.data.resume_analysis.responsibilities)
      setPopupIndex(index)
      setPopupType("keyAchievements")
      setShowPopup(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [`key_${index}`]: false,
      }))
    }
  }

  const handleSummarySelect = (item) => {
    if (popupType === "description") {
      setSelectedDescriptions((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    } else {
      setSelectedKeyAchievements((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
    }
  }

  const handleSaveSelectedSummary = (index, e) => {
    e.preventDefault()
    const newProjects = [...resumeData.projects]

    if (popupType === "description") {
      newProjects[index].description = selectedDescriptions.join(" ")
    } else {
      newProjects[index].keyAchievements = selectedKeyAchievements
    }

    setResumeData({
      ...resumeData,
      projects: newProjects,
    })

    setShowPopup(false)
  }

  return (
    <div className="flex-col-gap-3 w-full mt-10 px-10">
      <h2 className="input-title text-white text-3xl">Projects</h2>
      {resumeData.projects && resumeData.projects.length > 0 ? (
        resumeData.projects.map((project, projectIndex) => (
          <div key={projectIndex} className="f-col mt-4 mb-4 border border-gray-300 bg-white rounded-lg p-4">
            <div className="flex  justify-between items-center mb-2">
              <h3 className="text-black text-xl font-semibold">{project.name || `Project ${projectIndex + 1}`}</h3>
              <button
                onClick={(e) => toggleProjectExpansion(projectIndex, e)}
                className="text-black"
                type="button" // Explicitly set the button type
              >
                {expandedProjects.includes(projectIndex) ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            {expandedProjects.includes(projectIndex) && (
              <>
                <input
                  type="text"
                  placeholder="Project Name"
                  name="name"
                  className="w-full other-input border-black border mb-2"
                  value={project.name}
                  onChange={(e) => handleProjects(e, projectIndex)}
                />
                <div className="flex flex-col justify-between mb-2">
                <label className="text-black">Link </label>
                <input
                  type="text"
                  placeholder="Link"
                  name="link"
                  className="w-full other-input border-black border mb-2"
                  value={project.link}
                  onChange={(e) => handleProjects(e, projectIndex)}
                />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="text-black">Description</label>
                  <button
                    type="button"
                    className="border bg-black text-white px-3 rounded-3xl"
                    onClick={() => handleAIAssistDescription(projectIndex)}
                    disabled={loadingStates[`description_${projectIndex}`]}
                  >
                    {loadingStates[`description_${projectIndex}`] ? "Loading..." : "+ Smart Assist"}
                  </button>
                </div>
                <textarea
                  placeholder="Describe your project in 2-3 sentences. Include details like the project's purpose, your role, and the technologies/tools used."
                  className="w-full other-input border-black border h-24 max-w-[33rem] p-2 mb-2"
                  value={project.description}
                  onChange={(e) =>
                    handleProjects({ target: { name: "description", value: e.target.value } }, projectIndex)
                  }
                />
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-black">Key Achievements</label>
                    <button
                      type="button"
                      className="border bg-black text-white px-3 rounded-3xl"
                      onClick={() => handleAIAssistKey(projectIndex)}
                      disabled={loadingStates[`key_${projectIndex}`]}
                    >
                      {loadingStates[`key_${projectIndex}`] ? "Loading..." : "+ Smart Assist"}
                    </button>
                  </div>
                  <textarea
                    placeholder="Enter key achievements (one per line)"
                    className="w-full other-input border-black border h-24 max-w-[33rem] p-2 mb-2"
                    value={project.keyAchievements}
                    onChange={(e) => handleKeyAchievement(e, projectIndex)}
                    
                  />
                 
                </div>
                <div className="">
                  <label className="mt-2 text-black">Start Date</label>
                  <div className="flex-wrap-gap-2">
                    <select
                      name="startMonth"
                      className="other-input border-black border flex-1"
                      value={project.startMonth}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="startYear"
                      className="other-input border-black border flex-1"
                      value={project.startYear}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="mt-2 text-black">End Date</label>
                  <div className="flex-wrap-gap-2">
                    <select
                      name="endMonth"
                      className="other-input border-black border flex-1"
                      value={project.endMonth}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Month</option>
                      {months.map((month, idx) => (
                        <option key={idx} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      name="endYear"
                      className="other-input border-black border flex-1"
                      value={project.endYear}
                      onChange={(e) => handleProjects(e, projectIndex)}
                    >
                      <option value="">Select Year</option>
                      {years.map((year, idx) => (
                        <option key={idx} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => removeProjects(projectIndex)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-4"
                  type="button"
                >
                  Remove Project
                </button>
              </>
            )}
          </div>
        ))
      ) : (
        <p className="text-white">No projects available. Add a new project to get started.</p>
      )}
      {/* <button onClick={addProjects} className="bg-blue-500 text-white px-4 py-2 rounded mt-4" type="button">
        Add Project
      </button> */}
      <FormButton
        size={resumeData.projects ? resumeData.projects.length : 0}
        add={addProjects}
        remove={removeProjects}
      />
      {showPopup && (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        //   <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
        //     <h3 className="text-xl font-bold mb-4">
        //       {popupType === "description" ? "Select Description" : "Select Key Achievements"}
        //     </h3>
        //     <div className="space-y-3 max-h-96 overflow-y-auto">
        //       {(popupType === "description" ? descriptions : keyAchievements).map((item, index) => (
        //         <div key={index} className="flex items-start gap-3">
        //           <input
        //             type="checkbox"
        //             checked={
        //               popupType === "description"
        //                 ? selectedDescriptions.includes(item)
        //                 : selectedKeyAchievements.includes(item)
        //             }
        //             onChange={() => handleSummarySelect(item)}
        //             className="mt-1"
        //           />
        //           <p className="text-gray-800">{item}</p>
        //         </div>
        //       ))}
        //     </div>
        //     <button
        //       onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
        //       className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        //     >
        //       Save Selection
        //     </button>
        //     <button
        //       onClick={() => setShowPopup(false)}
        //       className="mt-2 ml-2 bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
        //     >
        //       Close
        //     </button>
        //   </div>
        // </div>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">
              {popupType === "description" ? "Select Description" : "Select Key Achievements"}
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {(popupType === "description" ? descriptions : keyAchievements).map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={
                      popupType === "description"
                        ? selectedDescriptions.includes(item)
                        : selectedKeyAchievements.includes(item)
                    }
                    onChange={() => handleSummarySelect(item)}
                    className="mt-1"
                  />
                  <p className="text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => handleSaveSelectedSummary(popupIndex, e)}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Save Selection
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects

