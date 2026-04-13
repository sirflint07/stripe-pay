// app/courses/SearchResults.tsx
import Link from "next/link";
import Image from "next/image";
import { Doc } from "@/convex/_generated/dataModel";
import { HighlightText } from "./SearchHighlight";

interface SearchResultsProps {
  courses: Doc<"courses">[];
  searchTerm: string;
  onResultClick: () => void;
}

export default function SearchResults({ courses, searchTerm, onResultClick }: SearchResultsProps) {
  if (courses.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No courses found</p>
        <p className="text-sm text-gray-400 mt-2">Try different keywords</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {courses.map((course) => (
        <Link
          key={course._id}
          href={`/courses/${course._id}`}
          onClick={onResultClick}
          className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex gap-4">
            {course.imageUrl && (
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                <HighlightText text={course.title} highlight={searchTerm} />
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                <HighlightText text={course.description} highlight={searchTerm} />
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm font-medium text-purple-600">
                  ${course.price.toFixed(2)}
                </span>
                {course.category && (
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                    <HighlightText text={course.category} highlight={searchTerm} />
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}