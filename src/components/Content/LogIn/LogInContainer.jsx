import React        from 'react';
import { connect }  from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchAuthData, fetchLoggedStatus
} from '../../../redux/auth-reducer';
import LogIn from './LogIn';

const actions = { fetchAuthData, fetchLoggedStatus };

const mapStateToProps = (state) => ({
  isAuthenticated: state.authData.isAuthenticated,
  user:            state.authData.user
});

class LogInApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchAuthData(true);
  }
  // ---------------------------------------------------
  render() {
    if (this.props.isAuthenticated && this.props.user) {
      return (
        <Redirect to={`/profile/${this.props.user.id}`} />
      );
    }
    return (
      <LogIn {...this.props} onFormSubmit={this.props.fetchLoggedStatus} />
    );
  }
  // ---------------------------------------------------
};

const LogInContainer = connect(mapStateToProps, actions)(LogInApi);

export default LogInContainer;