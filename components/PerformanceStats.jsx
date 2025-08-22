import React from "react";

export default function PerformanceStats({ data }) {
  if (!data) return <p>No performance data</p>;

  const { timing, navigation } = data;

  // Calculate key metrics
  const dnsLookup = timing.domainLookupEnd - timing.domainLookupStart;
  const tcpConnection = timing.connectEnd - timing.connectStart;
  const ttfb = timing.responseStart - timing.requestStart; // Time to First Byte
  const response = timing.responseEnd - timing.responseStart;
  const domContentLoaded = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
  const domProcessing = timing.domComplete - timing.domLoading;
  const totalLoad = timing.loadEventEnd - timing.navigationStart;

  const metrics = [
    { label: "DNS Lookup", value: dnsLookup },
    { label: "TCP Connection", value: tcpConnection },
    { label: "Time to First Byte (TTFB)", value: ttfb },
    { label: "Response", value: response },
    { label: "DOM Content Loaded", value: domContentLoaded },
    { label: "DOM Processing", value: domProcessing },
    { label: "Total Page Load", value: totalLoad },
  ];

  return (
    <div className="w-full p-6 md:mt-10 mt-0 bg-white dark:bg-slate-900 shadow rounded-xl max-w-lg">
      <h2 className="text-xl font-bold mb-4">Performance Statistics</h2>
      <ul className="space-y-2">
        {metrics.map((m, i) => (
          <li
            key={i}
            className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-1"
          >
            <span>{m.label}</span>
            <span className="font-mono">{m.value} ms</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-slate-500">
        <p>Navigation Type: {navigation.type}</p>
        <p>Redirect Count: {navigation.redirectCount}</p>
      </div>
    </div>
  );
}