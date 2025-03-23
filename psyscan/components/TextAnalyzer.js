'use client';
import { useState } from 'react';

export default function TextAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze text');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error analyzing text:', err);
      setError('Failed to analyze text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Mental Health Text Analyzer</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="text-input" className="block mb-2 text-sm font-medium">
            Enter text to analyze:
          </label>
          <textarea
            id="text-input"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your thoughts here..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md">
          <h3 className="font-medium">Analysis Results:</h3>
          <p className="mt-2">
            <strong>Depression Score:</strong> {(result.depression_score * 100).toFixed(2)}%
          </p>
          <p className="mt-1">
            <strong>Assessment:</strong> {result.mood_assessment}
          </p>
        </div>
      )}
    </div>
  );
}