import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function SEOCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openTags, setOpenTags] = useState({}); // Track which tags are open

  const toggleTag = (index) => {
    setOpenTags((prev) => ({ ...prev, [index]: !prev[index] }));
  };

    useEffect(() => {
      window.addEventListener("open-collapsible", () => {
          setIsOpen(true);
      });
    }, []);

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5">
      {/* Card Header */}
      <div
        className="flex md:flex-row flex-col cursor-pointer p-5 md:p-10 items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex md:flex-row flex-col">
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-site-alt"></i>
            <span>SEO Optimization</span>
          </p>
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:px-10 px-0 md:py-0 py-5 border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-star text-yellow-300"></i>
            <span>{data.overall_ratings ?? 0} / 10</span>
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
          {data.tags.map((tag, idx) => (
            <div
              key={idx}
              className="border border-slate-300 dark:border-slate-700 rounded-lg"
            >
              {/* Tag Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                onClick={() => toggleTag(idx)}
              >
                <h3 className="font-semibold text-lg">{tag.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    Rating: {tag.rating ?? 0} / 10
                  </span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      openTags[idx] ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </div>
              </div>

              {/* Tag Content */}
              {openTags[idx] && (
                <div className="p-4 pt-0 flex flex-col gap-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {tag.analysis}
                  </p>

                  {tag.recommendations.length > 0 && (
                    <div>
                      <p className="font-medium text-sm mt-2">Recommendations:</p>
                      <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300">
                        {tag.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {tag.fixed_tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tag.fixed_tags.map((ft, i) => (
                        <span
                          key={i}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-medium"
                        >
                          {ft}
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
