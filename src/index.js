import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux/store';

const rerenderEntireTree = (store) => {
  ReactDOM.render(
    <React.StrictMode><BrowserRouter>
      <App state={store.getState()} onDispatch={store.dispatch.bind(store)} />
    </BrowserRouter></React.StrictMode>,
    document.getElementById('root')
  );
};

rerenderEntireTree(store);
store.subcribe(rerenderEntireTree);