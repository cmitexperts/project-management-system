import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.js';
import './css/style.css';
import './css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import Main from './Context/Main.js';
import { Provider } from 'react-redux';
import Store from './Store.js';
// import { AuthContextProvider } from './Context/AuthContext'; 

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(

    <Provider store={Store}>
      {/* <AuthContextProvider> */}
      <Main>
        <Router>
          <App />
        </Router>
      </Main>
      {/* </AuthContextProvider> */}
     </Provider>

);
