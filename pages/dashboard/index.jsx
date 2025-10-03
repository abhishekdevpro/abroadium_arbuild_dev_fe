import { useEffect, useState } from "react";
import CoverLetterSection from "../../components/dashboard/CoverLetterSection";
import InterviewSection from "../../components/dashboard/InterviewSection";
import ResumeStrength from "../../components/dashboard/ResumeStrength";
import Sidebar from "../../components/dashboard/Sidebar";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useRouter } from "next/router";
import MyResume from "./MyResume";
import MyJobs from "./MyJobs";
import FullScreenLoader from "../../components/ResumeLoader/Loader";
import AbroadiumCommunity from "../../components/dashboard/AbroadiumCommunity";
import { Download, Edit, Trash, Plus, User, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import Button from "../../components/buttonUIComponent";
import DashboardCards from "../../components/dashboard/DashboardCards";
import ErrorPopup from "../../components/utility/ErrorPopUp";
export default function DashboardPage() {
  const [strength, setStrength] = useState(null);
  const [resumeId, setResumeId] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [scaning, setScaning] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const planName = {
    1: "Free",
    2: "Pay & Download",
    3: "AI Pro Month",
    4: "AI Pro Yearly",
  };

  const currentPlan = user?.plan_id ? planName[user.plan_id] : "Free";

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "https://api.abroadium.com/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.status === "success") {
          setUser(response.data.data.personal_details);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const handleResumeScan = async () => {
    // Check if user has plan_id 4 (AI Pro Yearly) for resume analysis
    if (user?.plan_id !== 4) {
      setShowUpgradeModal(true);
      return;
    }

    setScaning(true);
    try {
      const res = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-create",
        {
          is_resume_analysis: true,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (res.data.code === 200 || res.data.status === "success") {
        // console.log(res.data.data ," data from scan post")
        router.push(`/dashboard/resume-scan/${res.data.data?.id}`);
      }
    } catch (error) {
      console.log(error);
      // Handle 403 error specifically
      if (error.response?.status === 403) {
        setShowUpgradeModal(true);
      }
    } finally {
      setScaning(false);
    }
  };
  // useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       axios
  //         .get("https://api.abroadium.com/api/jobseeker/resume-list", {
  //           headers: { Authorization: token },
  //         })
  //         .then((response) => {
  //           const resumes = response?.data?.data || [];
  //           if (resumes.length === 0) {
  //             toast.info("No resumes available.");
  //           }
  //           setResumes(resumes);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching resume list:", error);
  //           toast.error("Failed to fetch resumes.");

  //         });
  //     }
  //   }, []);
  // console.log(resumes.length,"Length");
  const resumeStrength = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://api.abroadium.com/api/jobseeker/resume-list/0?resume_default=true`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data?.code === 200 || response.data?.status === "success") {
        setStrength(response.data.data?.resume_strenght_details || null);
        setResumeId(response.data.data?.resume_id || null);
      } else {
        setStrength(null);
        setResumeId(null);
      }
    } catch (err) {
      setError(err.message);
      setStrength(null);
      setResumeId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if(resumes.length==0)
    resumeStrength();
    fetchUserProfile();

    // const interval = setInterval(resumeStrength, 300000);

    // // Cleanup interval on component unmount
    // return () => clearInterval(interval);
  }, []);

  // if (loading) {
  //   return <FullScreenLoader />;
  // }

  const handleCreateCoverLetter = () => {
    setTimeout(() => {
      router.push("/dashboard/cv-builder");
    }, 2000);
  };
  const handleCreateResume = () => {
    setTimeout(() => {
      router.push("/dashboard/resume-builder");
    }, 2000);
  };
  const handleMyDashboard = () => {
    setTimeout(() => {
      router.push("https://airesume.abroadium.com/dashboard");
    }, 2000);
  };
  return (
    <>
      <div className="bg-gradient-to-b from-white to-blue-100 ">
        <Navbar />
        <div className="flex flex-col gap-2 w-full md:flex-row p-4 justify-between items-center my-8 max-w-7xl mx-auto ">
          <Button
            variant="success"
            onClick={handleCreateResume}
            className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-success/90 transition-colors duration-200 font-medium shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" /> Create New Resume
          </Button>
          <Button
            variant="primary"
            onClick={() => handleResumeScan()}
            className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-primary/90  transition-colors duration-200 font-medium shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            {scaning ? "Analyzing..." : "Resume Analysis"}
          </Button>
          <Button
            variant="primary"
            onClick={handleCreateCoverLetter}
            className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-primary/90  transition-colors duration-200 font-medium shadow-sm"
          >
            <Plus className="w-5 h-5 mr-2" /> Create New Cover Letters
          </Button>
          <Button
            variant="success"
            onClick={handleMyDashboard}
            className="w-full flex justify-center items-center px-4 py-2  text-white rounded-full hover:bg-success/90  transition-colors duration-200 font-medium shadow-sm "
          >
            <User className="w-5 h-5 mr-2" />
            My Profile Dashboard
          </Button>
        </div>

        <div>
          <DashboardCards strength={strength} />
        </div>
        <div className="flex flex-col max-w-7xl mx-auto md:flex-row min-h-screen bg-white p-4">
          {/* Sidebar */}
          <Sidebar
            score={strength?.resume_strenght || 0}
            resumeId={resumeId || null}
            // resumes={resumes}
          />

          {/* Main Content */}
          <main className="flex-1 p-2 md:p-6 overflow-y-auto">
            {/* Current Plan Display */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-lg font-semibold text-gray-800">
                    Current Plan
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentPlan === "Free"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {currentPlan}
                </span>
              </div>
              {currentPlan === "Free" && (
                <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-sm text-gray-600">
                    Upgrade to unlock premium features and unlimited downloads
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => router.push("/payment")}
                    className="px-4 py-2 text-sm font-medium rounded-full hover:bg-primary/90 transition-colors duration-200 shadow-sm"
                  >
                    Upgrade Plan
                  </Button>
                </div>
              )}
            </div>

            <h1 className="text-2xl font-bold mb-6">
              Your Recommended Next Steps
            </h1>
            <ResumeStrength
              score={strength?.resume_strenght || 0}
              strength={strength || {}}
              resumeId={resumeId || null}
            />
            {/* <InterviewSection /> */}
            <AbroadiumCommunity />
            <CoverLetterSection />
          </main>
        </div>
        <MyResume />
        <MyJobs />

        {/* Upgrade Plan Modal */}
        {showUpgradeModal && (
          <ErrorPopup
            onClose={() => setShowUpgradeModal(false)}
            message="Resume Analysis is only available for Resume Analysis plan. Upgrade your plan to access this premium feature."
            title="Upgrade Required"
            isUpgrade={true}
          />
        )}
      </div>
    </>
  );
}
