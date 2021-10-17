import { useParams } from 'react-router-dom';
import {
  initDialogActionCreator, sendMessageActionCreator, updateNewMessageTextActionCreator
} from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
  // ---------------------------------------------------
  const contactClick = (destContactId) => {
    if (destContactId === contactId) { return; }
    const action = initDialogActionCreator(destContactId);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const messageTextChange = (value) => {
    if (!contactId) { return; }
    const action = updateNewMessageTextActionCreator(contactId, value);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const sendMessageClick = () => {
    if (!contactId) { return; }
    if (newMessageText.trim() === '') {
      alert('Текст сообщения не может быть пустым!');
      return;
    }
    const action = sendMessageActionCreator(contactId);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const { contactId }  = useParams();
  let   messages       = [];
  let   newMessageText = '';
  if (props.data.dialogs[contactId]) {
    messages       = props.data.dialogs[contactId].messages;
    newMessageText = props.data.dialogs[contactId].newMessageText;
  }
  return (
    <Dialogs
      contactId={contactId} contacts={props.data.contacts} messages={messages}
      newMessageText={newMessageText}
      onContactClick={contactClick} onMessageTextChange={messageTextChange}
      onSendMessageClick={sendMessageClick}
    />
  );
};

export default DialogsContainer;
