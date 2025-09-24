import React, { useState, useEffect } from "react";
import { Zap, RefreshCw } from "lucide-react";
import axios from "axios";

const AICredits = () => {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCredits = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view credits");
        return;
      }

      const response = await axios.get(
        "https://api.abroadium.com/api/jobseeker/plan-service-info",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data?.status === "success") {
        setCredits(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch credits");
      }
    } catch (err) {
      console.error("Error fetching AI credits:", err);
      setError("Failed to load credits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  const handleRefresh = () => {
    fetchCredits();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2 flex items-center space-x-3 min-w-fit">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-semibold text-gray-800">
            AI Credits
          </span>
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
        <RefreshCw className="w-3 h-3 text-gray-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2 flex items-center space-x-3 min-w-fit">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-red-500" />
          <span className="text-sm font-semibold text-gray-800">
            AI Credits
          </span>
          <span className="text-xs text-red-500">Error</span>
        </div>
        <button
          onClick={handleRefresh}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <RefreshCw className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    );
  }

  // Extract credits information from the API response
  const remainingCredits = credits?.ai_limits_left || 0;
  // If API provides total credits, use it; otherwise use a reasonable default
  const totalCredits =
    credits?.ai_credits_total || credits?.total_credits || 100;
  const usedCredits = totalCredits - remainingCredits;

  // Calculate percentage for progress bar
  const percentage =
    totalCredits > 0 ? (remainingCredits / totalCredits) * 100 : 0;

  // Determine color based on remaining credits
  const getCreditColor = () => {
    if (percentage > 50) return "text-green-600";
    if (percentage > 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = () => {
    if (percentage > 50) return "bg-green-500";
    if (percentage > 25) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-full shadow-sm border border-gray-200 px-4 py-2 flex items-center space-x-3 min-w-fit">
      {/* Credits Display */}
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-gray-800">AI Credits</span>
        <span className="text-sm font-bold text-gray-900">
          {remainingCredits}
        </span>
        {credits?.ai_credits_total || credits?.total_credits ? (
          <span className="text-xs text-gray-500">of {totalCredits}</span>
        ) : (
          <span className="text-xs text-gray-500">remaining</span>
        )}
      </div>

      {/* Progress Indicator */}
      {(credits?.ai_credits_total || credits?.total_credits) && (
        <div className="flex items-center space-x-1">
          <div className="w-8 bg-gray-200 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className={`text-xs font-medium ${getCreditColor()}`}>
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        title="Refresh credits"
      >
        <RefreshCw className="w-3 h-3 text-gray-400" />
      </button>

      {/* Warning Indicator */}
      {remainingCredits <= 10 && remainingCredits > 0 && (
        <div
          className="w-2 h-2 rounded-full bg-yellow-500"
          title="Low credits warning"
        ></div>
      )}
      {remainingCredits === 0 && (
        <div
          className="w-2 h-2 rounded-full bg-red-500"
          title="No credits remaining"
        ></div>
      )}
    </div>
  );
};

export default AICredits;
