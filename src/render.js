import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

export const rerenderEntireTree = (state, onAddPost, onUpdateNewPostText) => {
  ReactDOM.render(
    <React.StrictMode><BrowserRouter>
      <App state={state}
        onAddPost={onAddPost}
        onUpdateNewPostText={onUpdateNewPostText}
      />
    </BrowserRouter></React.StrictMode>,
    document.getElementById('root')
  );
};