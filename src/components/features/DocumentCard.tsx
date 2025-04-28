
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';

interface DocumentCardProps {
  id: string;
  title: string;
}

const DocumentCard = ({ id, title }: DocumentCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/document/${id}`)}
      className="w-full text-left transition-all duration-200 hover:translate-y-[-2px]"
    >
      <div className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 
                    hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:bg-white/10 transition-all">
        <div className="flex items-start gap-4">
          <FileText className="w-6 h-6 text-white/60" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-lg text-white mb-2 truncate">{title}</h3>
            <p className="text-sm text-white/60">Last edited: 2 days ago</p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default DocumentCard;
