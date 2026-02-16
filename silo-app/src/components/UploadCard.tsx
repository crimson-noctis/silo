import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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

const uploadSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine(files => files.length === 1, 'Please select a file')
    .refine(
      files =>
        ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(
          files[0]?.type
        ),
      'Unsupported file type'
    ),
});

type UploadFormData = z.infer<typeof uploadSchema>;

export const UploadCard: React.FC<UploadCardProps> = ({ show, onClose, onUpload }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  });

  if (!show) return null;

  const onSubmit = (data: UploadFormData) => {
    const file = data.file[0];
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">
                  Upload file <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="file"
                  type="file"
                  accept=".csv, .xlsx, .xls, .docx, .pdf"
                  {...register('file')}
                />
                {errors.file && (
                  <p className="text-sm text-destructive">{errors.file.message}</p>
                )}
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
