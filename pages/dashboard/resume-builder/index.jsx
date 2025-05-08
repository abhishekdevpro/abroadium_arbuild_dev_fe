// "use client";

// import { useState } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import Navbar from "../../Navbar/Navbar";

// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleCreateResume = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // Replace this with your actual token
//       const token = localStorage.getItem("token");

//       const response = await axios.post(
//         "https://api.abroadium.com/api/jobseeker/resume-create",
//         {},
//         {
//           headers: {
//             Authorization: ` ${token}`,
//           },
//         }
//       );

//       // Assuming the response contains the ID
//       console.log(response);
//       const { id } = response.data.data;

//       // Navigate to the dynamic route
//       router.push(`/dashboard/resume-builder/${id}`);
//     } catch (err) {
//       console.error("Error creating resume:", err);
//       setError("Failed to create resume. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//    <>
//     <Navbar/>
//         <main className="min-h-screen bg-gray-50 flex items-center justify-center">
//       <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//         <h1 className="text-2xl font-bold mb-4">Welcome to Resume Builder</h1>
//         <p className="mb-6 text-gray-600">
//           Click the Button below to create your resume.
//         </p>

//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <Button
//           onClick={handleCreateResume}
//           className={`px-6 py-3 text-white font-semibold rounded-lg ${
//             loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Creating..." : "Create Your Resume"}
//         </Button>
//       </div>
//     </main>
//    </>
//   );
// }
"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../Navbar/Navbar";
import { SaveLoader } from "../../../components/ResumeLoader/SaveLoader";
import Button from "../../../components/buttonUIComponent";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateResume = async () => {
    // Prevent multiple clicks
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Replace this with your actual token
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.abroadium.com/api/jobseeker/resume-create",
        {},
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      // Assuming the response contains the ID
      console.log(response);
      const { id } = response.data.data;

      // Only navigate after successful API response
      router.push(`/dashboard/resume-builder/${id}`);
    } catch (err) {
      console.error("Error creating resume:", err);
      setError("Failed to create resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-100  flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Resume Builder</h1>
          <p className="mb-6 text-gray-600">
            Click the Button below to create your resume.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button
            onClick={handleCreateResume}
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <SaveLoader loadingText="Creating" />
            ) : (
              "Create Your Resume"
            )}
          </Button>
        </div>
      </main>
    </>
  );
}
