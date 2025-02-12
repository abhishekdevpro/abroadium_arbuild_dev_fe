import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";

const Account = () => {
  return (
    <>
      <Navbar />
      <div className="p-4 md:p-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Sidebar (Takes full width on small screens) */}
          <div className="md:w-1/4 w-full">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            <div className="p-6  bg-white shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-4">Account</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Account ID</span>
                  <span className="text-gray-900">618744350</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">Email Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">limes88488@owlny.com</span>
                    <button className="text-blue-600 text-sm font-semibold">
                      Change
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Password</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">******</span>
                    <button className="text-blue-600 text-sm font-semibold">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
