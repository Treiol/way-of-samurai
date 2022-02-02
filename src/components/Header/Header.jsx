import { NavLink } from 'react-router-dom';
import './Header.module.css';

const Header = (props) => {
  // ---------------------------------------------------
  const logOutClick = (event) => {
    event.preventDefault();
    props.onLogOut();
  };
  // ---------------------------------------------------
  const user = [];
  if (props.isAuthenticated !== undefined && !props.isAuthenticated) {
    user.push(
      <div key="user_wrapper"><NavLink key="log_in" to="/log_in">Войти</NavLink></div>
    );
  }
  else { if (props.user) {
    user.push(
      <div key={`user${props.user.id}_wrapper`}>
        <NavLink key={`user${props.user.id}`} to={`/profile/${props.user.id}`}>
          {props.user.name}
        </NavLink>
        <a key="log_out" href="." onClick={(event) => { logOutClick(event); }}>Выход</a>
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