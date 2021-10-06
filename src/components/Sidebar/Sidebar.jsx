import style from './Sidebar.module.css';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className={style.sidebar}>
      <div className={style.item}>
        <NavLink activeClassName={style.activeLink} to="/.">Профиль</NavLink>
      </div><div className={style.item}>
        <NavLink activeClassName={style.activeLink} to="/feed">Новости</NavLink>
      </div><div className={style.item}>
        <NavLink activeClassName={style.activeLink} to="/dialogs">Сообщения</NavLink>
      </div><div className={style.item}>
        <NavLink activeClassName={style.activeLink} to="/music">Музыка</NavLink>
      </div><div className={style.item}>
        <NavLink activeClassName={style.activeLink} to="/settings">Настройки</NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;