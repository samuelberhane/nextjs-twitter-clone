import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  return (
    <div className="relative">
      <AiOutlineSearch className="absolute left-2 top-2 text-2xl" />
      <input
        type="text"
        placeholder="Search Twitter"
        className="w-full bg-gray-300 py-2 pl-10 rounded-3xl border-none outline-none"
      />
    </div>
  );
};

export default SearchBar;
