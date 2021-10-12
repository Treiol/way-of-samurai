import style   from './Dialogs.module.css';
import Contact from './Contact/Contact';

const Dialogs = (props) => {
  const contacts = props.data.contacts.map(
    (contact) => (contact.id === props.data.currentContactId)
      ? <Contact id={contact.id} key={`contact${contact.id}`} name={contact.name} onDispatch={props.onDispatch} selected />
      : <Contact id={contact.id} key={`contact${contact.id}`} name={contact.name} onDispatch={props.onDispatch} />
  );
  return (
    <div className={`content ${style.content} ${style.dialogs}`}>
      <div className={style.contactList}>{contacts}</div>
      <div className={`dialog`}>
        <div className={`dialogMessages`}></div>
        <div className={`messageForm`}>
          <p>Ваше сообщение</p>
          <textarea />
          <input type="button" value="Отправить" />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;