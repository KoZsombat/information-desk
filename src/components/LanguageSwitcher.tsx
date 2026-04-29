import type { Language } from "../i18n/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}: LanguageSwitcherProps) {
  return (
    <div className="fixed bottom-0 right-0 z-50 flex items-center gap-2 p-3 sm:p-4">
      <button
        onClick={() => onLanguageChange("hu")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
          currentLanguage === "hu"
            ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        🇭🇺 Magyar
      </button>
      <button
        onClick={() => onLanguageChange("en")}
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
          currentLanguage === "en"
            ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
            : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        🇬🇧 English
      </button>
    </div>
  );
}
