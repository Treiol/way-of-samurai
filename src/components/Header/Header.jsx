import { NavLink } from 'react-router-dom';
import './Header.module.css';

const Header = (props) => {
  return (
    <header>
      <span>Социалочка</span>
      {props.user && <NavLink to={`/profile/${props.user.id}`}>{props.user.name}</NavLink>}
    </header>
  );
};

export default Header;