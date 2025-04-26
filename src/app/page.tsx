'use client';

import { useState } from 'react';

export default function Home() {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setReviewResult(null);

    // 🔁 Call backend API (to be built next step)
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();
    setReviewResult(data.result);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full bg-white shadow-xl rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">AI Code Reviewer</h1>

        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Paste your code below:
        </label>
        <textarea
          id="code"
          rows={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function hello() { console.log('world'); }"
          className="w-full p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          disabled={isLoading || code.trim() === ''}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Analyzing...' : 'Review Code'}
        </button>

        {reviewResult && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 whitespace-pre-wrap">
            {reviewResult}
          </div>
        )}
      </div>
    </main>
  );
}
