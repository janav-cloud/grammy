'use client';

import React, { useState } from 'react';
import Editor from './components/Editor';
import ResultDisplay from './components/ResultDisplay';
import SuggestionBubble from './components/SuggestionBubble';
import Toolbar from './components/Toolbar';

export default function HomePage() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckGrammar = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const res = await fetch('/api/parser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sentence: inputText }),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-slate-100 rounded-xl shadow-xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between bg-emerald-600 p-4">
          <h1 className="text-2xl font-bold text-white">📝 Grammy LL1!</h1>
          <div>
            <ul className='flex flex-row gap-2'>
              <li className='w-5 h-5 rounded-4xl bg-green-400 hover:bg-green-500 transition-colors'></li>
              <li className='w-5 h-5 rounded-4xl bg-amber-400 hover:bg-amber-500 transition-colors'></li>
              <li className='w-5 h-5 rounded-4xl bg-red-400 hover:bg-red-500 transition-colors'></li>
            </ul>
          </div>
        </header>
        {/* Content */}
        <div className="flex-1 p-6 relative">
          <Editor value={inputText} onChange={setInputText} />
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='mb-5 md:mb-0'>
              {!result?.isValid && result?.message && (
                <SuggestionBubble message={result.message} />
              )}
            </div>
            <Toolbar
              onCheck={handleCheckGrammar}
              onClear={() => {
                setInputText('');
                setResult(null);
              }}
              loading={loading}
            />
          </div>
          <ResultDisplay result={result} />
        </div>
      </div>
    </main>
  );
}