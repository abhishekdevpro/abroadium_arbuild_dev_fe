import { useContext, useRef } from "react";
import { ResumeContext } from "../context/ResumeContext";
import { HighlightMenu } from "react-highlight-menu";
import ContactInfo from "./ContactInfo";
import { CgWebsite } from "react-icons/cg";
import DateRange from "../utility/DateRange";
import Language from "./Language";
import Skills from "./Skills";
import Certification from "./Certification";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaBold,
  FaItalic,
  FaPlus,
  FaMinus,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaUnderline,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import dynamic from "next/dynamic";
import ContactAndSocialMedia from "./ContactAndSocial";
import { SummaryWrapper, TextWrapper, ImageWrapper } from "./Common";
import { SkillsWrapper } from "./SkillWrapper";
import WorkExperience from "./WorkExperience";
import ProjectsSection from "./ProjectSection";
import EducationSection1 from "./Education1";

const Template29 = () => {
  const templateRef = useRef(null);

  const {
    resumeData,
    setResumeData,
    headerColor,
    backgroundColorss,
    selectedFont,
  } = useContext(ResumeContext);

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
    <div className="p-5" style={{ fontFamily: `${selectedFont}` }}>
      <div class="flex gap-1 items-start ">
        {/* {resumeData?.profilePicture && (
            <ImageWrapper
              src={resumeData.profilePicture}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full"
            />
          )} */}
        <div className="mb-3">
          <TextWrapper
            name={resumeData.name}
            position={resumeData.position}
            className="justify-start items-start"
            headerColor={backgroundColorss}
            orientation="column" // Use "column" for stacked layout
          />
        </div>
      </div>

      <ContactAndSocialMedia
        contactData={{
          addressdata: resumeData.address,
          emaildata: resumeData.email,
          teldata: resumeData.contactInformation,
        }}
        socialMediaData={resumeData.socialMedia}
        icons={icons}
        layout="row" // or "row"
        contactClass=""
        socialMediaClass=""
        className="items-start justify-start"
      />
      <div class="border-solid border-2 border-black mb-5 mt-4 "></div>

      <div className="mb-5">
        <SummaryWrapper
          summary={resumeData.summary}
          headerColor={"black"}
          editable={true}
          className=""
        />
      </div>

      <div className="mb-5">
        <WorkExperience
          itemClassNames={{
            title: "text-xl font-semibold mb-2 editable",
            company: "",
            position: "",
            location: "",
          }}
          resumeData={resumeData}
          headerColor={backgroundColorss}
        />
        <div className="mb-5">
          <ProjectsSection
            resumeData={resumeData}
            headerColor={backgroundColorss}
          />
        </div>
        <SkillsWrapper
          skills={resumeData.skills}
          headerColor={"black"}
          droppableId="skills-section-1"
          className="mt-2 flex flex-row justify-between"
          layout="col "
          textColor="black"
        />
        <EducationSection1
          itemClassNames={{
            school: "",
            degree: "",
            location: "",
          }}
          layout="row"
          educationData={resumeData?.education}
          headerColor={"black"}
        />
        {/* <div>
              <h2 style={{
              color: `${
                headerColor == "black" ? `${backgroundColorss}` : headerColor
              }`,
              // borderBottom: `1px solid ${
              //   headerColor == "black" ? `${backgroundColorss}` : headerColor
              // }`,
            }}
            contentEditable
            suppressContentEditableWarning
            className="text-2xl font-semibold mb-2 mt-4">

                Additional Information
              </h2>
            </div> */}
        <div className="mb-5 mt-5">
          <Language
            title="Languages"
            languages={resumeData.languages}
            headerColor={"black"}
          />
        </div>
        <div className="mb-8">
          <Certification
            title="Certifications"
            certifications={resumeData.certifications}
            hasBullet={true}
            headerColor={"black"}
          />
        </div>
      </div>
    </div>
  );
};

const A4PageWrapper = ({ children }) => {
  const alertA4Size = () => {
    const preview = document.querySelector(".preview");
    const previewHeight = preview.offsetHeight;
    console.log(previewHeight);
    if (previewHeight > 1122) {
      alert("A4 size exceeded");
    }
  };

  return (
    <div className="w-8.5in border p-3" onLoad={alertA4Size}>
      {children}
    </div>
  );
};

export default Template29;
