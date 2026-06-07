"use client";

import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

interface FilterMenuProps {
  sortBy: "name-asc" | "name-desc" | "price-asc" | "price-desc";
  onSortChange: (value: FilterMenuProps["sortBy"]) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export default function FilterMenu({
  sortBy,
  onSortChange,
  category,
  onCategoryChange,
  categories,
}: FilterMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  

useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { value: "name-asc", label: "Name (A → Z)" },
    { value: "name-desc", label: "Name (Z → A)" },
    { value: "price-asc", label: "Price (Low → High)" },
    { value: "price-desc", label: "Price (High → Low)" },
  ];
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (sortBy !== "name-asc") count++;
    if (category !== "all") count++;
    return count;
  };
  
  const activeFilters = getActiveFiltersCount();
  
  const handleReset = () => {
    onSortChange("name-asc");
    onCategoryChange("all");
  };
  
  return (
    <div className="relative" ref={menuRef}>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 transition-colors"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          <span>Filters & Sort</span>
          {activeFilters > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded-full">
              {activeFilters}
            </span>
          )}
        </div>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20 max-h-96 overflow-y-auto">
          
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">Sort By</h3>
            </div>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={() => onSortChange(option.value as any)}
                    className="text-purple-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          
         
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={category === "all"}
                  onChange={() => onCategoryChange("all")}
                  className="text-purple-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">All Courses</span>
              </label>
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => onCategoryChange(cat)}
                    className="text-purple-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                    {cat.replace("-", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          {activeFilters > 0 && (
            <div className="p-4">
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
              >
                <X size={16} />
                Reset all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}