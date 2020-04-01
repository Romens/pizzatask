import React from 'react';
import ReactDOM from 'react-dom';
import store from './reducers/store';
import { AuthProvider } from './context/auth';
import App from './router';
import 'bootstrap';

ReactDOM.render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>,
  document.getElementById('app')
);
