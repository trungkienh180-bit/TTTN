import React, { useState, useRef, useEffect } from "react";

const SearchableSelect = ({ options, value, onChange, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div ref={wrapperRef} className="relative flex-1 w-full">
      <div
        className="w-full border border-gray-300 p-2 rounded-sm bg-white text-[13px] cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {value || placeholder}
        </span>
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-sm shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 border-b border-gray-100 sticky top-0 bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full p-1.5 border border-gray-200 rounded text-[13px] outline-none focus:border-blue-500"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-2 text-[13px] hover:bg-blue-50 cursor-pointer text-gray-700"
                onClick={() => {
                  onChange({ target: { name, value: opt } });
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="p-3 text-[13px] text-gray-500 text-center">
              Không tìm thấy
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
