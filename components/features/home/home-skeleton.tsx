export function HomeSkeleton() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Loading...
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="border border-border rounded-xl p-4 shadow-sm animate-pulse bg-card">
            <div className="bg-muted h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
            <div className="h-6 bg-muted rounded w-1/3"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
