// // import React from "react";
// import {useContext, useRef} from "react";
// // import { ResumeContext } from "../../pages/builder";
// import { ResumeContext } from "../context/ResumeContext";

// import ContactInfo from "./ContactInfo";
// import { CgWebsite } from "react-icons/cg";
// import DateRange from "../utility/DateRange";
// import Language from "./Language";
// import Skills from "./Skills";
// import Certification from "./Certification";
// import Link from "next/link";
// import {
//     FaGithub,
//     FaLinkedin,
//     FaTwitter,
//     FaFacebook,
//     FaInstagram,
//     FaYoutube, FaBold, FaItalic, FaPlus, FaMinus, FaAlignLeft, FaAlignCenter, FaAlignRight,FaLink,
//     FaUnderline,
//   } from "react-icons/fa";
//   import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
//   import dynamic from "next/dynamic";
// import ContactAndSocialMedia from "./ContactAndSocial";
// import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common";
// import WorkExperience from "./WorkExperience";
// import ProjectsSection from "./ProjectSection";
// import { SkillsWrapper } from "./SkillWrapper";
// import EducationSection from "./Education";
//   // Importing draggable components dynamically
// const DragDropContext = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext), { ssr: false });
// const Droppable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Droppable), { ssr: false });
// const Draggable = dynamic(() => import("react-beautiful-dnd").then((mod) => mod.Draggable), { ssr: false })
// const Template17 = () => {
//     const { resumeData, setResumeData,headerColor,backgroundColorss } = useContext(ResumeContext);
//     const templateRef = useRef(null);

//       const extractHtml = () => {
//           const htmlContent = templateRef.current?.outerHTML;
//           console.log(htmlContent);
//           return htmlContent;
//       };
//     const icons = [
//         { name: "github", icon: <FaGithub /> },
//         { name: "linkedin", icon: <FaLinkedin /> },
//         { name: "twitter", icon: <FaTwitter /> },
//         { name: "facebook", icon: <FaFacebook /> },
//         { name: "instagram", icon: <FaInstagram /> },
//         { name: "youtube", icon: <FaYoutube /> },
//         { name: "website", icon: <CgWebsite /> },
//       ];

//   return (
//     <div ref={templateRef} className="">

//     <section className="flex justify-between">
//     <aside className="w-4/12 bg-[#d4d4d8] p-4" style={{ backgroundColor: backgroundColorss }}>
//     <div
//           style={{ borderBottom: `2px solid ${backgroundColorss}` }}
//           className={`mb-6 ${resumeData?.profilePicture ? 'flex justify-between items-center' : 'flex justify-center items-center '} px-16 py-4`}>

//           {resumeData?.profilePicture && (
//                   <ImageWrapper
//                     src={resumeData.profilePicture}
//                     alt="Profile Picture"
//                     className="w-32 h-32 rounded-full"
//                   />
//                 )}

//               </div>
//         <div className="mb-5">
//         <ContactAndSocialMedia
//             title="Contacts"
//               contactData={{
//                 teldata: resumeData.contactInformation,
//                 emaildata: resumeData.email,
//                 addressdata: resumeData.address,
//               }}
//               socialMediaData={resumeData.socialMedia}
//               icons={icons}
//               layout="column" // or "row"
//               contactClass=""
//               socialMediaClass=""
//                textColor="text-white"
//             />
//         </div>
//         <div className="mb-5">
//         <EducationSection
//               itemClassNames={{
//                 school: "",
//                 degree: "",
//                 location: "",
//               }}
//               layout="column"
//               educationData={resumeData?.education}
//               headerColor={backgroundColorss?"white":"black"}
//             />
//         </div>
//         <div className="mb-5">
//           <SkillsWrapper
//                         skills={resumeData.skills}
//                         headerColor={backgroundColorss?"white":"black"}
//                         droppableId="skills-section-1"
//                         className="mt-4"
//                         layout="column"
//                       />

//         </div>

//         <div className="flex flex-col gap-2">
//         <Language title="Languages" languages={resumeData.languages}
//              headerColor= {backgroundColorss?"white":"black"}
//             />

//         </div>
//       </aside>
//       <div className="w-8/12 p-4">
//         <header className=" border-b-2 border-gray-200 pb-5 mb-5">
//           <TextWrapper
//                       name={resumeData.name}
//                       position={resumeData.position}
//                       className="justify-start items-start"
//                       headerColor={backgroundColorss}
//                       orientation="column" // Use "column" for stacked layout
//                     />
//           <SummaryWrapper
//                                     summary={resumeData.summary}
//                                     headerColor={"black"}
//                                     editable={true} // Set to false if editing is not required
//                                     className="mt-4"
//                                   />
//         </header>
//         <WorkExperience
//                 itemClassNames={{
//                   title:
//                     "text-lg font-bold mb-1  editable",
//                   company: "",
//                   position: "",
//                   location: "",
//                 }}
//                 resumeData={resumeData}
//                 headerColor={backgroundColorss}
//               />
//               <ProjectsSection
//                 resumeData={resumeData}
//                 headerColor={backgroundColorss}
//               />
//                 <Certification
//               title="Certifications"
//               certifications={resumeData.certifications}
//               hasBullet={true}
//               headerColor= {backgroundColorss?"black":"white"}
//             />
//       </div>

//     </section>

//   </div>
//   );
// };

// export default Template17;

// import React from "react";
import { useContext, useRef } from "react";

import { ResumeContext } from "../context/ResumeContext";

import { CgWebsite } from "react-icons/cg";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import ContactAndSocialMedia from "./ContactAndSocial";

import EducationSection from "./Education";

import { ImageWrapper, SummaryWrapper, TextWrapper } from "./Common1";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import Certification from "./Certification";
import Language from "./Language";

const Template17 = () => {
  const { resumeData, setResumeData, headerColor, backgroundColorss } =
    useContext(ResumeContext);
  const templateRef = useRef(null);

  const icons = [
    { name: "github", icon: <FaGithub /> },
    { name: "linkedin", icon: <FaLinkedin /> },
    { name: "twitter", icon: <FaTwitter /> },
    { name: "facebook", icon: <FaFacebook /> },
    { name: "instagram", icon: <FaInstagram /> },
    { name: "youtube", icon: <FaYoutube /> },
    { name: "website", icon: <CgWebsite /> },
  ];
  return (
    <div ref={templateRef} className="">
      <div
        className="header text-start mb-6 p-5"
        style={{ backgroundColor: backgroundColorss }}
      >
        <div className="flex justify-start items-center gap-4">
          {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
            />
          )}
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            orientation="column" // Use "column" for stacked layout
            nameclassName="text-white"
            positionclassName="text-white"
          />
        </div>

        {/* <h1 className="text-2xl mb-1.5" style={{ color: headerColor }}>{resumeData.name}</h1> */}
        <ContactAndSocialMedia
          contactData={{
            teldata: resumeData.contactInformation,
            emaildata: resumeData.email,
            addressdata: resumeData.address,
          }}
          socialMediaData={resumeData.socialMedia}
          icons={icons}
          layout="row" // or "row"
          contactClass=""
          socialMediaClass=""
          className="justify-start gap-4 mt-4"
          textColor="text-white "
        />
      </div>
      <SummaryWrapper
        summary={resumeData.summary}
        headerColor={"black"}
        editable={true} // Set to false if editing is not required
        className="mt-4"
      />
      <section className="skills mb-6">
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={"black"}
          droppableId="skills-section-1"
          className="mt-2 flex flex-row justify-between"
          layout="col "
          textColor="black"
        />
      </section>
      <section className="experience mb-6">
        {/* <h2 className="text-lg font-bold mb-2.5 uppercase border-b border-black pb-0.5 " style={{ color: headerColor }}>Professional Experience</h2> */}

        <div className="col-span-2 space-y-2">
          <WorkExperience
            itemClassNames={{
              title:
                "text-lg font-bold mb-1 border-b-2 border-gray-300 editable",
              company: "font-semibold",
              position: "content",
              location: "sub-content",
            }}
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
          <ProjectsSection
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
        </div>
      </section>

      <section className="education mb-6">
        {
          <div className="mb-1">
            <EducationSection
              itemClassNames={{
                school: "",
                degree: "",
                location: "",
              }}
              layout="row"
              educationData={resumeData?.education}
              headerColor={backgroundColorss}
            />
          </div>
        }
      </section>

      <section className="certification mb-6">
        <Certification
          title="Certifications"
          certifications={resumeData.certifications}
          hasBullet={true}
          headerColor={"black"}
        />
      </section>
      <section className="language mb-6">
        <Language
          title="Languages"
          languages={resumeData.languages}
          headerColor={"black"}
        />
      </section>
    </div>
  );
};

export default Template17;
