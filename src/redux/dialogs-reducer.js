const INIT_DIALOG             = 'INIT_DIALOG';
const SEND_MESSAGE            = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const INITIAL_STATE = {
  contacts: [
    { id: 1, name: 'Алексей' },
    { id: 2, name: 'Андрей' },
    { id: 3, name: 'Антон' },
    { id: 4, name: 'Владислав' },
    { id: 5, name: 'Сергей' }
  ],
  dialogs: { }
};

const dialogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_DIALOG: {
      if (state.dialogs[action.contactId]) { return state; }
      const newState = { ...state };
      newState.dialogs = {
        ...state.dialogs,
        [action.contactId]: { messages: [], newMessageText: '' }
      };
      return newState;
    }
    case SEND_MESSAGE: {
      const messages    = state.dialogs[action.contactId].messages;
      const messageText = state.dialogs[action.contactId].newMessageText;
      const newChainNeeded = (
        !messages.length || messages[messages.length - 1].isIncoming
      );
      const newState   = { ...state };
      newState.dialogs = { ...state.dialogs };
      if (newChainNeeded) {
        newState.dialogs[action.contactId].messages.push({
          chain: [messageText], isIncoming: false
        });
      } else {
        newState.dialogs[action.contactId].messages[messages.length - 1].chain.push(
          messageText
        );
      }
      newState.dialogs[action.contactId].newMessageText = '';
      return newState;
    }
    case UPDATE_NEW_MESSAGE_TEXT: {
      if (!state.dialogs[action.contactId]) { return state; }
      const newState   = { ...state };
      newState.dialogs = { ...state.dialogs };
      newState.dialogs[action.contactId].newMessageText = action.newMessageText;
      return newState;
    }
    default: return state;
  }
};

export const initDialog = (contactId) => ({
  type: INIT_DIALOG, contactId
});

export const sendMessage = (contactId) => ({
  type: SEND_MESSAGE, contactId
});

export const updateNewMessageText = (contactId, newMessageText) => ({
  type: UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export default dialogsReducer;