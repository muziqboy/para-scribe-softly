
import React from 'react';
import { File, Copy, Download } from 'lucide-react';

interface OutputDisplayProps {
  output: string;
  isLoading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, isLoading }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'paradocs-output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-soft">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading text-lg font-semibold">Result</h3>
        {output && (
          <div className="flex gap-2">
            <button 
              onClick={handleCopy} 
              className="p-2 rounded-lg hover:bg-paradocs-softgray transition-colors"
              aria-label="Copy to clipboard"
            >
              <Copy size={18} />
            </button>
            <button 
              onClick={handleDownload}
              className="p-2 rounded-lg hover:bg-paradocs-softgray transition-colors"
              aria-label="Download as text file"
            >
              <Download size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="border border-paradocs-muted bg-white rounded-xl p-4 min-h-[300px] w-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-paradocs-text"></div>
          </div>
        ) : output ? (
          <div className="whitespace-pre-wrap font-sans">{output}</div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground h-full">
            <File size={24} className="mb-2" />
            <p>Your result will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputDisplay;
