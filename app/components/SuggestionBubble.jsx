'use client';

import React from 'react';

export default function SuggestionBubble({ message }) {
  if (!message) return null;

  return (
    <div className="p-4 bg-white border border-emerald-400 rounded-xl shadow-xl text-sm text-gray-700 animate-fade-in">
      <p>
        <span className="font-semibold text-emerald-600">💡 Suggestion:</span>{' '}
        {message}
      </p>
    </div>
  );
}