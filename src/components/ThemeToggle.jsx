import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
      title={theme === 'light' ? 'Dark mode\'a geç' : 'Light mode\'a geç'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      ) : (
        <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      )}
    </button>
  )
}

export default ThemeToggle