import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './router';
import 'bootstrap';

const store = createStore(rootReducer)

import { AuthProvider } from './context/auth';

ReactDOM.render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>,
  document.getElementById('app')
);
