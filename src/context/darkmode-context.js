import React, { createContext, useContext, useState } from 'react';

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
  function getTheme() {
    const returning = 'WeDark?' in localStorage;
    const theme = JSON.parse(localStorage.getItem('WeDark?'));
    const userPrefersDark = matchMedia();
    // if mode was saved, return dark or light
    if (returning) {
      return theme;
      // if preferred scheme is dark, return dark
    } else if (userPrefersDark) {
      return true;
      // otherwise, return light
    } else {
      return false;
    }
  }

  function matchMedia() {
    if (!window.matchMedia) return;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const [darkMode, setDarkMode] = useState(getTheme());

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
