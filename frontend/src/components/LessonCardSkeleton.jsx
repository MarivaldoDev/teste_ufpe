function LessonCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-slate-300/20">
      <div className="flex justify-between gap-3">
        <div className="space-y-3 w-full">
          <div className="h-7 w-1/3 rounded bg-slate-200"></div>

          <div className="h-4 w-2/3 rounded bg-slate-200"></div>

          <div className="h-4 w-1/2 rounded bg-slate-200"></div>
        </div>

        <div className="h-8 w-24 rounded-full bg-teal-100"></div>
      </div>

      <div className="mt-6 space-y-2 rounded-2xl bg-slate-100/80 p-4">
        <div className="h-4 rounded bg-slate-200"></div>

        <div className="h-4 rounded bg-slate-200"></div>

        <div className="h-4 w-4/5 rounded bg-slate-200"></div>
      </div>

      <div className="mt-6 flex gap-2">
        <div className="h-9 w-20 rounded-xl bg-slate-200"></div>

        <div className="h-9 w-20 rounded-xl bg-rose-100"></div>
      </div>
    </div>
  );
}

export default LessonCardSkeleton;