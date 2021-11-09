import React       from 'react';
import { connect } from 'react-redux';
import { authApi } from '../../api/api';
import {
  setIsAuthentificated, setUser
} from '../../redux/auth-reducer';
import Header from './Header';

class AuthApi extends React.Component {
  // ---------------------------------------------------
  _fetchAuthData() {
    authApi.getAuth().then(
      (data) => {
        if (!data) { return; }
        if (data.status < 0) {
          switch (data.status) {
            case -4:
            case -10:
              console.warn(`Auth API: ${data.status} ${data.message}`);
              this.props.setIsAuthentificated(false);
              break;
            default:
              console.error(`Auth API: ${data.status} ${data.message}`);
          }
          return;
        }
        this.props.setIsAuthentificated(true);
        this.props.setUser(data.user);
      }
    );
  }
  // ---------------------------------------------------
  componentDidMount() {
    this._fetchAuthData();
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

const actions = { setIsAuthentificated, setUser };

export default connect(mapStateToProps, actions)(AuthApi);