import React             from 'react';
import { connect }       from 'react-redux';
import { Redirect }      from 'react-router-dom';
import { fetchAuthData } from '../redux/auth-reducer';

const actions = { fetchAuthData };
const mapStateToProps = (state) => ({ isAuthentificated: state.authData.isAuthentificated });

export const withAuthRedirect = (Component) => {
  class AuthRedirect extends React.Component {
    // ---------------------------------------------------
    componentDidMount() {
      this.props.fetchAuthData();
    }
    // ---------------------------------------------------
    render() {
      if (this.props.isAuthentificated !== undefined && !this.props.isAuthentificated) {
        return (<Redirect to="/log_in" />);
      }
      return (<Component {...this.props} />);
    }
    // ---------------------------------------------------
  };
  return connect(mapStateToProps, actions)(AuthRedirect);
};