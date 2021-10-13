const ACTION_ADD_POST                = 0;
const ACTION_INIT_DIALOG             = 1;
const ACTION_UPDATE_NEW_MESSAGE_TEXT = 2;
const ACTION_UPDATE_NEW_POST_TEXT    = 3;

const store = {
  _state: {
    dialogsData: {
      contacts: [
        { id: 1, name: 'Алексей' },
        { id: 2, name: 'Андрей' },
        { id: 3, name: 'Антон' },
        { id: 4, name: 'Сергей' }
      ],
      dialogs: [/*
        {
          contactId: (int),
          messages: [
            { chain: [(string), (string), ...], income: (bool) },
            ...
          ],
          newMessageText: (string)
        },
        ...
      */]
    },
    feedData:    { },
    profileData: {
      newPostText: '',
      posts:       []
    }
  },
  _callSubscriber() { },
  _getDialogIndex(contactId) {
    let result = -1;
    if (this._state.dialogsData.dialogs.length === 0) { return result; }
    for (let i = 0; i < this._state.dialogsData.dialogs.length; i++) {
      const dialog = this._state.dialogsData.dialogs[i];
      if (dialog.contactId === contactId) {
        result = i;
        break;
      }
    }
    return result;
  },
  dispatch(action) {
    switch (action.type) {
      case ACTION_ADD_POST:
        const newPost = {
          id:         this._state.profileData.posts.length + 1,
          message:    this._state.profileData.newPostText,
          likesCount: 0
        };
        this._state.profileData.posts.unshift(newPost);
        this._state.profileData.newPostText = '';
        break;
      case ACTION_INIT_DIALOG:
        if (this._getDialogIndex(action.contactId) >= 0) { break; }
        this._state.dialogsData.dialogs.push({
          contactId:      action.contactId,
          messages:       [],
          newMessageText: ''
        });
        break;
      case ACTION_UPDATE_NEW_MESSAGE_TEXT:
        const dialogIndex = this._getDialogIndex(action.contactId);
        this._state.dialogsData.dialogs[dialogIndex].newMessageText = action.newMessageText;
        break;
      case ACTION_UPDATE_NEW_POST_TEXT:
        this._state.profileData.newPostText = action.newPostText;
        break;
      default:
        console.warn('state store: no action dispatched!');
    }
    this._callSubscriber(this);
  },
  getState() {
    return this._state;
  },
  subcribe(observer) {
    this._callSubscriber = observer;
  }
};

export const addPostActionCreator = () => ({
  type: ACTION_ADD_POST
});

export const initDialogActionCreator = (contactId) => ({
  type: ACTION_INIT_DIALOG, contactId
});

export const updateNewMessageTextActionCreator = (contactId, newMessageText) => ({
  type: ACTION_UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default store;