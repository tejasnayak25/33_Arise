import { useState } from "react";
import Results from "./Results";

export default function Home() {
    let [ url, setUrl ] = useState(null);

    return (
        <div className="w-full flex flex-col items-center justify-center flex-1 h-full p-5 ">
            <div className="relative w-full md:px-20 px-0 ">
                <div className="w-full flex justify-center items-center relative">
                    <input
                        placeholder="Search..."
                        className="input rounded-full relative w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 shadow-lg focus:border-2 border-gray-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                        name="search"
                        type="search"
                        onChange={(e: any) => setUrl(e.target.value)}
                    />
                    <i className="fi fi-sr-search absolute right-3 text-slate-900 dark:text-slate-100"></i>
                </div>
            </div>
            <div className="w-full">
                <Results url={url}></Results>
            </div>
        </div>
    );
}