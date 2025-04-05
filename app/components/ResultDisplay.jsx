'use client';

import React from 'react';

export default function ResultDisplay({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium text-center shadow-sm">
        ❌ {result.error}
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-xl shadow-sm w-full">
      {result.isValid ? (
        <p className="text-green-600 font-medium text-sm">
          ✅ No issues found. Your text looks great!
        </p>
      ) : (
        <>
          <p className="text-orange-600 font-medium text-sm">
            ❌ Issues detected in your text.
          </p>
          {result.message && (
            <p className="text-gray-600 text-sm mt-2">Suggestion: {result.message}</p>
          )}
        </>
      )}
    </div>
  );
}