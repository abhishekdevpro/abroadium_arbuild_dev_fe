"use client";
import React, { useContext, useRef } from "react";
import { CoverLetterContext } from "../../context/CoverLetterContext";

import PersonalInfoWrapper from "./PersonalInfoWrapper";
import LetterDetailsWrapper from "./LetterDetailsWrapper";
import IntroductionBodyWrapper from "./IntroductionBodyWrapper";
import SocialInfo from "./SocialInfo";
import ImageWrapper from "./ImageWrapper";

const CoverLetter7 = () => {
  const { coverLetterData, backgroundColorss, selectedFont } =
    useContext(CoverLetterContext);

  return (
    <div className=" " style={{ fontFamily: `${selectedFont}` }}>
      <div className=" mx-auto flex ">
        {/* Left Column */}
        <div
          className="right-column w-4/12  px-4 py-8"
          style={{
            backgroundColor: backgroundColorss,
            minHeight: "1122px",
            maxHeight: "1200px",
          }}
        >
          <div className="relative h-auto">
            <div className="p-5 px-20 bg-black ml-20 absolute">
              <PersonalInfoWrapper
                personalDetails={coverLetterData?.personalDetails || {}}
                editable={true}
                className=""
                headerColor="white"
              />
            </div>
          </div>
          <div className="mt-60">
            <SocialInfo
              personalDetails={coverLetterData?.personalDetails || {}}
              headerColor={backgroundColorss ? "white" : "black"}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="left-column w-8/12 p-4 ">
          <div
            className="flex p-4 justify-end mb-12"
            // style={{
            //   borderBottom: `2px solid ${backgroundColorss}`,
            // }}
          >
            {coverLetterData?.photo && (
              <ImageWrapper
                src={coverLetterData.photo}
                className="w-32 h-32 rounded-full"
              />
            )}
          </div>

          {/* Job 1 */}
          <div
            style={{
              backgroundColor: backgroundColorss,
              color: backgroundColorss ? "white" : "black",
            }}
            className={`${
              coverLetterData?.photo
                ? "w-10/12 h-1/7 text-left text-lg pl-10 mt-52"
                : "text-center mt-60 p-1"
            }`}
          >
            COVER LETTER
          </div>
          <div className="flex flex-col gap-4">
            <div className="col-span-2 space-y-2">
              <div>
                <LetterDetailsWrapper
                  letterDetails={coverLetterData?.letterDetails || {}}
                  // headerColor={backgroundColorss ? "white" : "black"}
                  className="p-4"
                />
              </div>
              <IntroductionBodyWrapper
                // introduction={coverLetterData.introduction}
                body={coverLetterData.body}
                // closing={coverLetterData.closing}
                gratitude={coverLetterData.gratitude}
                signature={coverLetterData.signature}
                editable={true}
                headerColor={backgroundColorss ? "white" : "black"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetter7;
