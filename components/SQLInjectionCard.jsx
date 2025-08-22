import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export default function SQLInjectionCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5">
      {/* Card Header */}
      <div
        className="flex md:flex-row flex-col cursor-pointer p-5 md:p-10 items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex md:flex-row flex-col">
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-b-0 border-b border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-database"></i>
            <span>SQL Injection</span>
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
        <div className="p-5 md:p-10 border-t border-slate-300 dark:border-slate-700 flex flex-col gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Target: <span className="font-medium">{data.target}</span>
          </p>

          {data.vulnerabilities.map((vuln, idx) => (
            <div key={idx} className="border border-slate-300 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{vuln.type}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {vuln.items.length} item{vuln.items.length !== 1 ? "s" : ""}
                </span>
              </div>

              {vuln.items.length > 0 ? (
                <ul className="list-disc list-inside mt-2 text-sm text-slate-700 dark:text-slate-300">
                  {vuln.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  No specific items found.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
