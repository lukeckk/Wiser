'use client'

import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

const useDarkMode = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState('dark') // Start with a safe default
  const [_, setCookie] = useCookies(['theme'])

  const setAndSaveTheme = (theme) => {
    setTheme(theme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    setCookie('theme', theme)
  }

  useEffect(() => {
    defaultTheme.then(resolvedTheme => {
      setAndSaveTheme(resolvedTheme || 'dark')
    })
  }, [])

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}

export default useDarkMode