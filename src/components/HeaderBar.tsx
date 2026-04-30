import type { Theme } from "./types";

type HeaderBarProps = {
  title: string;
  subtitle: string;
  theme: Theme;
};

function HeaderBar({ title, subtitle, theme }: HeaderBarProps) {
  return (
    <div
      className={`absolute inset-x-0 top-0 z-10 flex items-center justify-between ${theme === "light" ? "border-b border-green-100/50 bg-[#68B59D]" : "border-b border-gray-700 bg-gray-800"} px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white sm:px-6 sm:py-4 sm:text-xs sm:tracking-[0.35em] md:px-8 2xl:px-10`}
    >
      <span>{title}</span>
      <span className="hidden text-white md:inline">{subtitle}</span>
    </div>
  );
}

export default HeaderBar;
