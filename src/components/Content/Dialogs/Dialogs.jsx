import { useParams } from 'react-router-dom';
import style   from './Dialogs.module.css';
import Contact from './Contact/Contact';
import { updateNewMessageTextActionCreator } from '../../../redux/state';

const Dialogs = (props) => {
  // ---------------------------------------------------
  const messageTextChange = (value) => {
    if (!currentContactId) { return; }
    const action = updateNewMessageTextActionCreator(currentContactId, value);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const { currentContactId } = useParams();
  const contacts = props.data.contacts.map(
    (contact) => (contact.id === parseInt(currentContactId))
      ? <Contact
          id={contact.id} key={`contact${contact.id}`} name={contact.name}
          onDispatch={props.onDispatch} selected
        />
      : <Contact
          id={contact.id} key={`contact${contact.id}`} name={contact.name}
          onDispatch={props.onDispatch}
        />
  );
  const messageText = (props.data.dialogs[currentContactId])
    ? props.data.dialogs[currentContactId].newMessageText : '';
  return (
    <div className={`content ${style.content} ${style.dialogs}`}>
      <div className={style.contactList}>{contacts}</div>
      <div className={`dialog`}>
        <div className={`dialogMessages`}></div>
        <div className={`messageForm`}>
          <p>Ваше сообщение</p>
          <textarea value={messageText}
            onChange={(event) => { messageTextChange(event.target.value); }}
          />
          <input type="button" value="Отправить" />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;