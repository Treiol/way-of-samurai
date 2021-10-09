import state, { addPost, updateNewPostText } from './redux/state'
import { rerenderEntireTree } from './render';

rerenderEntireTree(state, addPost, updateNewPostText);