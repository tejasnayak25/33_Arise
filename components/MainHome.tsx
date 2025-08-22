import { useState } from "react";
import Results from "./Results";
import {analyse} from "@/lib/script";
import SearchBar from "@/components/SearchBar";

export default function Home() {
    let [ url, setUrl ] = useState(null);
    let [ deepSearch, setDeepSearch ] = useState(false);

    const updateInput = () => {
        let elem:any = document?.querySelector("input#url-input");setUrl(elem?.value ?? "")
    }

    return (
        <div className="w-full flex flex-col items-center justify-center flex-1 h-full p-5 text-slate-900 dark:text-slate-100">
            <div className="relative w-full md:px-32 px-0 transition-all flex flex-col items-center">
                <img
                    src="./sitescan_without_bg&tagline.png" // Replace with your actual image source
                    alt="Logo"
                    className="w-50 h-50 rounded-full object-cover"
                />
                <div className="w-full flex justify-center items-center relative mb-5">
                    <SearchBar deepSearch={deepSearch} setDeepSearch={() => {setDeepSearch(!deepSearch);setUrl(null);setUrl(url);}} placeholder="Enter URL" onChange={(e:any) => {setUrl(e.target.value)}}></SearchBar>
                </div>
            </div>
            <Results url={url} deepSearch={deepSearch}></Results>
        </div>
    );
}