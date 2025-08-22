import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi"; // react-icons arrow
import PerformanceStats from "./PerformanceStats";
import PerformanceSuggestions from "./PerformanceSuggestions";

export default function PerformanceCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      window.addEventListener("open-collapsible", () => {
          setIsOpen(true);
      });
  }, []);

  return (
    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5">
      {/* Header */}
      <div
        className="flex md:flex-row flex-col cursor-pointer p-5 md:p-10 items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex md:flex-row flex-col">
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-dashboard"></i>
            <span>Performance</span>
          </p>
          <p className="text-xl font-bold flex items-center gap-3 m-0 md:px-10 px-0 md:py-0 py-5 border-slate-300 dark:border-slate-700">
            <i className="fi fi-sr-star text-yellow-300"></i>
            <span>{data.metrics?.ev?.overall_ratings ?? 0} / 10</span>
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
        <div className="flex md:flex-row flex-col gap-10 w-full p-5 md:p-10 border-t border-slate-300 dark:border-slate-700">
          <PerformanceStats data={data.metrics.perf}></PerformanceStats>
          <PerformanceSuggestions data={data.metrics.ev?.result}></PerformanceSuggestions>
        </div>
      )}
    </div>
  );
}
