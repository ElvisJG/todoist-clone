import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { DarkModeProvider } from './context/darkmode-context';
import './App.scss';

render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>,
  document.getElementById('root')
);
