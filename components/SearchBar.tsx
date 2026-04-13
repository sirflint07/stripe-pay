"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "@/components/hooks/useDebounce";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  const searchResults = useQuery(
    api.courses.searchCourses,
    debouncedSearchTerm ? { searchTerm: debouncedSearchTerm } : "skip"
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (searchResults && searchResults.courses.length > 0) {
      setShowResults(true);
    }
  }, [searchResults]);


  const handleClear = useCallback(() => {
    setSearchTerm("");
    setShowResults(false);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full md:max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search courses by title, description, or category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsSearching(true);
          }}
          className="pl-10 pr-10 py-6 text-lg rounded-xl border-2 focus:border-purple-500 placeholder:opacity-40"
        />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      
      {showResults && searchResults && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Found <span className="font-bold text-purple-600">{searchResults.total}</span> courses
            </p>
          </div>
          <SearchResults 
            courses={searchResults.courses} 
            searchTerm={debouncedSearchTerm}
            onResultClick={() => setShowResults(false)}
          />
        </div>
      )}
    </div>
  );
}