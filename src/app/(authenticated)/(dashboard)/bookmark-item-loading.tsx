const BookmarkItemLoading = () => {
  return (
    <div className="flex w-full items-center gap-2 rounded-lg border-2 border-primary-foreground px-4 py-3">
      <div className="aspect-square w-10 animate-pulse rounded-md bg-slate-800"></div>
      <div className="w-full space-y-2">
        <div className="flex justify-between">
          <div className="flex w-full gap-2">
            <div className="h-4 w-[18%] shrink-0 animate-pulse rounded-sm bg-slate-800"></div>
            <div className="h-4 w-1/4 shrink-0 animate-pulse rounded-sm bg-slate-600"></div>
          </div>
          <div className="h-4 w-1/4 animate-pulse rounded-sm bg-slate-800"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-4 w-[10%] shrink-0 animate-pulse rounded-sm bg-slate-600"></div>
          <div className="h-4 w-[20%] shrink-0 animate-pulse rounded-sm bg-slate-800"></div>
          <div className="h-4 w-[15%] shrink-0 animate-pulse rounded-sm bg-slate-600"></div>
          <div className="h-4 w-1/4 shrink-0 animate-pulse rounded-sm bg-slate-800"></div>
          <div className="h-4 w-full animate-pulse rounded-sm bg-slate-600"></div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkItemLoading;
