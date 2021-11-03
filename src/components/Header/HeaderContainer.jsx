import React       from 'react';
import { connect } from 'react-redux';
import Axios       from 'axios';
import {
  setIsAuthentificated, setUser
} from '../../redux/auth-reducer';
import Header from './Header';

class AuthApi extends React.Component {
  // ---------------------------------------------------
  _fetchAuthData() {
    Axios.get('https://treig.ddns.net:50005/auth/me', { withCredentials: true }).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Auth API: ${response.status} ${response.statusText}`);
          return;
        }
        if (response.data.status < 0) {
          switch (response.data.status) {
            case -4:
            case -10:
              console.warn(`Auth API: ${response.data.status} ${response.data.message}`);
              this.props.setIsAuthentificated(false);
              break;
            default:
              console.error(`Auth API: ${response.data.status} ${response.data.message}`);
          }
          return;
        }
        this.props.setIsAuthentificated(true);
        this.props.setUser(response.data.user);
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