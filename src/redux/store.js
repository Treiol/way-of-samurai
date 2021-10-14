import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';

const store = {
  _state: {
    dialogsData: {
      contacts: [
        { id: 1, name: 'Алексей' },
        { id: 2, name: 'Андрей' },
        { id: 3, name: 'Антон' },
        { id: 4, name: 'Владислав' },
        { id: 5, name: 'Сергей' }
      ],
      dialogs: { }
    },
    feedData:    { },
    profileData: {
      newPostText: '',
      posts:       []
    }
  },
  _callSubscriber() { },
  dispatch(action) {
    this._state.dialogsData = dialogsReducer(this._state.dialogsData, action);
    this._state.profileData = profileReducer(this._state.profileData, action);
    this._callSubscriber(this);
  },
  getState() {
    return this._state;
  },
  subcribe(observer) {
    this._callSubscriber = observer;
  }
};

export default store;