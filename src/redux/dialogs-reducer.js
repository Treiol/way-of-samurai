const ACTION_INIT_DIALOG             = 'ACTION_INIT_DIALOG';
const ACTION_SEND_MESSAGE            = 'ACTION_SEND_MESSAGE';
const ACTION_UPDATE_NEW_MESSAGE_TEXT = 'ACTION_UPDATE_NEW_MESSAGE_TEXT';

const initialState = {
  contacts: [
    { id: 1, name: 'Алексей' },
    { id: 2, name: 'Андрей' },
    { id: 3, name: 'Антон' },
    { id: 4, name: 'Владислав' },
    { id: 5, name: 'Сергей' }
  ],
  dialogs: { }
};

const dialogsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ACTION_INIT_DIALOG:
      if (state.dialogs[action.contactId]) { return state; }
      newState.dialogs[action.contactId] = {
        messages:       [],
        newMessageText: ''
      };
      return newState;
    case ACTION_SEND_MESSAGE:
      const messages    = newState.dialogs[action.contactId].messages;
      const messageText = newState.dialogs[action.contactId].newMessageText;
      const newChainNeeded = (
        messages.length === 0 || messages[messages.length - 1].isIncoming
      );
      if (newChainNeeded) {
        newState.dialogs[action.contactId].messages = [
          ...messages, { chain: [messageText], isIncoming: false }
        ];
      } else {
        newState.dialogs[action.contactId].messages[messages.length - 1].chain = [
          ...messages[messages.length - 1].chain, messageText
        ];
      }
      newState.dialogs[action.contactId].newMessageText = '';
      return newState;
    case ACTION_UPDATE_NEW_MESSAGE_TEXT:
      if (!state.dialogs[action.contactId]) { return state; }
      newState.dialogs = { ...state.dialogs };
      newState.dialogs[action.contactId] = { ...state.dialogs[action.contactId] };
      newState.dialogs[action.contactId].newMessageText = action.newMessageText;
      return newState;
    default:
      return newState;
  }
};

export const initDialogActionCreator = (contactId) => ({
  type: ACTION_INIT_DIALOG, contactId
});

export const sendMessageActionCreator = (contactId) => ({
  type: ACTION_SEND_MESSAGE, contactId
});

export const updateNewMessageTextActionCreator = (contactId, newMessageText) => ({
  type: ACTION_UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export default dialogsReducer;