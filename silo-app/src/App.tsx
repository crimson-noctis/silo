import './App.css';
import { Skeleton } from '@/components/ui/skeleton';
import { HeaderControls } from '@/components/HeaderControls';
import { useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<string | null>(null);

  // This will be passed to HeaderControls
  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      // Simulate search delay
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setSearchResults(query ? `Results for "${query}"` : null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (file: File) => {
    console.log('Uploaded file:', file.name);
    // TODO: Call Tauri API to save file
  };

  return (
    <main className="p-8 relative min-h-screen">
      <h1 className="font-bold text-3xl text-center p-5">SILO</h1>

      {/* Header controls component */}
      <HeaderControls onSearch={handleSearch} onUpload={handleUpload} />

      {/* Results / Skeleton Grid */}

      
      {/* Results / Skeleton Grid */}
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          }}
        >
          {isLoading
            ? Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 p-4 border rounded-xl">
                  <Skeleton className="h-[125px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                {searchResults ?? 'Ready to Search.'}
              </div>
            )}
        </div>
      </div>
    </main>
  );
}

export default App;
