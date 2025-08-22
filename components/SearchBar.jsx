import React from 'react';

const SearchBar = ({ placeholder = "Search...", onChange }) => (
  <div className="w-full max-w-md mx-auto">
    <div className="relative">
      <input
        type="text"
        onBlur={onChange}
        onKeyDown={(e) => {if(e.key === "Enter") {e.target.blur();}}}
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white text-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        placeholder={placeholder}
      />
      <span className="absolute left-3 top-2.5 text-gray-400">
        {/* Search Icon (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </span>
    </div>
  </div>
);

export default SearchBar;