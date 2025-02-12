import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import Navbar from "../Navbar/Navbar";

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("annual");

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-5xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Cast a wider net – 10x your job applications
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scours millions of jobs to continuously find
            and apply to relevant job openings until you’re hired.
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
            </div>

            {/* Subscription Features */}
            <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {selectedPlan === "trial" ? (
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
                  icon={<CheckCircle className="text-green-500" />}
                  title="Automate your job search"
                  description="We continuously scan millions of openings to find your top matches."
                />
                <Feature
                  icon={<RefreshCw className="text-green-500" />}
                  title="10x your job applications"
                  description="Submit 10x as many applications with less effort than one manual application."
                />
                <Feature
                  icon={<Bell className="text-green-500" />}
                  title="Wake up to your best matches"
                  description="Start each day with a list of roles matched to your skills and preferences."
                />
                <Feature
                  icon={<Clock className="text-green-500" />}
                  title="Save valuable hours every week"
                  description="Reclaim your time by letting our AI handle the grunt work of job searching."
                />
                <Feature
                  icon={<DollarSign className="text-green-500" />}
                  title="Money-back guarantee"
                  description="If you are unhappy for any reason during the trial, just let us know - we’ll refund your money."
                />
                <Feature
                  icon={<CheckCircle className="text-green-500" />}
                  title="24/7 customer support"
                  description="Get assistance anytime with our award-winning customer care service."
                />
              </div>
              <div className=" mt-6">
                <Link href="/payment/plans">
                  <button className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700">
                    Next
                  </button>
                </Link>
                <p className="text-gray-600 text-center mt-4">
                  <strong>Got questions?</strong> Contact our 24/7 customer
                  support.
                </p>
                <p className="text-gray-600 text-center">
                  You may cancel by email, online, or by calling us toll-free at
                  855-695-3235.
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
      className={`p-4 border rounded-lg w-full md:w-48 text-center ${
        selected ? "border-blue-500 bg-blue-100" : "bg-white"
      }`}
      onClick={onClick}
    >
      <input type="checkbox" checked={selected} readOnly />
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl font-bold">{price}</p>
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
