import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer     from './auth-reducer';
import dialogsReducer  from './dialogs-reducer';
import profileReducer  from './profile-reducer';
import usersReducer    from './users-reducer';

const store = createStore(
  combineReducers({
    authData:    authReducer,
    dialogsData: dialogsReducer,
    profileData: profileReducer,
    usersData:   usersReducer
  }),
  applyMiddleware(thunkMiddleware)
);

export default store;