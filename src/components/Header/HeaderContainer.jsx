import React       from 'react';
import { connect } from 'react-redux';
import { fetchAuthData } from '../../redux/auth-reducer';
import Header from './Header';

class AuthApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchAuthData();
  }
  // ---------------------------------------------------
  render() {
    return (
      <Header
        isAuthentificated={this.props.isAuthentificated} user={this.props.user}
      />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  isAuthentificated: state.authData.isAuthentificated,
  user:              state.authData.user
});

const actions = { fetchAuthData };

export default connect(mapStateToProps, actions)(AuthApi);