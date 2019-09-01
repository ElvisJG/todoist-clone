import React, { createContext, useContext, useState } from 'react';

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
  // This function returns a boolean value after evaluation
  function getTheme() {
    const returning = 'WeDark?' in localStorage;
    const theme = JSON.parse(localStorage.getItem('WeDark?'));
    const userPrefersDark = matchMedia();
    // If a returning user has saved a prefered mode -> return the saved theme
    if (returning) {
      return theme;
      // If there is no token: check if preferred scheme is dark if so -> return dark
    } else if (userPrefersDark) {
      return true;
      // otherwise -> return light (Default Theme)
    } else {
      return false;
    }
  }

  // This function checks the Window interface's MatchMedia() method to see if
  // a user prefers dark themes
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
