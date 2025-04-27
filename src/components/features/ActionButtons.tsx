
import React from 'react';

export type ActionType = 'rewrite' | 'summarize' | 'expand' | 'latex' | 'bulletify';

interface ActionButtonsProps {
  onActionSelect: (action: ActionType) => void;
  isProcessing: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onActionSelect, isProcessing }) => {
  const actions = [
    { id: 'rewrite', label: 'Rewrite', description: 'Rephrase your text' },
    { id: 'summarize', label: 'Summarize', description: 'Create a concise summary' },
    { id: 'expand', label: 'Expand', description: 'Add more detail and depth' },
    { id: 'latex', label: 'LaTeXify', description: 'Convert to LaTeX format' },
    { id: 'bulletify', label: 'Bulletify', description: 'Convert to bullet points' },
  ];

  return (
    <div className="backdrop-blur-md bg-black/40 border border-white/20 p-6 rounded-xl">
      <h3 className="font-heading text-lg font-semibold mb-4 text-white">Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/20
              bg-black/60 hover:bg-white/10 backdrop-blur-md transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onActionSelect(action.id as ActionType)}
            disabled={isProcessing}
          >
            <span className="font-medium text-white">{action.label}</span>
            <span className="text-xs text-gray-400 text-center mt-1">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
