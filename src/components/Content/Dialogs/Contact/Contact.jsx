import style from './Contact.module.css';
import { loadDialogActionCreator } from '../../../../redux/state';

const Contact = (props) => {
  // ---------------------------------------------------
  const contactClick = () => {
    if (props.selected) { return; }
    const action = loadDialogActionCreator(props.id);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const contactClassName = (props.selected)
    ? `${style.contact} ${style.selected}` : style.contact;
  return (
    <div className={contactClassName} onClick={contactClick}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>{props.name}</div>
    </div>
  );
};

export default Contact;