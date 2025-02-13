import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";

export default function Notification() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [marketingNotifications, setMarketingNotifications] = useState(true);

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
            <div className="p-6  bg-white ">
              <h3 className="text-xl font-semibold mb-4">Notifications</h3>

              {/* Product Notifications Section */}
              <div className="mb-6">
                <h4 className="font-semibold">Product notifications</h4>
                <p className="text-gray-600 text-sm mb-4">
                  We’ll inform you about new job matches and applications that
                  need your attention so you can be among the first applicants
                  and maximize your chances of getting the dream job.
                </p>

                {/* Email Notification Toggle */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-12 h-6 rounded-full transition duration-300 ${
                      emailNotifications ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        emailNotifications ? "translate-x-6" : ""
                      }`}
                    ></span>
                  </button>
                  <label className="text-gray-700">Email notifications</label>
                </div>

                {/* SMS Notification Toggle */}
                <div className="flex items-center gap-4 mb-4">
                  <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                    className={`relative w-12 h-6 rounded-full transition duration-300 ${
                      smsNotifications ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        smsNotifications ? "translate-x-6" : ""
                      }`}
                    ></span>
                  </button>
                  <label className="text-gray-700">SMS notifications</label>
                </div>
              </div>

              {/* Marketing Notifications Section */}
              <div>
                <h4 className="font-semibold">Marketing notifications</h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setMarketingNotifications(!marketingNotifications)
                    }
                    className={`relative w-12 h-6 rounded-full transition duration-300 ${
                      marketingNotifications ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${
                        marketingNotifications ? "translate-x-6" : ""
                      }`}
                    ></span>
                  </button>
                  <label className="text-gray-700">
                    I am open to receive marketing communications.
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
