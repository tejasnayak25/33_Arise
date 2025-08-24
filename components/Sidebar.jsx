import React, { useState } from "react";

const Sidebar = ({ sidebarVisible }) => {
  
  return (
    <aside className={`md:w-64 w-full z-[41] md:max-w-64 max-w-full ${ sidebarVisible ? "ml-0 " : "md:-ml-64 -ml-[100dvw]" } md:relative absolute md:bg-transparent dark:md:bg-transparent bg-slate-100 dark:bg-slate-950 overflow-hidden transition-all text-slate-900 dark:text-slate-100 flex-1 md:min-h-0 min-h-full flex flex-col items-center py-8`}>
      {/* Profile Circle */}
      <div className="mb-6">
    <img
          src="./sitescan_without_bg.png" // Replace with your actual image source
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover"
        />
      </div>
      {/* Menu */}
      <nav className="flex flex-col w-full space-y-2 px-4">
        <button className="flex items-center w-full py-2 px-3 rounded-lg hover:px-4 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all font-medium focus:outline-none">
          <span className="mr-3">
            {/* Home Icon */}
            <i className="fi fi-br-home"></i>
          </span>
          Dashboard
        </button>
        <button className="flex items-center w-full py-2 px-3 rounded-lg hover:px-4 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all focus:outline-none">
          <span className="mr-3">
            {/* History Icon */}
            <i className="fi fi-br-time-past"></i>
          </span>
          History
        </button>
        <button className="flex items-center w-full py-2 px-3 rounded-lg hover:px-4 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all focus:outline-none">
          <span className="mr-3">
            {/* Reports Icon */}
            <i className="fi fi-br-file-medical-alt"></i>
          </span>
          Reports
        </button>
        <button className="flex items-center w-full py-2 px-3 rounded-lg hover:px-4 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer active:scale-95 transition-all focus:outline-none">
          <span className="mr-3">
            {/* Settings Icon */}
            <i className="fi fi-br-settings"></i>
          </span>
          Settings
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
