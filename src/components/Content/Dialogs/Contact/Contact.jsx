import style from './Contact.module.css';
import { NavLink } from 'react-router-dom';

const Contact = (props) => {
  const contactClassName = (props.selected)
    ? `${style.contact} ${style.selected}` : style.contact;
  return (
    <NavLink className={contactClassName} to={`/dialogs/${props.id}`} onClick={props.onClick}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>{props.name}</div>
    </NavLink>
  );
};

export default Contact;