const ACTION_ADD_POST                = 0;
const ACTION_INIT_DIALOG             = 1;
const ACTION_SEND_MESSAGE            = 2;
const ACTION_UPDATE_NEW_MESSAGE_TEXT = 3;
const ACTION_UPDATE_NEW_POST_TEXT    = 4;

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
    switch (action.type) {
      case ACTION_ADD_POST:
        const newPost = {
          id:         this._state.profileData.posts.length + 1,
          message:    this._state.profileData.newPostText,
          likesCount: 0
        };
        this._state.profileData.posts.unshift(newPost);
        this._state.profileData.newPostText = '';
        this._callSubscriber(this);
        break;
      case ACTION_INIT_DIALOG:
        if (this._state.dialogsData.dialogs[action.contactId]) { break; }
        this._state.dialogsData.dialogs[action.contactId] = {
          messages:       [],
          newMessageText: ''
        };
        this._callSubscriber(this);
        break;
      case ACTION_SEND_MESSAGE:
        const messages = this._state.dialogsData.dialogs[action.contactId].messages;
        const newChainNeeded = (
          messages.length === 0 || messages[messages.length - 1].isIncoming
        );
        if (newChainNeeded) {
          this._state.dialogsData.dialogs[action.contactId].messages.push({
            chain: [action.newMessageText], isIncoming: false
          });
        } else {
          this._state.dialogsData.dialogs[action.contactId].messages[messages.length - 1].chain.push(
            action.newMessageText
          );
        }
        this._state.dialogsData.dialogs[action.contactId].newMessageText = '';
        this._callSubscriber(this);
        break;
      case ACTION_UPDATE_NEW_MESSAGE_TEXT:
        const dialog = this._state.dialogsData.dialogs[action.contactId];
        if (!dialog) { break; }
        dialog.newMessageText = action.newMessageText;
        this._callSubscriber(this);
        break;
      case ACTION_UPDATE_NEW_POST_TEXT:
        this._state.profileData.newPostText = action.newPostText;
        this._callSubscriber(this);
        break;
      default:
        console.warn('state store: no action dispatched!');
    }
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

export const sendMessageActionCreator = (contactId, newMessageText) => ({
  type: ACTION_SEND_MESSAGE, contactId, newMessageText
});

export const updateNewMessageTextActionCreator = (contactId, newMessageText) => ({
  type: ACTION_UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default store;