import { NavLink } from 'react-router-dom';
import './Header.module.css';

const Header = (props) => {
  const user = [];
  if (props.isAuthentificated !== undefined && !props.isAuthentificated) {
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
        <button key="log_out" onClick={props.onLogOut}>Выход</button>
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