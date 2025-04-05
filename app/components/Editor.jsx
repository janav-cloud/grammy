'use client';

import React from 'react';

export default function Editor({ value, onChange }) {
  return (
    <div className="w-full mb-6">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-64 p-5 text-lg text-gray-800 border-none rounded-xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none shadow-sm transition-all"
      />
    </div>
  );
}