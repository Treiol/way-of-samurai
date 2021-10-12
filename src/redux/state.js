const ACTION_ADD_POST             = 0;
const ACTION_LOAD_DIALOG          = 1;
const ACTION_UPDATE_NEW_POST_TEXT = 2;

const store = {
  _state: {
    dialogsData: {
      contacts: [{
        id: 1, name: 'Алексей'
      }, {
        id: 2, name: 'Андрей'
      }, {
        id: 3, name: 'Антон'
      }, {
        id: 4, name: 'Сергей'
      }],
      currentContactId: 0,
      dialogs:          [],
      
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
        break;
      case ACTION_LOAD_DIALOG:
        // ...
        this._state.dialogsData.currentContactId = action.contactId;
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

export const loadDialogActionCreator = (contactId) => ({
  type: ACTION_LOAD_DIALOG, contactId
});

export const updateNewPostTextActionCreator = (newPostText) => ({
  type: ACTION_UPDATE_NEW_POST_TEXT, newPostText
});

export default store;