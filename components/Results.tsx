import { useEffect, useState } from "react";
import { loadMeta, loadScreenshot, loadDetails, loadMetrics, loadAccessibility, loadSQL, loadXSS } from "@/lib/script";
import PerformanceCard from "@/components/PerformanceCard";
import SEOCard from "@/components/SEOCard";
import AccessibilityCard from "@/components/AccessibilityCard";
import SecurityCard from "@/components/SecurityCard";
import DonutChart from "@/components/Donutchart";
import RadarChart from "@/components/RadarChart";
import SQLInjectionCard from "@/components/SQLInjectionCard";
import XSSCard from "@/components/XSSCard";

export default function Results({ url, deepSearch } : { url: any, deepSearch: any }) {
    let [ data, setData ] = useState<any>(null);
    
    let [ loading, setLoading ] = useState(false);
    useEffect(() => {
        if(url) {
            setData(null);
            setLoading(true);
            loadMeta(url).then(async (d:any) => {
                let ss = await loadScreenshot(url);
                d.screenshot = ss;
                let details = await loadDetails(url);
                d.details = details;
                let metrics = await loadMetrics(url);
                d.metrics = metrics;
                let access = await loadAccessibility(url);
                d.access = access;
                console.log(deepSearch)
                if(deepSearch) {
                    let sql = await loadSQL(url);
                    d.sql = sql;
                    let xss = await loadXSS(url);
                    d.xss = xss;
                }


                console.log(d)
                setData(d);
                setLoading(false);
            });
        }
    }, [ url, deepSearch ]);
    return (
        <div id="results" className={`w-full transition-all ${loading || data ? "flex-1" : ""}`}>
            { data ? (
                <div className="w-full flex-1 transition-all md:px-32 px-0">
                    <p className="text-xl text-center mb-10 mt-20 font-bold">Analysis Report</p>
                    <div className="flex md:flex-row flex-col rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden w-full mb-5">
                        <img
                            src={data.screenshot}
                            alt="Screenshot"
                            className=" md:w-1/2 w-full object-cover md:border-r border-b md:border-b-0 border-slate-300 dark:border-slate-700"
                        />
                        <div className="flex flex-col p-10 justify-center">
                            <p className="text-2xl font-bold mb-5">{data.details.title}</p>
                            <p className="mb-10 texb-xy breyk-all">{data.details.url}</p>
                            <a
                                href={data.details.url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary rounded-full"
                            >
                                Visit
                            </a>
                        </div>
                    </div>
                    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5 md:p-10 p-5 md:max-h-[500px] max-h-none flex flex-col items-center">
                        {/* <DonutChart data={chartData}></DonutChart> */}
                        <RadarChart metrics={{ performance: data.metrics?.ev?.overall_ratings, security: data.details?.securityHeaders?.overall_ratings, seo: data.ev?.overall_ratings }}></RadarChart>
                    </div>
                    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5 md:p-10 p-5 flex md:flex-row flex-col">
                        <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700"><i className="fi fi-sr-ip-address"></i><span>{data.details.ip}</span></p>
                        <p className="text-xl font-bold flex items-center gap-3 m-0 md:px-10 px-0 md:py-0 py-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700"><span className={`${data.details.blackListed ? "bg-red-500" : "bg-green-500"} w-6 h-6 rounded-full`}></span><span>{data.details.blackListed ? "Site is Blacklisted" : "Site is not Blacklisted"}</span></p>
                        { data.details.threats ? (<p className={`text-xl font-bold flex items-center gap-3 m-0 md:px-10 px-0 md:py-0 py-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700 relative ${data.details.threats.length > 0 ? "text-red-500" : "text-slate-700 dark:text-slate-500"}`}><span className={`${data.details.threats.length > 0 ? "bg-red-500" : "bg-green-500"} w-6 h-6 rounded-full`}></span><span>{data.details.threats?.length > 0 ? `${data.details.threats.length} Threats found! <i class=" absolute right-0 fi fi-sr-arrow-up-right-from-square"></i>` : "No Threats found!"}</span></p>) : "" }
                    </div>
                    <div className="rounded-xl border border-slate-300 dark:border-slate-700 mb-5 md:p-10 p-5 flex flex-col">
                        <div className="flex md:flex-row flex-col">
                            <p className="text-xl font-bold flex items-center gap-3 m-0 md:pr-10 pr-0 md:pb-0 pb-5 md:border-r border-r-0 md:border-b-0 border-b border-slate-300 dark:border-slate-700"><i className="fi fi-sr-shield-check"></i><span>Firewall: <span className={data.details.firewall === "None" ? "text-red-500" : ""}>{data.details.firewall}</span></span></p>
                            <p className="text-xl font-bold flex items-center gap-3 m-0 md:px-10 px-0 md:py-0 py-5 border-slate-300 dark:border-slate-700">
                                <i className="fi fi-sr-star text-yellow-300"></i>
                                <span>{data.details?.securityHeaders?.overall_ratings ?? 0} / 10</span>
                            </p>
                        </div>
                        <SecurityCard data={data.details}></SecurityCard>
                    </div>
                    <PerformanceCard data={data}></PerformanceCard>
                    <SEOCard data={data.ev}></SEOCard>
                    <AccessibilityCard issues={data.access.results}></AccessibilityCard>
                    {deepSearch ? [<SQLInjectionCard data={data.sql.data}></SQLInjectionCard>,
                        <XSSCard data={data.xss.data}></XSSCard>] : ""}
                    <div className="p-10 flex w-full justify-center items-center">
                        <button onClick={() => {window.dispatchEvent(new CustomEvent("open-collapsible")); setTimeout(() => {
                            window.print();
                            window.dispatchEvent(new CustomEvent("close-collapsible"));
                        }, 200);}} className="btn btn-success btn-lg rounded-xl">
                            <i className="fi fi-sr-file-export"></i>
                            Export Report
                        </button>
                    </div>
                </div>
            ) : (loading ? (
                <div className="w-full h-full transition-all flex justify-center items-center">
                    <i className="fi fi-sr-loading animate-spin text-3xl -mt-16 flex justify-center items-center"></i>
                </div>
            ) : "") }
        </div>
    );
}