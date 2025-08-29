import { useState } from "react";
import {
  CheckCircle,
  DollarSign,
  Bell,
  Clock,
  RefreshCw,
  XCircle,
  Loader,
  Lock,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  Shield,
} from "lucide-react";

import { useRouter } from "next/router";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";
import { pricingData } from "../../components/Data/PlanData";
import Button from "../../components/buttonUIComponent";
import { toast } from "react-toastify";
import axios from "axios";
// Pricing data from your JSON

export default function Payment() {
  const [selectedPlan, setSelectedPlan] = useState("freePlan");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handlePlanSelection = async (planId) => {
    setSelectedPlan(planId);

    // If it's not a free plan, automatically proceed to payment
    if (planId !== "freePlan") {
      await handlePayment(planId);
    }
  };

  const handlePayment = async (planId) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const plan = pricingData[planId];

    try {
      const response = await axios.post(
        `https://api.abroadium.com/api/jobseeker/payment/checkout`,
        {
          plan_id: plan.planId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        if (response.data?.payment_url) {
          toast.success("Redirecting to payment...");
          window.location.href = response.data.payment_url;
        } else if (response.data?.message) {
          // Handle case where user already has subscription
          if (response.data.message.includes("subscription active")) {
            toast.info("You already have an active subscription!");
            // Optionally redirect to dashboard or stay on page
            setTimeout(() => {
              router.push("/dashboard");
            }, 2000);
          } else {
            toast.success(
              response.data.message || "Request processed successfully"
            );
          }
        } else {
          console.error("No URL or message found in response:", response.data);
          toast.error("Unexpected response from the server. No URL returned.");
        }
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error processing payment.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Extract plans from the pricing data
  const plans = ["freePlan", "singlePass", "aiProMonth"];

  // Get features for a plan
  const getPlanFeatures = (planId) => {
    const plan = pricingData[planId];
    const features = [];

    for (let i = 1; i <= 20; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }

    return features;
  };

  // Check if selected plan is free
  const isFreePlan = selectedPlan === "freePlan";

  // Format price with currency
  const formatPrice = (plan) => {
    if (plan.price === "0") return "Free";
    return `$${plan.price}${
      plan.billingCycle === "Month"
        ? "/mo"
        : plan.billingCycle === "One Time"
        ? "/one-time"
        : ""
    }`;
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl w-full mx-auto  bg-gradient-to-b from-white to-blue-100">
        {/* Intro Section */}
        <div className="bg-success/20 p-4 rounded-lg text-center">
          <h2 className="text-lg md:text-xl font-semibold">
            ✨ Maximize your impact – 10x your global applications
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Abroadium’s AI-driven resume builder crafts standout resumes and
            connects you to verified career opportunities worldwide, ensuring
            your profile lands with the right employers until you&apos;re hired
          </p>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
          Congratulations! You’re on your way to career success 🎉
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
                        ? "border-success bg-success/20"
                        : "bg-white"
                    }`}
                    onClick={() => handlePlanSelection(planId)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{plan.title}</h3>
                      <input
                        type="checkbox"
                        checked={selectedPlan === planId}
                        onChange={() => {}}
                        className="h-5 w-5 text-success/90"
                      />
                    </div>

                    <div className="text-2xl font-bold mb-1">
                      {formatPrice(plan)}
                    </div>

                    <div className="text-sm text-gray-500 mb-4">
                      {plan.billingCycle}
                    </div>

                    <div className="flex-grow">
                      <ul className="space-y-2 text-sm">
                        {getPlanFeatures(planId).map((feature, idx) => (
                          <li key={idx} className="flex items-start mb-2">
                            {feature.available ? (
                              <CheckCircle className="h-4 w-4 text-success/90 mr-2 mt-1 flex-shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                            )}
                            <span>{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
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
                  icon={<FileText className="text-primary" />}
                  title="AI Resume Builder"
                  description="Instantly create standout resumes with advanced AI Assist and automatic formatting, tailored for global opportunities."
                />
                <Feature
                  icon={<RefreshCw className="text-primary" />}
                  title="AI Skill Assessment"
                  description="Validate and showcase professional strengths with intelligent skill tests and real-time feedback. "
                />
                <Feature
                  icon={<Users className="text-primary" />}
                  title="Engaging Career Community "
                  description="Connect with peers, mentors, and recruiters, gaining support and valuable insights throughout your journey."
                />
                <Feature
                  icon={<Briefcase className="text-primary" />}
                  title="Verified Job Opportunities"
                  description="Access a curated list of trusted and verified roles from top employers across the globe."
                />
                <Feature
                  icon={<MessageSquare className="text-primary" />}
                  title="Practice Interviews"
                  description="Sharpen your skills with AI-powered mock interviews, ensuring readiness for your next career move."
                />
                <Feature
                  icon={<FileText className="text-primary" />}
                  title="Cover Letter Generator"
                  description="Craft compelling cover letters automatically, matching the tone and style needed for every application."
                />
                <Feature
                  icon={<Shield className="text-primary" />}
                  title="ATS-Compliant Documents"
                  description="Effortlessly produce resumes and cover letters designed to pass Applicant Tracking Systems and impress recruiters."
                />
              </div>
              <div className=" mt-6">
                {isFreePlan ? (
                  <div className="text-center">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <p className="text-gray-600 font-medium">
                        Free Plan Selected
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        You can start using the basic features immediately
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    {loading ? (
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="flex items-center justify-center">
                          <Loader className="mr-2 animate-spin" size={18} />
                          <span>Processing payment...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-success/10 p-4 rounded-lg">
                        <p className="text-success font-medium">
                          Plan selected - Payment will be processed
                          automatically
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-gray-600 text-center mt-4">
                  <strong>Got questions?</strong> Contact our customer support.
                </p>
                <p className="text-gray-600 text-center">
                  You may cancel via email at{" "}
                  <a
                    href="mailto:support@Abroadium.com"
                    className="text-primary underline"
                  >
                    support@Abroadium.com
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
