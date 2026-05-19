function LessonCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-3 w-full">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>

          <div className="h-4 bg-gray-200 rounded w-2/3"></div>

          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      <div className="mt-6 flex gap-2">
        <div className="h-8 w-20 bg-gray-200 rounded-full"></div>

        <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}

export default LessonCardSkeleton;