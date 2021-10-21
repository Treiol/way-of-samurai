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
  switch (action.type) {
    case ACTION_INIT_DIALOG: {
      if (state.dialogs[action.contactId]) { return state; }
      const newState = { ...state };
      newState.dialogs = {
        ...state.dialogs,
        [action.contactId]: { messages: [], newMessageText: '' }
      };
      return newState;
    }
    case ACTION_SEND_MESSAGE: {
      const messages    = state.dialogs[action.contactId].messages;
      const messageText = state.dialogs[action.contactId].newMessageText;
      const newChainNeeded = (
        messages.length === 0 || messages[messages.length - 1].isIncoming
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
    case ACTION_UPDATE_NEW_MESSAGE_TEXT: {
      if (!state.dialogs[action.contactId]) { return state; }
      const newState   = { ...state };
      newState.dialogs = { ...state.dialogs };
      newState.dialogs[action.contactId].newMessageText = action.newMessageText;
      return newState;
    }
    default: return state;
  }
};

export const acInitDialog = (contactId) => ({
  type: ACTION_INIT_DIALOG, contactId
});

export const acSendMessage = (contactId) => ({
  type: ACTION_SEND_MESSAGE, contactId
});

export const acUpdateNewMessageText = (contactId, newMessageText) => ({
  type: ACTION_UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export default dialogsReducer;