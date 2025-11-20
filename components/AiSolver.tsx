import React, { useState } from 'react';
import { solveWithGemini } from '../services/geminiService';
import { Loader2, Send, Sparkles, Eraser } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const AiSolver: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse(null);
    
    const result = await solveWithGemini(input);
    setResponse(result);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSolve();
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-calc-bg p-4 rounded-3xl">
      <div className="mb-4 flex items-center gap-2 text-calc-text">
        <Sparkles className="w-6 h-6 text-calc-btnOp" />
        <h2 className="text-xl font-bold">AI 智慧解題 (Gemini)</h2>
      </div>

      <div className="flex-1 overflow-y-auto bg-calc-display rounded-2xl p-4 mb-4 shadow-inner text-white min-h-[200px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full text-calc-textSec">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p>正在思考中...</p>
          </div>
        ) : response ? (
           <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown>{response}</ReactMarkdown>
           </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-calc-textSec opacity-50 text-center">
            <p>輸入複雜的數學問題</p>
            <p className="text-sm mt-2">例如：「計算半徑為 5 的球體體積」</p>
          </div>
        )}
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="在此輸入問題..."
          className="w-full bg-gray-800 text-white rounded-xl p-4 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-calc-btnOp transition-all"
          rows={3}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
           {input && (
            <button
              onClick={() => setInput('')}
              className="p-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 transition-colors"
              title="清空"
            >
              <Eraser size={18} />
            </button>
          )}
          <button
            onClick={handleSolve}
            disabled={loading || !input.trim()}
            className="p-2 bg-calc-btnOp text-white rounded-full hover:bg-calc-btnOpHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
