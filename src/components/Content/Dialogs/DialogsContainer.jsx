import { connect } from 'react-redux';
import {
  initDialogActionCreator, sendMessageActionCreator, updateNewMessageTextActionCreator
} from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    contacts: state.dialogsData.contacts,
    dialogs:  state.dialogsData.dialogs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContactClick: (contactId, destContactId) => {
      if (contactId === destContactId) { return; }
      dispatch(initDialogActionCreator(destContactId));
    },
    onMessageTextChange: (contactId, value) => {
      if (!contactId) { return; }
      dispatch(updateNewMessageTextActionCreator(contactId, value));
    },
    onSendMessageClick: (contactId) => {
      if (!contactId) { return; }
      dispatch(sendMessageActionCreator(contactId));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;