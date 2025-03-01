import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // Use createRoot instead of ReactDOM.render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
