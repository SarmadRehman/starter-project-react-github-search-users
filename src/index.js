import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GithubProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-u5n022nt73t1ren7.us.auth0.com'
      clientId='EFAGZjXImZkQeQuKuvcNVcEADS3gi6bA'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  root
);

serviceWorker.unregister();
