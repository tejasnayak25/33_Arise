import React from "react";
import { FiSearch, FiLayers } from "react-icons/fi"; // FiLayers as deep search icon

const SearchBar = ({
  placeholder = "Search...",
  onChange,
  deepSearch = false,
  setDeepSearch,
  hideInput = false,
}) => (
  <div className="w-full max-w-md mx-auto flex items-center gap-2">
    {/* Optional Search Input */}
    {!hideInput && (
      <div className="relative flex-1">
        <input
          type="text"
          onBlur={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-white text-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          placeholder={placeholder}
        />
        <FiSearch className="absolute left-3 top-2.5 text-xl text-gray-400" />
      </div>
    )}

    {/* Deep Search Icon */}
    {setDeepSearch && (
      <button
        type="button"
        onClick={() => setDeepSearch(!deepSearch)}
        className={`p-2 w-11 h-11 aspect-square rounded-full border transition ${
          deepSearch
            ? "bg-blue-500 text-white border-blue-500"
            : "bg-white text-gray-500 border-gray-300 hover:bg-gray-100"
        }`}
      >
        <i className="fi fi-sr-audit text-xl" />
      </button>
    )}
  </div>
);

export default SearchBar;
