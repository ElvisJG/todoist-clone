import React, { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../../context';

export const Header = () => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <header className='header' data-testid='header'>
      <nav>
        <div className='logo'>
          <img src='/images/logo.png' alt='Todoist' />
        </div>
        <div className='settings'>
          <ul>
            <li data-testid='quick-add-task-action' className='settings__add'>
              +
            </li>
            <li
              data-testid='dark-mode-action'
              className='settings__darkmode'
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
