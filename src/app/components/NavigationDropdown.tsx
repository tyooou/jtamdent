"use client";

import { useState, useEffect, useRef } from "react";

type DropdownProps = {
  label: string;
  options: string[];
  onSelect: (value: string) => void;
};

export default function NavigationDropdown({
  label,
  options,
  onSelect,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleOpen}
        className="bg-black text-white hover:bg-gray-800"
      >
        {label}
      </button>

      {isOpen && (
        <ul className="absolute z-10 bg-black text-white mt-2">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="hover:bg-gray-600 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
