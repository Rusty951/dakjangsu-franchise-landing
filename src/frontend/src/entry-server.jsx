import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import './index.css';
import App from './App.jsx';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
