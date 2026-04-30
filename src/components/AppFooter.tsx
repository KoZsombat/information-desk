import type { Language } from "../i18n/translations";
import type { Theme } from "./types";

type AppFooterProps = {
  theme: Theme;
  language: Language;
  setLanguage: (language: Language) => void;
  onResetCamera: () => void;
  onThemeToggle: () => void;
  t: (key: string, defaultValue?: string) => string;
};

function AppFooter({
  theme,
  language,
  setLanguage,
  onResetCamera,
  onThemeToggle,
  t,
}: AppFooterProps) {
  return (
    <div
      className={`pointer-events-none z-10 mt-0 flex flex-col items-stretch gap-3 px-6 py-4 text-sm ${theme === "light" ? "text-gray-600" : "text-gray-300"} md:flex-row md:items-center md:justify-between md:px-8 md:py-2`}
    >
      <button
        className={`pointer-events-auto cursor-pointer w-full rounded-lg px-4 py-3 text-center font-semibold backdrop-blur-sm md:w-auto md:text-left ${theme === "light" ? "border border-green-300/50 bg-green-50 text-gray-600" : "border border-gray-700 bg-gray-800 text-gray-300"}`}
        onClick={onResetCamera}
      >
        {t("buttons.resetCamera")}
      </button>
      <div className="pointer-events-auto flex items-center justify-center gap-2 md:justify-end">
        <button
          onClick={() => setLanguage("hu")}
          aria-label={t("languageSelector.hu")}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
            language === "hu"
              ? theme === "light"
                ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
                : "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
              : theme === "light"
                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          🇭🇺 {t("languageSelector.huShort")}
        </button>
        <button
          onClick={() => setLanguage("en")}
          aria-label={t("languageSelector.en")}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
            language === "en"
              ? theme === "light"
                ? "border border-green-400 bg-green-100 text-green-800 shadow-md"
                : "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
              : theme === "light"
                ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                : "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          🇬🇧 {t("languageSelector.enShort")}
        </button>
        <div
          className="mx-1 h-6 w-px"
          style={{ backgroundColor: theme === "light" ? "#e5e7eb" : "#374151" }}
        />
        <button
          onClick={onThemeToggle}
          className={`rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
            theme === "dark"
              ? "border border-blue-400 bg-blue-900 text-blue-200 shadow-md"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {theme === "light"
            ? `🌙 ${t("theme.switchToDark")}`
            : `☀️ ${t("theme.switchToLight")}`}
        </button>
      </div>
    </div>
  );
}

export default AppFooter;
