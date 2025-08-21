"use client";
import Image from "next/image";
import { analyse } from "@/lib/script";
import { useEffect, useState } from "react";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import MainHome from "@/components/MainHome";

export default function Home() {
  let [ sidebarVisible, sidebarSetVisible ] = useState(false);
  return (
    <div className="min-h-dvh flex flex-col w-full relative">
      <TopNav sidebarVisible={sidebarVisible} toggleSidebar={() => sidebarSetVisible(!sidebarVisible)} />
      <div className=" w-full flex-1 relative flex">
        <Sidebar sidebarVisible={sidebarVisible} />
        <div className="flex-1 bg-slate-200 dark:bg-slate-900 w-full relative z-40">
          <MainHome/>
        </div>
      </div>
    </div>
  );
}
