import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";
import Link from "next/link";

export default function Subscription() {
  const [status, setStatus] = useState("Inactive");
  const [accountId,setAccountId] = useState()
 useEffect(()=>{
  setAccountId(localStorage.getItem("ID"))
 },[])

  return (
    <>
      <Navbar />
      <div className="p-4 md:p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Sidebar (Takes full width on mobile) */}
          <div className="w-full md:w-1/4">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="p-6 bg-white ">
              <h3 className="text-xl font-semibold mb-6">Subscription</h3>

              {/* Help & Support Box */}
              <div className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="w-full md:w-1/2">
                  <p className="font-semibold text-gray-800">
                    Need help or want to change your subscription?
                  </p>
                  <p className="mt-2 text-gray-700">Contact us at:</p>
                  <ul className="list-disc ml-5 text-gray-700">
                    {/* <li>📞 855-695-3235</li> */}
                    <li className="text-[15px]">
                      📧 customersupport@Abroadium.com
                    </li>
                  </ul>
                </div>

                {/* Vertical Divider (Hidden on small screens) */}
                <div className="hidden md:block border-l border-gray-300 h-24 mx-6"></div>

                <div className="w-full md:w-1/2 mt-4 md:mt-0">
                  <p className="font-semibold text-gray-800">
                    Available  days a week:
                  </p>
                  <ul className="list-disc ml-5 text-gray-700">
                    <li>Monday-Friday: 8 AM - 8 PM (IST)</li>
                    <li>Saturday: 8 AM - 5 PM (IST)</li>
                    {/* <li>Sunday: 10 AM - 6 PM (IST)</li> */}
                  </ul>
                </div>
              </div>

              {/* Account ID */}
              <div className="py-4 border-b border-gray-300">
                <p className="font-semibold text-gray-900">
                  Account ID:{" "}
                  <span className="text-gray-600 font-medium">{accountId || 618744350}</span>
                </p>
              </div>

              {/* Subscription Details */}
              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-900">
                  Subscription details
                </h4>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-3">
                  <p className="text-gray-700">
                    Status:{" "}
                    <span className="font-medium text-gray-900">{status}</span>
                  </p>
                  <Link href="/payment">
                    <button
                      className="mt-3 md:mt-0 text-blue-600 font-medium underline"
                      // onClick={() => setStatus("Active")}
                    >
                      Subscribe
                    </button>
                  </Link>
                </div>

                <p className="mt-4 text-gray-700">
                  For more information or changes to your subscription, contact
                  us at
                  <span className="text-blue-600 cursor-pointer">
                    {" "}
                    customersupport@Abroadium.com
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
