import { NavLink, Redirect } from 'react-router-dom';
import { authApi }           from '../../api/api';
import './Header.module.css';

const Header = (props) => {
  // ---------------------------------------------------
  const logOutClick = (event) => {
    event.preventDefault();
    authApi.logOut().then(
      (data) => {
        if (!data) { return false; }
        if (data.status < 0) {
          console.error(`Auth API: ${data.status} ${data.message}`);
          return false;
        }
        return false;// (<Redirect to="/" />);
      }
    );
    return false;
  };
  // ---------------------------------------------------
  const user = [];
  if (props.isAuthentificated !== undefined && !props.isAuthentificated) {
    user.push(
      <NavLink key="log_in" to="/log_in">Войти</NavLink>
    );
  }
  else { if (props.user) {
    user.push(
      <div key="log-out-container">
        <NavLink key={`user${props.user.id}`} to={`/profile/${props.user.id}`}>
          {props.user.name}
        </NavLink>
        <a key="log-out" href="." onClick={(event) => { logOutClick(event); }}>Выход</a>
      </div>
    );
  } }
  return (
    <header>
      <span>Социалочка</span>{user}
    </header>
  );
};

export default Header;