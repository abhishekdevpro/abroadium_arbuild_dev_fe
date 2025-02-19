import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("annual");

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-6xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Expand your reach and multiply your job opportunities tenfold!
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scans millions of job listings to deliver
            the most relevant openings, while our ATS-optimized resumes, crafted
            by industry experts, help you secure your dream job faster.
          </p>
        </div>

        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Kudos! You’re one step closer to success 🎉
        </h2>
        <div className="flex justify-between gap-2">
          <div>
            {/* Plan Selection */}
            <div className="flex flex-col md:flex-row justify-center mt-6 gap-4">
              <PlanCard
                title="Trial access"
                price="₹ 0"
                selected={selectedPlan === "trial"}
                onClick={() => setSelectedPlan("trial")}
              />
              <PlanCard
                title="Starting"
                price="₹ 1499 /Resume"
                selected={selectedPlan === "annual"}
                onClick={() => setSelectedPlan("annual")}
              />
              <PlanCard
                title="Starting"
                price="₹2499 /Resume"
                selected={selectedPlan === "pro"}
                onClick={() => setSelectedPlan("pro")}
              />
            </div>

            {/* Subscription Features */}
            <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {/* {selectedPlan === "trial" ? (
                  <>
                    <li>Use our AI Enabled suggestions.</li>
                    <li>Create optimized resumes.</li>
                    <li>Unlimited resume edits.</li>
                    <li>Live Resume scores.</li>
                    <li>Change save resume as pdf.</li>
                    <li>Download fully formatted Resume.</li>
                  </>
                ) : (
                  <>
                    <li>Create optimized resumes.</li>
                    <li>Receive resume in pdf and docs.</li>
                    <li>Cover letter included.</li>
                    <li>3 revisions included.</li>
                    <li>Download fully formatted Resume.</li>
                    <li>Final Delivery 1 week.</li>
                  </>
                )} */}
                {selectedPlan === "trial" ? (
                  <>
                    <li>Use our AI Enabled suggestions.</li>
                    <li>Create optimized resumes.</li>
                    <li>Unlimited resume edits.</li>
                    <li>Live Resume scores.</li>
                    <li>Change & save resume as PDF.</li>
                    <li>Download fully formatted Resume.</li>
                  </>
                ) : selectedPlan === "annual" ? (
                  <>
                    <li>Create optimized resumes.</li>
                    <li>Receive resume in PDF and DOCX.</li>
                    <li>Cover letter included.</li>
                    <li>3 revisions included.</li>
                    <li>Download fully formatted Resume.</li>
                    <li>Final delivery within 1 week.</li>
                  </>
                ) : (
                  // Pro Plan
                  <>
                    <li>Create optimized resumes.</li>
                    <li>Receive resume in PDF and DOCX.</li>
                    <li>Cover letter included.</li>
                    <li>3 revisions included.</li>
                    <li>Download fully formatted Resume.</li>
                    <li>Final delivery within 1 week.</li>
                    <li>One-on-one discussion with the Career Advisor.</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {/* Features & Payment Section */}
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            {/* Features List */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
              <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
                All subscription features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Feature
                  icon={<CheckCircle className="text-purple-900" />}
                  title="AI-Powered Job Matching"
                  description="Get real-time job recommendations tailored to your skills and experience."
                />
                <Feature
                  icon={<RefreshCw className="text-purple-900" />}
                  title="ATS-Optimized Resumes"
                  description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS). "
                />
                <Feature
                  icon={<Bell className="text-purple-900" />}
                  title="Instant Job Alerts "
                  description="Stay ahead with real-time notifications about new job openings that match your profile."
                />
                <Feature
                  icon={<Clock className="text-purple-900" />}
                  title="Expert Resume Assistance"
                  description="Get personalized resume reviews and improvements from industry professionals."
                />
                <Feature
                  icon={<DollarSign className="text-purple-900" />}
                  title="Career Community & Networking"
                  description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
                />
                <Feature
                  icon={<CheckCircle className="text-purple-900" />}
                  title="One-Click Applications"
                  description="Apply faster and more efficiently with seamless, single-click job applications."
                />
              </div>
              <div className=" mt-6">
                <Link href={`/payment/plans/?selectedPlan=${selectedPlan}`}>
                  <button className="w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-700">
                    Next
                  </button>
                </Link>
                <p className="text-gray-600 text-center mt-4">
                  <strong>Got questions?</strong> Contact our customer support.
                </p>
                <p className="text-gray-600 text-center">
                  You may cancel via email at{" "}
                  <a
                    href="mailto:customersupport@Abroadium.com"
                    className="text-blue-500 underline"
                  >
                    customersupport@Abroadium.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Payment Section */}
          </div>
        </div>
      </div>
    </>
  );
}

// Plan Card Component
function PlanCard({ title, price, selected, onClick }) {
  return (
    <button
      className={`p-4 border rounded-lg w-full md:w-32 text-center ${
        selected ? "border-orange-500 bg-orange-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      <input type="checkbox" checked={selected} readOnly />
      <p className=" font-semibold">{title}</p>
      <p className="text-md font-bold">{price}</p>
    </button>
  );
}

// Feature Component
function Feature({ icon, title, description }) {
  return (
    <div className="flex space-x-3 items-start">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
