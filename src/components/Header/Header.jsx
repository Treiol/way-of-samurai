import { NavLink } from 'react-router-dom';
import './Header.module.css';

const Header = (props) => {
  const user = [];
  if (props.isAuthentificated !== undefined && !props.isAuthentificated) { user.push(<span key="user0">Гость</span>); }
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