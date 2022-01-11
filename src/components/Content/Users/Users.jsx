import Placeholder from '../Placeholder';
import style       from './Users.module.css';
import User        from './User/User';
import PageControl from './PageControl/PageControl';

const Users = (props) => {
  if (props.isFetching) {
    return (<Placeholder message="Запрос пользователей..." />);
  }
  if (props.isAuthentificated !== undefined && !props.isAuthentificated) {
    return (<Placeholder message="Аутентифицируйтесь, чтобы просмотреть пользователей!" />);
  }
  const users = props.fetchedUsers.map(
    (user) =>
      <User
        id={user.id} key={`user${user.id}`} name={user.name} followed={user.is_followed}
        followClick={props.follow} unfollowClick={props.unfollow}
        followingInProgress={props.followingInProgress}
      />
  );
  return (
    <div className={`${style.content} ${style.users}`}>
      <div className={style.userList}>{users}</div>
      <PageControl
        currentPage={props.pageParams.currentPage} pageSize={props.pageParams.pageSize}
        pagesCount={props.pageParams.pagesCount}
        fetchUsers={props.fetchUsers} setPageParams={props.setPageParams}
      />
    </div>
  );
};

export default Users;