import { NavLink } from 'react-router-dom';
import style from './Contact.module.css';

const Contact = (props) => {
  // ---------------------------------------------------
  const contactClick = (contactId) => {
    if (props.selected) { return; }
    props.click(contactId);
  };
  // ---------------------------------------------------
  const contactClassName = (props.selected) ? `${style.contact} ${style.selected}` : style.contact;
  return (
    <NavLink
      className={contactClassName} to={`/dialogs/${props.id}`}
      onClick={() => { contactClick(props.id); }}
    >
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>{props.name}</div>
    </NavLink>
  );
};

export default Contact;