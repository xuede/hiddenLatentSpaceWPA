
import React, { useState, useEffect, useRef } from 'react';
import type { StoryEntry } from '../types';

interface TerminalProps {
  storyLog: StoryEntry[];
  isLoading: boolean;
  error: string | null;
  onCommandSubmit: (command: string) => void;
}

const InputPrompt: React.FC<{ isLoading: boolean; onCommandSubmit: (command: string) => void; }> = ({ isLoading, onCommandSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onCommandSubmit(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-green-400 mr-2 text-2xl">{'>'}</span>
      <form onSubmit={handleSubmit} className="flex-grow">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
          className="bg-transparent border-none text-green-400 focus:outline-none w-full text-2xl"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
      {isLoading && <div className="ml-2 w-3 h-6 bg-green-400 animate-pulse"></div>}
    </div>
  );
};


export const Terminal: React.FC<TerminalProps> = ({ storyLog, isLoading, error, onCommandSubmit }) => {
  const endOfLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfLogRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [storyLog]);

  return (
    <div className="flex flex-col h-full text-2xl leading-relaxed">
      <div className="flex-grow">
        {storyLog.map((entry, index) => (
          <div key={index} className="mb-4" style={{ textShadow: '0 0 5px rgba(52, 211, 153, 0.5)' }}>
            {entry.from === 'player' ? (
              <p className="text-green-300 opacity-75">
                <span className="mr-2">{'>'}</span>{entry.text}
              </p>
            ) : (
              <p className="whitespace-pre-wrap">{entry.text}</p>
            )}
          </div>
        ))}
        {error && (
            <div className="my-4 text-red-500" style={{ textShadow: '0 0 5px rgba(239, 68, 68, 0.5)' }}>
              <p>SYSTEM WARNING: {error}</p>
            </div>
        )}
      </div>
      <div className="flex-shrink-0">
        <InputPrompt isLoading={isLoading} onCommandSubmit={onCommandSubmit} />
      </div>
      <div ref={endOfLogRef} />
    </div>
  );
};
