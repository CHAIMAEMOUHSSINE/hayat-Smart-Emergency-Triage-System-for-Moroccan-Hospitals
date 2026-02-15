
import React, { useState } from 'react';
import { Search, X, Loader2, BookOpen, User } from 'lucide-react';
import { medicalSearch } from '../services/geminiService';

interface Props {
  onClose: () => void;
}

const SearchPanel: React.FC<Props> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const res = await medicalSearch(query);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        <form onSubmit={handleSearch} className="flex items-center p-4 border-b border-gray-100">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input 
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients, clinical guidelines, or ask AI..."
            className="flex-1 text-lg outline-none placeholder:text-gray-300"
          />
          <button type="button" onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </form>

        <div className="p-6 min-h-[300px] max-h-[60vh] overflow-y-auto">
          {!query && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-gray-100 mx-auto mb-4" />
              <p className="text-gray-400">Type to search the medical database</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-nhs-blue animate-spin mb-2" />
              <p className="text-sm text-gray-500 font-medium tracking-tight">Querying Hayat Medical AI...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex items-center gap-2 text-xs font-bold text-nhs-blue uppercase tracking-widest">
                <span className="w-2 h-2 bg-nhs-blue rounded-full"></span>
                AI Knowledge Response
              </div>
              <div className="bg-gray-50 p-6 rounded-xl text-gray-700 leading-relaxed border border-gray-100">
                {result}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
