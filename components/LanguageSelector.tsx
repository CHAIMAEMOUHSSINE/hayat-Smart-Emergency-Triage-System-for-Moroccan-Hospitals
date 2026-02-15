
import React from 'react';
import { Language } from '../types';
import { Globe, ChevronDown } from 'lucide-react';

interface Props {
  current: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ current, onLanguageChange }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'dar', label: 'Darija' },
    // Fix: Updated 'ber' to 'tzm' to match the defined Language type
    { code: 'tzm', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ' },
  ];

  return (
    <div className="relative inline-block text-left group">
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-nhs-blue transition-all">
        <Globe className="w-4 h-4 text-nhs-blue" />
        {languages.find(l => l.code === current)?.label}
        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" />
      </button>
      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm ${
                current === lang.code ? 'bg-nhs-blue text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
