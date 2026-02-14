import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface UploadCardProps {
  show: boolean;
  onClose: () => void;
  onUpload?: (file: File) => void;
}

export const UploadCard: React.FC<UploadCardProps> = ({ show, onClose, onUpload }) => {
  if (!show) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      'file-1': { files: FileList };
    };
    const file = target['file-1'].files?.[0];
    if (file && onUpload) onUpload(file);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Add new files to SILO.</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file-1">
                  Upload file <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="file-1"
                  type="file"
                  accept=".csv, .xlsx, .xls, .docx, .pdf"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Supported: DOCX, PDF, CSV, XLSX or XLS.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-8">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Upload</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
