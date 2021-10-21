import { connect } from 'react-redux';
import { acInitDialog, acSendMessage, acUpdateNewMessageText } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => {
  return {
    contacts: state.dialogsData.contacts,
    dialogs:  state.dialogsData.dialogs
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onContactClick: (contactId) => {
      dispatch(acInitDialog(contactId));
    },
    onMessageTextChange: (contactId, value) => {
      dispatch(acUpdateNewMessageText(contactId, value));
    },
    onSendMessageClick: (contactId) => {
      dispatch(acSendMessage(contactId));
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;