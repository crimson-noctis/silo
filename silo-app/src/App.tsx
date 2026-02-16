import './App.css';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { HeaderControls } from '@/components/header/HeaderControls';
import { useSearchStore } from '@/store/useSearchStore';
import { invoke } from '@tauri-apps/api/core';

function App() {
  const { isLoading, searchResults, setLoading, setResults } = useSearchStore();
  const [tauriMessage, setTauriMessage] = useState<string | null>(null);

  // Fetch Tauri greet message on load
  useEffect(() => {
    const fetchGreet = async () => {
      try {
        const response = await invoke<string>('greet', { name: 'User' });
        setTauriMessage(response);
      } catch (err) {
        console.error('Tauri greet failed:', err);
        setTauriMessage('Failed to fetch message');
      }
    };

    fetchGreet();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      // Simulate search delay
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setResults(query ? `Results for "${query}"` : null);
    } finally {
      setLoading(false);
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
      <div className="max-w-6xl mx-auto mt-6 px-4">
        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}
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
                {searchResults ?? tauriMessage ?? 'Loading Tauri...'}
              </div>
            )}
        </div>
      </div>
    </main>
  );
}

export default App;
