
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

// Find the root element in your HTML
const container = document.getElementById('root')!;
const root = createRoot(container);

// Render the app using createRoot
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
