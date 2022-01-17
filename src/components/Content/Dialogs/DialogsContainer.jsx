import React       from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initDialog, sendMessage, updateNewMessageText } from '../../../redux/dialogs-reducer';
import { withAuthRedirect } from '../../withAuthRedirect';
import Dialogs from './Dialogs';

const actions = { initDialog, sendMessage, updateNewMessageText };

const mapStateToProps = (state) => ({
  contacts: state.dialogsData.contacts,
  dialogs:  state.dialogsData.dialogs
});

class DialogsApi extends React.Component {
  // ---------------------------------------------------
  render() {
    return (
      <Dialogs
        contacts={this.props.contacts} dialogs={this.props.dialogs}
        initDialog={this.props.initDialog.bind(this)} sendMessage={this.props.sendMessage.bind(this)}
        updateNewMessageText={this.props.updateNewMessageText.bind(this)}
      />
    );
  }
  // ---------------------------------------------------
};

const DialogsContainer = compose(
  connect(mapStateToProps, actions),
  withAuthRedirect
)(DialogsApi)

export default DialogsContainer;