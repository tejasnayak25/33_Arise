import React, { useState } from "react";
import { changeTheme } from "@/lib/theme";

const TopNav = ({ toggleSidebar, sidebarVisible }) => {
  let [theme, setTheme] = useState(localStorage.getItem("theme"));
  return (
    <header className="flex items-center relative justify-between px-6 py-4 text-slate-900 dark:text-slate-100">
      {/* Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="text-2xl focus:outline-none"
      >
        <i className={`fi ${sidebarVisible ? "fi-sr-angle-left" : "fi-br-menu-burger"}`}></i>
      </button>

      {/* Right Section: Search, Icons, Profile */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        {/* <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
          <svg
            className="w-5 h-5 text-blue-300 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="bg-gray-100 focus:outline-none w-32 text-gray-700"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
        </div> */}

        {/* Notification Icon */}
        {/* <button className="bg-gray-100 text-slate-900 text-lg flex justify-center items-center rounded-full p-3 aspect-square cursor-pointer active:scale-95 transition-all">
          <i className="fi fi-br-bell flex justify-center items-center"></i>
        </button> */}

        {/* Theme Toggle (Sun Icon) */}
        <button onClick={() => { changeTheme(theme, setTheme) }} className="bg-gray-100 text-slate-900 text-lg flex justify-center items-center rounded-full p-3 aspect-square cursor-pointer active:scale-95 transition-all">
          <i className="fi fi-sr-brightness dark:hidden flex justify-center items-center"></i>
          <i className="fi fi-sr-moon-stars dark:flex hidden justify-center items-center"></i>
        </button>

        {/* Profile (replace src as needed) */}
        <img
          src="/path-to-your-profile-img.jpg"
          alt="Profile"
          className="w-9 h-9 rounded-full object-cover bg-gray-200"
        />
      </div>
    </header>
  );
};

export default TopNav;
