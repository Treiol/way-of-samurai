import React             from 'react';
import { connect }       from 'react-redux';
import { fetchAuthData } from '../../../redux/auth-reducer';
import { initDialog, sendMessage, updateNewMessageText } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';

class DialogsApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchAuthData(false);
  }
  // ---------------------------------------------------
  render() {
    return (
      <Dialogs
        contacts={this.props.contacts} dialogs={this.props.dialogs}
        isAuthentificated={this.props.isAuthentificated}
        initDialog={this.props.initDialog.bind(this)} sendMessage={this.props.sendMessage.bind(this)}
        updateNewMessageText={this.props.updateNewMessageText.bind(this)}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  contacts:          state.dialogsData.contacts,
  dialogs:           state.dialogsData.dialogs,
  isAuthentificated: state.authData.isAuthentificated
});

const actions = { fetchAuthData, initDialog, sendMessage, updateNewMessageText };

export default connect(mapStateToProps, actions)(DialogsApi);