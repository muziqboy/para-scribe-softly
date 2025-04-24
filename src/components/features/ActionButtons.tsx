
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
    <div className="card-soft">
      <h3 className="font-heading text-lg font-semibold mb-4">Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-paradocs-muted
              bg-white hover:bg-paradocs-softgray transition-all hover:shadow-sm
              disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onActionSelect(action.id as ActionType)}
            disabled={isProcessing}
          >
            <span className="font-medium">{action.label}</span>
            <span className="text-xs text-muted-foreground text-center mt-1">{action.description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActionButtons;
