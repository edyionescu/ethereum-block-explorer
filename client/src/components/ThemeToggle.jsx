import { useState, useEffect } from 'react';
import { name as project } from '../../package.json';

const key = `${project}-theme`;

function ThemeToggle() {
  const [currentTheme, setTheme] = useState(localStorage[key] ?? 'light');
  const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
  const tooltip = `Switch to ${nextTheme} theme`;

  useEffect(
    function toggleTheme() {
      document.documentElement.classList.toggle('dark', currentTheme === 'dark');
      localStorage[key] = currentTheme;
    },
    [currentTheme]
  );

  return (
    <button
      type="button"
      title={tooltip}
      aria-label={tooltip}
      className="cursor-pointer group rounded-full bg-white/90 px-2 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(nextTheme)}
    >
      <SunIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:fill-stone-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-stone-300" />
      <MoonIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-stone-50 [@media(prefers-color-scheme:dark)]:stroke-stone-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-stone-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-stone-600" />
    </button>
  );
}

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ThemeToggle;
