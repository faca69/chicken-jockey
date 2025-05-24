export default function CompaniesLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="relative flex items-center justify-center">
        <span className="block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
        <span className="absolute text-2xl font-bold text-primary">⏳</span>
      </div>
      <span className="mt-6 text-lg font-semibold text-primary animate-pulse">
        Loading...
      </span>
    </div>
  );
}
