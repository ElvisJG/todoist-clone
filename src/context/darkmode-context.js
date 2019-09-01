import React, { createContext, useContext, useState } from 'react';

export const DarkModeContext = createContext();
export const DarkModeProvider = ({ children }) => {
  let getTheme = window.localStorage.getItem(darkMode);
  const [darkMode, setDarkMode] = useState(getTheme);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
