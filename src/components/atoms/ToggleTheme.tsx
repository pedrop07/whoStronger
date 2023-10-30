'use client';

import { IconButton } from '@material-tailwind/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton
      onClick={handleToggleTheme}
      variant="text"
      className="dark:hover:bg-gray-700/50"
    >
      {theme === 'light' ? (
        <Sun className="text-primary" />
      ) : (
        <Moon className="text-secondary" />
      )}
    </IconButton>
  );
}
