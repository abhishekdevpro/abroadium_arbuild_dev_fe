import { useEffect } from "react";
import { useErrorHandler } from "../components/utility/ErrorHandler";
import { setGlobalErrorHandler } from "../utils/axiosConfig";

// Hook to initialize global error handler
export const useGlobalErrorHandler = () => {
  const errorHandler = useErrorHandler();

  useEffect(() => {
    // Set the global error handler for axios interceptors
    setGlobalErrorHandler(errorHandler);
  }, [errorHandler]);

  return errorHandler;
};
