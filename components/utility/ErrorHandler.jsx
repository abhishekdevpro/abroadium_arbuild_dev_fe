"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";

// Create context for global error handling
const ErrorHandlerContext = createContext();

// Custom hook to use the error handler
export const useErrorHandler = () => {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error(
      "useErrorHandler must be used within an ErrorHandlerProvider"
    );
  }
  return context;
};

// 403 Error Popup Component
const Error403Popup = ({ isOpen, onClose, onUpgrade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <div className="mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don`&apos;`t have permission to access this feature. Please
            upgrade your plan to continue.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onUpgrade}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Upgrade Plan
            </button>
          </div>

          {/* Pay & Download Button */}
          {/* <div className="border-t pt-4">
            <button
              onClick={() => {
                // This will be handled by the parent component
                onUpgrade();
              }}
              className="w-full px-4 py-2 bg-success text-white rounded-md hover:bg-success/90 transition-colors"
            >
              Pay & Download
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Quick payment to access this feature
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

// Error Handler Provider Component
export const ErrorHandlerProvider = ({ children }) => {
  const [show403Popup, setShow403Popup] = useState(false);
  const router = useRouter();

  const handle403Error = () => {
    setShow403Popup(true);
  };

  const close403Popup = () => {
    setShow403Popup(false);
  };

  const handleUpgrade = () => {
    setShow403Popup(false);
    router.push("/payment");
  };

  const value = {
    handle403Error,
    close403Popup,
    show403Popup,
  };

  return (
    <ErrorHandlerContext.Provider value={value}>
      {children}
      <Error403Popup
        isOpen={show403Popup}
        onClose={close403Popup}
        onUpgrade={handleUpgrade}
      />
    </ErrorHandlerContext.Provider>
  );
};

// Utility function to check if error is 403
export const is403Error = (error) => {
  return error?.response?.status === 403;
};

// Utility function to handle API errors globally
export const handleApiError = (error, errorHandler) => {
  if (is403Error(error)) {
    errorHandler.handle403Error();
    return true; // Error was handled
  }
  return false; // Error was not handled
};
