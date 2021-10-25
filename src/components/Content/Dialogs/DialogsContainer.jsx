import { connect } from 'react-redux';
import { initDialog, sendMessage, updateNewMessageText } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

const mapStateToProps = (state) => ({
  contacts: state.dialogsData.contacts,
  dialogs:  state.dialogsData.dialogs
});

const actions = { initDialog, sendMessage, updateNewMessageText };

export default connect(mapStateToProps, actions)(Dialogs);