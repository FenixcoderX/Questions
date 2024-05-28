import React from 'react';
import ReactDOM from 'react-dom/client';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { Provider } from 'react-redux';
import reducer from './reducers'; // The combined reducer
import middleware from './middleware';

// Create the store with the persisted reducer
const encryptor = encryptTransform({
  secretKey: 'simple',
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['authedUser'],
  transforms: [encryptor]
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer, middleware);
const persistor = persistStore(store);

// Render the app to the DOM
// The Provider component makes the Redux store available to any nested components that have been wrapped in the connect() function
// The PersistGate component delays the rendering of the app's UI until the persisted state has been retrieved and saved to redux
// The Router component makes the routing functionality available to the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router>
        <App />
      </Router>
      </PersistGate>
    </Provider>
 
);
