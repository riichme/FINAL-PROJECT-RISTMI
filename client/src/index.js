// React project starts from here

// Import all needed dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'flowbite';
import 'upkit/dist/style.min.css';
import { Provider } from "react-redux";
import store from "./app/store";

// App.js will be rendered to index.html from folder public
ReactDOM.render(
  <React.StrictMode>
    {/* App is wrapped with provider from redux */}
    {/* All global state will be stored in store */}
    <Provider store={store}> 
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
