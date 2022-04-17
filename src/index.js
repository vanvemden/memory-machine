import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/react-hooks';

import apolloClient from './Apollo/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
