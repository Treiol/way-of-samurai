import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux/state';

const rerenderEntireTree = (store) => {
  ReactDOM.render(
    <React.StrictMode><BrowserRouter>
      <App state={store.getState()}
        onAddPost={store.addPost.bind(store)}
        onUpdateNewPostText={store.updateNewPostText.bind(store)}
      />
    </BrowserRouter></React.StrictMode>,
    document.getElementById('root')
  );
};

rerenderEntireTree(store);
store.subcribe(rerenderEntireTree);