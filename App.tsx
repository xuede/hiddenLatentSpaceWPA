
import React, { useState, useEffect, useCallback } from 'react';
import { Terminal } from './components/Terminal';
import { Scanlines } from './components/Scanlines';
import { SubscriptionModal } from './components/SubscriptionModal';
import { initializeGame, sendPlayerAction } from './services/geminiService';
import type { StoryEntry } from './types';

function App() {
  const [storyLog, setStoryLog] = useState<StoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const startGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setStoryLog([]);
    try {
      const initialNarrative = await initializeGame();
      setStoryLog([{ text: initialNarrative, from: 'narrator' }]);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to start the game. The machine spirit is displeased. (${errorMessage})`);
      setStoryLog([{ text: 'SYSTEM ERROR: Could not connect to narrative engine. Please check your credentials and refresh.', from: 'narrator' }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isSubscribed) {
      startGame();
    }
  }, [isSubscribed, startGame]);

  const handleCommand = async (command: string) => {
    if (!command || isLoading) return;

    const newPlayerEntry: StoryEntry = { text: command, from: 'player' };
    setStoryLog(prevLog => [...prevLog, newPlayerEntry]);
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await sendPlayerAction(command);
      const newNarratorEntry: StoryEntry = { text: responseText, from: 'narrator' };
      setStoryLog(prevLog => [...prevLog, newNarratorEntry]);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Command failed. The world flickers and distorts. (${errorMessage})`);
      const errorEntry: StoryEntry = { text: 'A fissure in reality appears. Your action is lost in the static.', from: 'narrator' };
      setStoryLog(prevLog => [...prevLog, errorEntry]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSubscribe = () => {
    setIsSubscribed(true);
  };

  return (
    <main className="relative w-screen h-screen bg-black text-green-400 font-mono overflow-hidden">
      <Scanlines />
      {isSubscribed ? (
        <div className="absolute inset-0 p-4 overflow-y-auto">
          <Terminal 
            storyLog={storyLog} 
            isLoading={isLoading} 
            error={error} 
            onCommandSubmit={handleCommand} 
          />
        </div>
      ) : (
        <SubscriptionModal onSubscribe={handleSubscribe} />
      )}
    </main>
  );
}

export default App;