import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import ErrorBoundary from './modules/errorBoundary/index.tsx';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
