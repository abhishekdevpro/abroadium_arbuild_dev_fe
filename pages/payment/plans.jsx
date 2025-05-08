import Link from "next/link";
import Navbar from "../Navbar/Navbar";
import { ArrowLeft, CheckCircle, Loader, Lock } from "lucide-react";
import { useRouter } from "next/router";
import { pricingData } from "../../components/Data/PlanData";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Button from "../../components/buttonUIComponent";

export default function PaymentPage() {
  const router = useRouter();
  const { selectedPlan } = router.query;
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Convert features from the individual properties to an array
  const getFeatureArray = (plan) => {
    const features = [];
    for (let i = 1; i <= 10; i++) {
      const featureKey = `feature${i}`;
      if (plan[featureKey]) {
        features.push(plan[featureKey]);
      }
    }
    return features;
  };

  // Default to 'aiProYearly' if no plan is selected or plan doesn't exist
  const planKey =
    selectedPlan && pricingData[selectedPlan] ? selectedPlan : "aiProYearly";
  const plan = pricingData[planKey];

  // Format price with currency
  const formattedPrice = `CAD ${plan.price}${
    plan.billingCycle === "month"
      ? "/mo"
      : plan.billingCycle === "year"
      ? "/yr"
      : ""
  }`;

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handleCancelPopup = () => {
    setShowPopup(false);
  };

  const handleCheckout = async () => {
    setShowPopup(false);
    setLoading(true);
    const token = localStorage.getItem("token");
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
          toast.success("Payment successful! Redirecting...");
          window.location.href = response.data.payment_url;
        } else {
          console.error("No URL found in response:", response.data);
          toast.error("Unexpected response from the server. No URL returned.");
        }
      } else {
        throw new Error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      toast.error(error.response?.data?.message || "Error processing payment.");
    } finally {
      setLoading(false);
    }
  };

  // Get features as array
  const features = getFeatureArray(plan);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-100 p-6">
        <Button
          onClick={() => router.back()}
          className="flex items-start text-gray-600 hover:text-orange-600 mb-6 transition duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to plans
        </Button>
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-6 md:flex">
          {/* Right Section: Review Order */}
          <div className="w-full bg-gray-100 p-6 rounded-xl mt-6 md:mt-0">
            <h3 className="font-semibold text-lg">Review your order</h3>
            <p className="text-gray-600 mt-2">
              <strong>Plan:</strong> {plan.title}
            </p>

            {plan.bestValue === "true" && (
              <div className="bg-blue-100 text-orange-600 text-xs font-medium px-2 py-1 rounded mt-1 inline-block">
                {pricingData.bestValueLabel}
              </div>
            )}

            <ul className="mt-4 space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="text-orange-600 mr-2" size={16} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Total Price */}
            <div className="mt-6 bg-orange-600 text-white p-4 rounded-xl text-center text-lg font-semibold">
              Total due today <br />
              <span className="text-2xl">{formattedPrice}</span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={handleConfirmClick}
              disabled={loading}
              className={`w-full mt-6 bg-[#002a48] hover:bg-[#234d6b] text-white py-4 px-4 rounded-lg font-medium transition duration-200 flex items-center justify-center ${
                loading ? "opacity-75" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader className="mr-2 animate-spin" size={18} />
                  Processing...
                </span>
              ) : (
                <>
                  <Lock className="mr-2" size={18} />
                  Proceed to Secure Checkout
                </>
              )}
            </Button>

            {/* Money-back Guarantee */}
            <p className="mt-4 text-gray-600 text-sm">
              <strong>Money-back guarantee:</strong> 14-day satisfaction
              guarantee. If you are not satisfied, contact us for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Confirm Payment</h3>
            <p className="text-gray-700 mb-6">
              You are about to proceed with the payment for {plan.title} plan
              for {formattedPrice}. Would you like to continue?
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Button
                onClick={handleCancelPopup}
                className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCheckout}
                className="py-2 px-4 bg-orange-600 text-white rounded-lg hover:bg-[#002a48] transition duration-200 flex items-center justify-center"
              >
                <Lock className="mr-2" size={16} />
                Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
