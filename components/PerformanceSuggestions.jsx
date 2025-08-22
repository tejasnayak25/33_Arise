import React from "react";

export default function AIAnalysis({ data }) {
  if (!data) return <p>No AI analysis available</p>;

  return (
    <div className="p-6 w-full md:mt-10 mt-0 bg-white dark:bg-slate-900 shadow rounded-xl max-w-xl">
      <h2 className="text-xl font-bold mb-4">AI Analysis</h2>

      {/* Analysis */}
      <p className="mb-6 text-slate-700 dark:text-slate-300 max-h-32 overflow-y-auto">
        {data.analysis}
      </p>

      {/* Recommendations */}
      {data.recommendations && data.recommendations.length > 0 && (
        <div className="">
          <h3 className="font-semibold text-xl mb-4">Recommendations:</h3>
          <ul className="list-disc max-h-50 overflow-y-auto list-inside space-y-1 text-green-700 dark:text-green-400">
            {data.recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
