import { NavLink } from 'react-router-dom';
import './Header.module.css';

const Header = (props) => {
  const user = [];
  if (props.isAuthentificated !== undefined && !props.isAuthentificated) {
    user.push(
      <NavLink key="log_in" to="/log_in">Войти</NavLink>
    );
  }
  else { if (props.user) {
    user.push(
      <NavLink key={`user${props.user.id}`} to={`/profile/${props.user.id}`}>
        {props.user.name}
      </NavLink>
    );
  } }
  return (
    <header>
      <span>Социалочка</span>{user}
    </header>
  );
};

export default Header;