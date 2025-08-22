import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function AccessibilityCard({ issues }) {
  const [isOpen, setIsOpen] = useState(false);
  const [openIssues, setOpenIssues] = useState(() => issues.map(() => false));

  function toggleIssue(idx) {
    setOpenIssues((prev) => {
      const newOpen = [...prev];
      newOpen[idx] = !newOpen[idx];
      return newOpen;
    });
  }

  useEffect(() => {
    const handleOpenCollapsible = () => {
      setIsOpen(true);
      setOpenIssues(issues.map(() => true));
    };

    const handleCloseCollapsible = () => {
      setIsOpen(false);
      setOpenIssues(issues.map(() => false));
    };

    window.addEventListener("open-collapsible", handleOpenCollapsible);
    window.addEventListener("close-collapsible", handleCloseCollapsible);

    return () => {
      window.removeEventListener("open-collapsible", handleOpenCollapsible);
      window.removeEventListener("close-collapsible", handleCloseCollapsible);
    };
  }, [issues]);

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5">
      {/* Card Header */}
      <div
        className="flex md:flex-row flex-col cursor-pointer p-5 md:p-10 items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex md:flex-row flex-col">
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-b-0 border-b border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-universal-access"></i>
            <span>Accessibility Issues</span>
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
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className="border border-slate-300 dark:border-slate-700 rounded-lg"
            >
              {/* Issue Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                onClick={() => toggleIssue(idx)}
              >
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg">{issue.id}</h3>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Impact: {issue.impact}
                  </span>
                </div>
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    openIssues[idx] ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              {/* Issue Details */}
              {openIssues[idx] && (
                <div className="p-4 pt-0 flex flex-col gap-3">
                  {issue.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {issue.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {issue.description}
                  </p>
                  <a
                    href={issue.helpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Learn more
                  </a>

                  {/* Nodes */}
                  {issue.nodes.map((node, ni) => (
                    <div
                      key={ni}
                      className="border border-slate-200 dark:border-slate-700 rounded p-3 mt-2"
                    >
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Target: {node.target.join(", ")}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {node.failureSummary}
                      </p>
                      <pre className="text-xs text-slate-500 dark:text-slate-400 overflow-auto mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded">
                        {node.html}
                      </pre>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
