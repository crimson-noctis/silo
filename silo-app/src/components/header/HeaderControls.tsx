import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Search } from 'lucide-react';
import { UploadCard } from '@/components/UploadCard';

interface HeaderControlsProps {
  onSearch: (query: string) => Promise<void>;
  onUpload: (file: File) => void;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({ onSearch, onUpload }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onSearch(searchQuery);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Sticky container */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md p-4 flex items-center justify-center gap-2 border-b border-border">
        <Button variant="outline" size="icon" onClick={() => setShowUploadCard(true)}>
          <Upload className="h-4 w-4" />
        </Button>

        <Input
          className="max-w-md flex-1"
          placeholder="Search Documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />

        <Button variant="outline" size="icon" onClick={handleSearch} disabled={isLoading}>
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Upload Card */}
      <UploadCard
        show={showUploadCard}
        onClose={() => setShowUploadCard(false)}
        onUpload={onUpload}
      />
    </>
  );
};
