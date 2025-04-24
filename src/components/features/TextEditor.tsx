
import React, { useState } from 'react';

interface TextEditorProps {
  onTextChange: (text: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onTextChange }) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    onTextChange(newText);
  };

  return (
    <div className="card-soft w-full h-full">
      <h3 className="font-heading text-lg font-semibold mb-4">Your Text</h3>
      <textarea 
        className="w-full h-[300px] bg-white rounded-xl p-4 font-sans text-base resize-none
          border border-paradocs-muted focus:outline-none focus:ring-2 focus:ring-paradocs-softblue
          placeholder:text-gray-400"
        value={text}
        onChange={handleChange}
        placeholder="Enter or paste your text here..."
      />
      <div className="text-sm text-muted-foreground mt-2 text-right">
        {text.length} characters
      </div>
    </div>
  );
};

export default TextEditor;
