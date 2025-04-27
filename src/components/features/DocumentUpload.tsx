
import React, { useState } from 'react';
import { Upload, File, Trash } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onUpload }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf' || 
             file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
    
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onUpload(updatedFiles);
  };

  return (
    <div className="backdrop-blur-md bg-black/40 border border-white/20 p-6 rounded-xl">
      <h3 className="font-heading text-lg font-semibold mb-4 text-white">Document Upload</h3>
      
      <div
        className={`border-2 border-dashed rounded-xl p-6 text-center ${
          isDragging ? 'border-white bg-white/10' : 'border-white/20'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="mb-2 font-medium text-white">Drag and drop your documents here</p>
        <p className="text-sm text-gray-400 mb-4">Supported formats: PDF, DOCX</p>
        
        <label htmlFor="fileUpload" className="bg-white text-black px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer inline-block
          hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 active:translate-y-0">
          <span>Select Files</span>
          <input
            id="fileUpload"
            type="file"
            className="hidden"
            accept=".pdf,.docx"
            multiple
            onChange={handleFileSelect}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 text-white">Uploaded Files ({files.length})</h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-black/60 rounded-lg border border-white/20"
              >
                <div className="flex items-center">
                  <File size={16} className="mr-2 text-gray-400" />
                  <span className="text-sm truncate max-w-[200px] text-white">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-400 hover:bg-red-900/30 rounded-full p-1"
                  aria-label="Remove file"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
