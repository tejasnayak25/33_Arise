import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function SecurityCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openHeaders, setOpenHeaders] = useState({});

  const toggleHeader = (index) => {
    setOpenHeaders((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5 mt-8">
      {/* Card Header */}
      <div
        className="flex md:flex-row flex-col cursor-pointer p-5 md:p-10 items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex md:flex-row flex-col">
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-compliance-document"></i>
            <span>Security Evaluation</span>
          </p>
        </div>

        {/* Arrow Icon */}
        <FiChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          } text-xl mt-2 md:mt-0`}
        />
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="flex flex-col gap-4 p-5 md:p-10 border-t border-slate-300 dark:border-slate-700">
          {data.securityHeaders.headers.map((header, idx) => (
            <div
              key={idx}
              className="border border-slate-300 dark:border-slate-700 rounded-lg"
            >
              {/* Header Item */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                onClick={() => toggleHeader(idx)}
              >
                <h3 className="font-semibold text-lg">{header.name}</h3>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    openHeaders[idx] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Header Details */}
              {openHeaders[idx] && (
                <div className="p-4 pt-0 flex flex-col gap-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {header.analysis}
                  </p>
                  {header.fixed_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {header.fixed_tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
