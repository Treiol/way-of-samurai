import React       from 'react';
import { connect } from 'react-redux';
import Axios       from 'axios';
import { setUser } from '../../redux/auth-reducer';
import Header      from './Header';

class AuthApi extends React.Component {
  // ---------------------------------------------------
  _fetchAuthData() {
    Axios.get('https://treig.ddns.net:50005/auth/me', { withCredentials: true }).then(
      (response) => {
        if (response.status >= 400) {
          console.error(`Auth API: ${response.status} ${response.statusText}`);
          return;
        }
        if (response.data.status) {
          console.warn(`Auth API: ${response.data.status} ${response.data.error}`);
          return;
        }
        this.props.setUser(response.data.user_data);
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
      <Header user={this.props.user} />
    );
  }
  // ---------------------------------------------------
};

const mapStateToProps = (state) => ({
  user: state.authData.user
});

const actions = { setUser };

export default connect(mapStateToProps, actions)(AuthApi);