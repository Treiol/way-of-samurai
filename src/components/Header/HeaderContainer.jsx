import React       from 'react';
import { connect } from 'react-redux';
import { fetchAuthData } from '../../redux/auth-reducer';
import Header from './Header';

const actions = { fetchAuthData };

const mapStateToProps = (state) => ({
  isAuthentificated: state.authData.isAuthentificated,
  user:              state.authData.user
});

class HeaderApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    this.props.fetchAuthData(true);
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

const HeaderContainer = connect(mapStateToProps, actions)(HeaderApi)

export default HeaderContainer;