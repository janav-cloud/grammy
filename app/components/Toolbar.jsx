'use client';

import React from 'react';

export default function Toolbar({ onCheck, onClear, loading }) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onClear}
        disabled={loading}
        className={`px-6 py-3 rounded-full font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors text-sm ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        Clear
      </button>
      <button
        onClick={onCheck}
        disabled={loading}
        className={`px-6 py-3 rounded-full font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors text-sm flex items-center ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-4 w-4 mr-2 text-white"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" className="opacity-25" fill="none" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
        ) : null}
        {loading ? 'Checking...' : 'Check Grammar'}
      </button>
    </div>
  );
}