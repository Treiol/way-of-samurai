const ACTION_INIT_DIALOG             = 'ACTION_INIT_DIALOG';
const ACTION_SEND_MESSAGE            = 'ACTION_SEND_MESSAGE';
const ACTION_UPDATE_NEW_MESSAGE_TEXT = 'ACTION_UPDATE_NEW_MESSAGE_TEXT';

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case ACTION_INIT_DIALOG:
      if (state.dialogs[action.contactId]) { return state; }
      state.dialogs[action.contactId] = {
        messages:       [],
        newMessageText: ''
      };
      return state;
    case ACTION_SEND_MESSAGE:
      const messages = state.dialogs[action.contactId].messages;
      const newChainNeeded = (
        messages.length === 0 || messages[messages.length - 1].isIncoming
      );
      if (newChainNeeded) {
        state.dialogs[action.contactId].messages.push({
          chain: [action.newMessageText], isIncoming: false
        });
      } else {
        state.dialogs[action.contactId].messages[messages.length - 1].chain.push(
          action.newMessageText
        );
      }
      state.dialogs[action.contactId].newMessageText = '';
      return state;
    case ACTION_UPDATE_NEW_MESSAGE_TEXT:
      if (!state.dialogs[action.contactId]) { return state; }
      state.dialogs[action.contactId].newMessageText = action.newMessageText;
      return state;
    default:
      return state;
  }
};

export const initDialogActionCreator = (contactId) => ({
  type: ACTION_INIT_DIALOG, contactId
});

export const sendMessageActionCreator = (contactId, newMessageText) => ({
  type: ACTION_SEND_MESSAGE, contactId, newMessageText
});

export const updateNewMessageTextActionCreator = (contactId, newMessageText) => ({
  type: ACTION_UPDATE_NEW_MESSAGE_TEXT, contactId, newMessageText
});

export default dialogsReducer;