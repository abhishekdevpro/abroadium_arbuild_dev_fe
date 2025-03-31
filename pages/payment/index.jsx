// import { useState } from "react";
// import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";
// import Link from "next/link";
// import Navbar from "../Navbar/Navbar";

// export default function Payment() {
//   const [selectedPlan, setSelectedPlan] = useState("annual");

//   return (
//     <>
//       <Navbar />
//       <div className="p-6 max-w-6xl w-full mx-auto font-sans">
//         {/* Intro Section */}
//         <div className="bg-orange-100 p-4 rounded-lg text-center">
//           <h2 className="text-lg md:text-xl font-semibold">
//             ✨ Expand your reach and multiply your job opportunities tenfold!
//           </h2>
//           <p className="text-gray-600 text-sm md:text-base">
//             Our AI-powered platform scans millions of job listings to deliver
//             the most relevant openings, while our ATS-optimized resumes, crafted
//             by industry experts, help you secure your dream job faster.
//           </p>
//         </div>

//         <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
//           Kudos! You’re one step closer to success 🎉
//         </h2>
//         <div className="flex justify-between gap-2">
//           <div>
//             {/* Plan Selection */}
//             <div className="flex flex-col md:flex-row justify-center mt-6 gap-4">
//               <PlanCard
//                 title="Trial access"
//                 price="₹ 0"
//                 selected={selectedPlan === "trial"}
//                 onClick={() => setSelectedPlan("trial")}
//               />
//               <PlanCard
//                 title="Starting"
//                 price="₹ 1499 /Resume"
//                 selected={selectedPlan === "annual"}
//                 onClick={() => setSelectedPlan("annual")}
//               />
//               <PlanCard
//                 title="Starting"
//                 price="₹2499 /Resume"
//                 selected={selectedPlan === "pro"}
//                 onClick={() => setSelectedPlan("pro")}
//               />
//             </div>

//             {/* Subscription Features */}
//             <div className="border p-6 mt-6 rounded-lg bg-gray-100">
//               <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
//                 {/* {selectedPlan === "trial" ? (
//                   <>
//                     <li>Use our AI Enabled suggestions.</li>
//                     <li>Create optimized resumes.</li>
//                     <li>Unlimited resume edits.</li>
//                     <li>Live Resume scores.</li>
//                     <li>Change save resume as pdf.</li>
//                     <li>Download fully formatted Resume.</li>
//                   </>
//                 ) : (
//                   <>
//                     <li>Create optimized resumes.</li>
//                     <li>Receive resume in pdf and docs.</li>
//                     <li>Cover letter included.</li>
//                     <li>3 revisions included.</li>
//                     <li>Download fully formatted Resume.</li>
//                     <li>Final Delivery 1 week.</li>
//                   </>
//                 )} */}
//                 {selectedPlan === "trial" ? (
//                   <>
//                     <li>Use our AI Enabled suggestions.</li>
//                     <li>Create optimized resumes.</li>
//                     <li>Unlimited resume edits.</li>
//                     <li>Live Resume scores.</li>
//                     <li>Change & save resume as PDF.</li>
//                     <li>Download fully formatted Resume.</li>
//                   </>
//                 ) : selectedPlan === "annual" ? (
//                   <>
//                     <li>Create optimized resumes.</li>
//                     <li>Receive resume in PDF and DOCX.</li>
//                     <li>Cover letter included.</li>
//                     <li>3 revisions included.</li>
//                     <li>Download fully formatted Resume.</li>
//                     <li>Final delivery within 1 week.</li>
//                   </>
//                 ) : (
//                   // Pro Plan
//                   <>
//                     <li>Create optimized resumes.</li>
//                     <li>Receive resume in PDF and DOCX.</li>
//                     <li>Cover letter included.</li>
//                     <li>3 revisions included.</li>
//                     <li>Download fully formatted Resume.</li>
//                     <li>Final delivery within 1 week.</li>
//                     <li>One-on-one discussion with the Career Advisor.</li>
//                   </>
//                 )}
//               </ul>
//             </div>
//           </div>
//           {/* Features & Payment Section */}
//           <div className="flex flex-col md:flex-row gap-6 mt-8">
//             {/* Features List */}
//             <div className="bg-white p-6 rounded-lg shadow-lg flex-1">
//               <h3 className="text-lg font-semibold mb-4 text-center md:text-left">
//                 All subscription features
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Feature
//                   icon={<CheckCircle className="text-purple-900" />}
//                   title="AI-Powered Job Matching"
//                   description="Get real-time job recommendations tailored to your skills and experience."
//                 />
//                 <Feature
//                   icon={<RefreshCw className="text-purple-900" />}
//                   title="ATS-Optimized Resumes"
//                   description="Professionally crafted resumes designed by experts to pass Applicant Tracking Systems (ATS). "
//                 />
//                 <Feature
//                   icon={<Bell className="text-purple-900" />}
//                   title="Instant Job Alerts "
//                   description="Stay ahead with real-time notifications about new job openings that match your profile."
//                 />
//                 <Feature
//                   icon={<Clock className="text-purple-900" />}
//                   title="Expert Resume Assistance"
//                   description="Get personalized resume reviews and improvements from industry professionals."
//                 />
//                 <Feature
//                   icon={<DollarSign className="text-purple-900" />}
//                   title="Career Community & Networking"
//                   description="Connect with industry peers, mentors, and recruiters to enhance your career opportunities."
//                 />
//                 <Feature
//                   icon={<CheckCircle className="text-purple-900" />}
//                   title="One-Click Applications"
//                   description="Apply faster and more efficiently with seamless, single-click job applications."
//                 />
//               </div>
//               <div className=" mt-6">
//                 <Link href={`/payment/plans/?selectedPlan=${selectedPlan}`}>
//                   <button className="w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-700">
//                     Next
//                   </button>
//                 </Link>
//                 <p className="text-gray-600 text-center mt-4">
//                   <strong>Got questions?</strong> Contact our customer support.
//                 </p>
//                 <p className="text-gray-600 text-center">
//                   You may cancel via email at{" "}
//                   <a
//                     href="mailto:customersupport@Abroadium.com"
//                     className="text-blue-500 underline"
//                   >
//                     customersupport@Abroadium.com
//                   </a>
//                   .
//                 </p>
//               </div>
//             </div>

//             {/* Payment Section */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // Plan Card Component
// function PlanCard({ title, price, selected, onClick }) {
//   return (
//     <button
//       className={`p-4 border rounded-lg w-full md:w-32 text-center ${
//         selected ? "border-orange-500 bg-orange-100" : "bg-white"
//       }`}
//       onClick={onClick}
//     >
//       <input type="checkbox" checked={selected} readOnly />
//       <p className=" font-semibold">{title}</p>
//       <p className="text-md font-bold">{price}</p>
//     </button>
//   );
// }

// // Feature Component
// function Feature({ icon, title, description }) {
//   return (
//     <div className="flex space-x-3 items-start">
//       <div className="mt-1">{icon}</div>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-gray-600 text-sm">{description}</p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { CheckCircle, DollarSign, Bell, Clock, RefreshCw } from "lucide-react";

import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import { pricingData } from "../../components/Data/PlanData";
// Pricing data from your JSON


export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");

  const router = useRouter();

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
  };

  const goToNextPage = () => {
    // Pass the selected plan to the next page as a query parameter
    router.push({
      pathname: "/payment/plans",
      query: { plan: selectedPlan },
    });
  };

  // Extract plans from the pricing data
  const plans = ["freePlan", "singlePass", "aiProMonth", "aiProYearly"];

  // Get features for a plan
  const getPlanFeatures = (planId) => {
    const plan = pricingData[planId];
    const features = [];

    for (let i = 1; i <= 11; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }

    return features;
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto font-sans">
        {/* Intro Section */}
        <div className="bg-orange-100 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Cast a wider net - 10x your job applications
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Our AI-powered platform scours millions of jobs to continuously find
            and apply to relevant job openings until you&apos;re hired.
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Kudos! You&apos;re one step closer to success 🎉
        </h2>

        {/* Pricing Section Title */}
        <div className="text-center my-8">
          <h2 className="text-2xl font-bold">{pricingData.title}</h2>
          <p className="text-gray-600 mt-2">{pricingData.subtitle}</p>
          <p className="text-gray-500 mt-1">{pricingData.intro}</p>
        </div>

        <div className="flex flex-col justify-between gap-2">
          <div>
            {/* Pricing Plans */}
            <div className="flex flex-col md:flex-row justify-center gap-4 flex-wrap">
              {plans.map((planId) => {
                const plan = pricingData[planId];
                return (
                  <div
                    key={planId}
                    className={`border rounded-lg p-4 flex flex-col w-full md:w-64 relative ${
                      selectedPlan === planId
                        ? "border-orange-500 bg-orange-50"
                        : "bg-white"
                    }`}
                    onClick={() => handlePlanSelection(planId)}
                  >
                    {/* {plan.bestValue === "true" && (
                      <div className="absolute -top-3 right-4 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
                        {t(pricingData.bestValueLabel)}
                      </div>
                    )} */}
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      <input
                        type="checkbox"
                        checked={selectedPlan === planId}
                        onChange={() => {}}
                        className="h-5 w-5 text-orange-500"
                      />
                    </div>

                    <div className="text-2xl font-bold mb-1">
                      {plan.price === "0"
                        ? pricingData.freeLabel
                        : `CAD${plan.price}${
                            plan.billingCycle !== "single"
                              ? `/${
                                  plan.billingCycle === "month" ? "mo" : "yr"
                                }`
                              : ""
                          }`}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {plan.billingCycle}
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 text-sm">
                        {getPlanFeatures(planId).map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-orange-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Plan Features */}
            {/* <div className="border p-6 mt-6 rounded-lg bg-gray-100">
              <h3 className="font-semibold mb-4">{t("Selected Plan Features")}</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm md:text-base">
                {getPlanFeatures(selectedPlan).map((feature, idx) => (
                  <li key={idx}>{t(feature)}</li>
                ))}
              </ul>
            </div> */}
          </div>

          {/* Features & Payment Section */}
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
