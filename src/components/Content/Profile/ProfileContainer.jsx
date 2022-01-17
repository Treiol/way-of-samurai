import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose }    from 'redux';
import { addPost, fetchProfile, updateNewPostText } from '../../../redux/profile-reducer';
import { withAuthRedirect } from '../../withAuthRedirect';
import Placeholder from '../Placeholder';
import Profile     from './Profile';

const actions = { addPost, fetchProfile, updateNewPostText };

const mapStateToProps = (state) => ({
  isFetching:  state.profileData.isFetching,
  newPostText: state.profileData.newPostText,
  posts:       state.profileData.posts,
  userInfo:    state.profileData.userInfo
});

class ProfileApi extends React.Component {
  // ---------------------------------------------------
  componentDidMount() {
    const userId = (this.props.match.params.userId) ? parseInt(this.props.match.params.userId) : 0;
    this.props.fetchProfile(userId);
  }
  // ---------------------------------------------------
  render() {
    if (this.props.isFetching) {
      return (<Placeholder message="Запрос информации о пользователе..." />);
    }
    return (
      <Profile
        newPostText={this.props.newPostText} posts={this.props.posts}
        userInfo={this.props.userInfo}
        addPost={this.props.addPost} updateNewPostText={this.props.updateNewPostText}
      />
    );
  }
  // ---------------------------------------------------
};

const ProfileContainer = compose(
  connect(mapStateToProps, actions),
  withRouter, withAuthRedirect
)(ProfileApi);

export default ProfileContainer;