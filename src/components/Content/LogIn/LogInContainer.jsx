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

const LogInApi = (props) => {
  if (props.isAuthenticated && props.user) {
    return (
      <Redirect to={`/profile/${props.user.id}`} />
    );
  }
  return (
    <LogIn {...props} onFormSubmit={props.fetchLoggedStatus} />
  );
};

const LogInContainer = connect(mapStateToProps, actions)(LogInApi);

export default LogInContainer;