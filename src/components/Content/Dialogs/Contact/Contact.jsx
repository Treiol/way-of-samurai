import style from './Contact.module.css';
//import { loadDialogActionCreator } from '../../../redux/state';

const Contact = (props) => {
  const contactClassName = (props.selected)
    ? `${style.contact} ${style.selected}`
    : style.contact;
  return (
    <div className={contactClassName}>
      <div className={style.userAvatar}><span>ava</span></div>
      <div className={style.userName}>{props.name}</div>
    </div>
  );
};

export default Contact;