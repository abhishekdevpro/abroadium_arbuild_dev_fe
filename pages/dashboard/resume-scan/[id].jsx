"use client";

import { useRouter } from "next/router";
import ResumeScan from "../../../components/resume-scan";
import Navbar from "../../Navbar/Navbar";

const Page = () => {
  const router = useRouter();
  const { id } = router.query; // dynamic id from URL
  //  console.log("called",id)
  return (
    <>
      <Navbar />
      <ResumeScan scanId={id} />
    </>
  );
};

export default Page;
