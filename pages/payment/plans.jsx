// import { Lock, CheckCircle } from "lucide-react";
// import Navbar from "../Navbar/Navbar";
// import Link from "next/link";

import Link from "next/link";
import Navbar from "../Navbar/Navbar";

import { CheckCircle, Lock } from "lucide-react";
import { useRouter } from "next/router";
import { PLAN_DATA } from "../../components/Data/PlanData";
// export default function PaymentPage() {
//   return (
//     <>
//       <Navbar />
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
//         <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-6 md:flex">
//           {/* Left Section: Payment Form */}
//           <div className="md:w-2/3 p-6">
//             <h2 className="text-2xl font-bold mb-4">Payment information</h2>

//             {/* Card Information Section */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Card information</h3>
//               <div className="flex items-center mt-2 space-x-2">
//                 <input
//                   type="text"
//                   placeholder="1234 5678 9123 4567"
//                   className="w-2/3 p-3 border rounded-xl text-lg"
//                 />
//                 <div className="relative w-1/3">
//                   <input
//                     type="text"
//                     placeholder="123"
//                     className="w-full p-3 border rounded-xl text-lg"
//                   />
//                   <Lock
//                     className="absolute right-3 top-3 text-gray-400"
//                     size={20}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Cardholder Name */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Cardholder name</h3>
//               <input
//                 type="text"
//                 placeholder="Jessica Claire"
//                 className="w-full p-3 border rounded-xl text-lg mt-2"
//               />
//             </div>

//             {/* Expiration Date */}
//             <div className="mb-4">
//               <h3 className="font-semibold">Expiration date</h3>
//               <div className="flex space-x-4 mt-2">
//                 <select className="w-1/2 p-3 border rounded-xl text-lg">
//                   <option>Month</option>
//                   <option>01 - January</option>
//                   <option>02 - February</option>
//                   <option>03 - March</option>
//                   <option>04 - April</option>
//                 </select>
//                 <select className="w-1/2 p-3 border rounded-xl text-lg">
//                   <option>Year</option>
//                   <option>2025</option>
//                   <option>2026</option>
//                   <option>2027</option>
//                 </select>
//               </div>
//             </div>

//             {/* Terms and Conditions */}
//             <p className="text-sm text-gray-600 mt-4">
//               By clicking <strong>&quot;Start applying&quot;</strong> below, you
//               agree to our{" "}
//               <Link href="/footerr/TermsandConditions" className="text-orange-600 underline">
//                 Terms of Use
//               </Link>{" "}
//               and{" "}
//               <Link href="/footerr/PrivacyPolicy" className="text-orange-600 underline">
//                 Privacy Policy
//               </Link>
//               . You also understand that you will be billed{" "}
//               <strong>$71.40</strong>, which will automatically renew every
//               year. <strong>You can cancel at any time.</strong>
//             </p>

//             {/* Start Applying Button */}
//             <button className="mt-6 w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-700">
//               Start applying
//             </button>

//             {/* Secure Checkout */}
//             <div className="flex items-center mt-4 text-sm text-gray-600">
//               <Lock className="text-purple-500 mr-2" size={20} />
//               <span>SECURE CHECKOUT</span>
//             </div>
//           </div>

//           {/* Right Section: Review Order */}
//           <div className="md:w-1/3 bg-gray-100 p-6 rounded-xl mt-6 md:mt-0">
//             <h3 className="font-semibold text-lg">Review your order</h3>
//             <p className="text-gray-600 mt-2">
//               <strong>Plan:</strong> Annual access
//             </p>
//             <ul className="mt-4 space-y-2">
//               <li className="flex items-center">
//                 <CheckCircle className="text-purple-500 mr-2" />
//                 AI-powered job search & apply.
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="text-purple-500 mr-2" />
//                 Personalized matches added daily.
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="text-purple-500 mr-2" />
//                 Unlimited automated applications.
//               </li>
//               <li className="flex items-center">
//                 <CheckCircle className="text-purple-500 mr-2" />
//                 Automatically renews every 12 months.
//               </li>
//             </ul>

//             {/* Total Price */}
//             <div className="mt-6 bg-orange-600 text-white p-4 rounded-xl text-center text-lg font-semibold">
//               Total due today <br />
//               <span className="text-2xl">$71.40</span>
//             </div>

//             {/* Money-back Guarantee */}
//             <p className="mt-4 text-gray-600 text-sm">
//               <strong>Money-back guarantee:</strong> Sonara offers an AI-powered
//               job application service and customized job recommendations. If
//               you’re not satisfied with the service during the first 14 days of
//               your Annual access, contact us to get a refund.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

export default function PaymentPage() {
  const router = useRouter();
  const { selectedPlan } = router.query;
  console.log(selectedPlan, "LLLL");
  const plan = PLAN_DATA[selectedPlan] || "annual";
  console.log(plan);
  //  const priceWithoutCurrency = plan.price.replace('₹', '').split('/')[0].trim();
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl w-full bg-white shadow-lg rounded-xl p-6 md:flex">
          {/* Left Section: Payment Form */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-bold mb-4">Payment information</h2>

            {/* Card Information Section */}
            <div className="mb-4">
              <h3 className="font-semibold">Card information</h3>
              <div className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  placeholder="1234 5678 9123 4567"
                  className="w-2/3 p-3 border rounded-xl text-lg"
                />
                <div className="relative w-1/3">
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full p-3 border rounded-xl text-lg"
                  />
                  <Lock
                    className="absolute right-3 top-3 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
            </div>

            {/* Cardholder Name */}
            <div className="mb-4">
              <h3 className="font-semibold">Cardholder name</h3>
              <input
                type="text"
                placeholder="Jessica Claire"
                className="w-full p-3 border rounded-xl text-lg mt-2"
              />
            </div>

            {/* Expiration Date */}
            <div className="mb-4">
              <h3 className="font-semibold">Expiration date</h3>
              <div className="flex space-x-4 mt-2">
                <select className="w-1/2 p-3 border rounded-xl text-lg">
                  <option>Month</option>
                  <option>01 - January</option>
                  <option>02 - February</option>
                  <option>03 - March</option>
                  <option>04 - April</option>
                </select>
                <select className="w-1/2 p-3 border rounded-xl text-lg">
                  <option>Year</option>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                </select>
              </div>
            </div>

            {/* Terms and Conditions */}
            <p className="text-sm text-gray-600 mt-4">
              By clicking <strong>&quot;Start applying&quot;</strong> below, you
              agree to our{" "}
              <Link
                href="/footerr/TermsandConditions"
                className="text-orange-600 underline"
              >
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link
                href="/footerr/PrivacyPolicy"
                className="text-orange-600 underline"
              >
                Privacy Policy
              </Link>
              . You also understand that you will be billed{" "}
              <strong>{plan.price}</strong>.{" "}
              <strong>You can cancel at any time.</strong>
            </p>

            {/* Start Applying Button */}
            <button className="mt-6 w-full bg-orange-600 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-700">
              Start applying
            </button>

            {/* Secure Checkout */}
            <div className="flex items-center mt-4 text-sm text-gray-600">
              <Lock className="text-purple-500 mr-2" size={20} />
              <span>SECURE CHECKOUT</span>
            </div>
          </div>

          {/* Right Section: Review Order */}
          <div className="md:w-1/3 bg-gray-100 p-6 rounded-xl mt-6 md:mt-0">
            <h3 className="font-semibold text-lg">Review your order</h3>
            <p className="text-gray-600 mt-2">
              <strong>Plan:</strong> {plan.title}
            </p>
            {/* <ul className="mt-4 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="text-purple-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul> */}
            <ul className="mt-4 space-y-2">
              {plan?.features?.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <CheckCircle className="text-purple-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Total Price */}
            <div className="mt-6 bg-orange-600 text-white p-4 rounded-xl text-center text-lg font-semibold">
              Total due today <br />
              <span className="text-2xl">{plan.price}</span>
            </div>

            {/* Money-back Guarantee */}
            {/* <p className="mt-4 text-gray-600 text-sm">
              <strong>Money-back guarantee:</strong> Sonara offers an AI-powered
              job application service and customized job recommendations. If
              you're not satisfied with the service during the first 14 days,
              contact us to get a refund.
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
