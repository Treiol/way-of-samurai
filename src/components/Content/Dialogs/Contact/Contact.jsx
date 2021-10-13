import style from './Contact.module.css';
import { NavLink } from 'react-router-dom';
import { initDialogActionCreator } from '../../../../redux/state';

const Contact = (props) => {
  // ---------------------------------------------------
  const contactClick = () => {
    if (props.selected) { return; }
    const action = initDialogActionCreator(props.id);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const contactClassName = (props.selected)
    ? `${style.contact} ${style.selected}` : style.contact;
  return (
    <NavLink className={contactClassName} to={`/dialogs/${props.id}`} onClick={contactClick}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>{props.name}</div>
    </NavLink>
  );
};

export default Contact;