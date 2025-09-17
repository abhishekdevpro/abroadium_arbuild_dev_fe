import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Copy } from "lucide-react";
import {
  getScanHistory,
  handleDuplicateScan,
  resumeAnalysis,
} from "../../components/services/scanService";
import Button from "../../components/ui/Button";
import { useModal } from "../../hooks/useModal";
import FormModal from "../../components/ui/FormModal";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const truncate = (text, max = 120) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "..." : text;
};

export default function ScanHistory() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [duplicateResumeId, setDuplicateResumeId] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const { isOpen, closeModal, openModal } = useModal();
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const list = await getScanHistory();

        const augmented = list.map((it) => {
          let parsed = null;
          try {
            parsed = it.ai_resume_parse_data
              ? JSON.parse(it.ai_resume_parse_data)
              : null;
          } catch (e) {
            parsed = null;
          }
          const score =
            it.resume_strenght ||
            it.resume_strenght_details?.resume_strenght ||
            parsed?.resume_strenght_details?.resume_strenght ||
            "";
          const position =
            parsed?.templateData?.position ||
            parsed?.job_title ||
            it.job_title ||
            "";
          const description = it.job_description || "-";
          return {
            ...it,
            _parsed: parsed,
            _score: score,
            _position: position,
            _desc: description,
          };
        });

        setItems(augmented);
        setError("");
      } catch (e) {
        console.error("Failed to load scan history", e);
        setError("Failed to load scan history");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleDuplicate = async (resume) => {
    try {
      const res = await handleDuplicateScan(resume.id);
      if (res.data.code === 200 || res.data.status === "success") {
        setDuplicateResumeId(res.data.data.id);

        setTimeout(() => {
          router.push(`/match-report/${res.data.data.id}`);
        }, 1000);
        // openModal();
        console.log(res, res.data.data.id, "handle Duplicate scan");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResumeAnalysis = async (resumeid, jobDesc) => {
    try {
      const res = await resumeAnalysis(resumeid, jobDesc);
      if (res.data.code === 200 || res.data.status === "success") {
        toast.success(res.data.message || "Resume analyzed successfully");
        router.push(`/match-report/${res.data.data.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Error while resume analysis");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Resume Analysis History
      </h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Job Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Job Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Scan Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-red-600"
                  >
                    {error}
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No records
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-yellow-400 flex items-center justify-center text-sm font-bold text-white">
                          {item._score || "-"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/match-report/${item.id}`}
                        className="text-blue-700 hover:underline"
                      >
                        {item._position || "Job Title"}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xl">
                      {truncate(item._desc || "")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Button
                        startIcon={<Copy />}
                        variant="outline"
                        size="sm"
                        onClick={() => handleDuplicate(item)}
                      >
                        Analyze with New JD
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {isOpen && (
            <FormModal
              isOpen={isOpen}
              onClose={closeModal}
              onSubmit={() =>
                handleResumeAnalysis(duplicateResumeId, jobDescription)
              }
              title="Add new Job Description"
              submitText="Resmue Analysis"
            >
              <textarea
                // value={jobDesc}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste or add job description"
                className="h-96 w-full border rounded-lg p-3 text-sm"
              />
            </FormModal>
          )}
        </div>
      </div>
    </div>
  );
}
