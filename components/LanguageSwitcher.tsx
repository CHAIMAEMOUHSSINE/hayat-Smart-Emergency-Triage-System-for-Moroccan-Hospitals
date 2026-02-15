
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<Props> = ({ current, onLanguageChange }) => {
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' },
    { code: 'dar', label: 'Darija' },
    // Fix: Updated 'ber' to 'tzm' to match the defined Language type
    { code: 'tzm', label: 'ⵜⴰⵎⴰⵣⵉⵖⵜ' },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
            current === lang.code
              ? 'bg-nhs-blue text-white border-nhs-blue shadow-sm'
              : 'bg-white text-nhs-blue border-nhs-blue hover:bg-gray-50'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
