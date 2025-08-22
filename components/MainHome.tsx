import { useState } from "react";
import Results from "./Results";
import {analyse} from "@/lib/script";

export default function Home() {
    let [ url, setUrl ] = useState(null);

    const updateInput = () => {
        let elem:any = document?.querySelector("input#url-input");setUrl(elem?.value ?? "")
    }

    return (
        <div className="w-full flex flex-col items-center justify-center flex-1 h-full p-5 text-slate-900 dark:text-slate-100">
            <div className="relative w-full md:px-32 px-0 transition-all">
                <p className="text-2xl text-center mb-5">Site-Scan</p>
                <div className="w-full flex justify-center items-center relative mb-5">
                    <input
                        placeholder="Search..."
                        className="input rounded-full relative w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 shadow-lg focus:border-2 border-gray-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all outline-none"
                        name="search"
                        type="search"
                        id="url-input"
                        onKeyDown={(e:any) => {if(e.key === "Enter") {e.target.blur();}}}
                        onBlur={() => updateInput()}
                    />
                    <i onClick={() => updateInput()} className="fi fi-sr-search absolute right-3 text-slate-900 dark:text-slate-100"></i>
                </div>
            </div>
            <Results url={url}></Results>
        </div>
    );
}