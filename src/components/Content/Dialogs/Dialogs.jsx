import { useParams } from 'react-router-dom';
import style        from './Dialogs.module.css';
import Contact      from './Contact/Contact';
import MessageChain from './MessageChain/MessageChain';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';

const Dialogs = (props) => {
  // ---------------------------------------------------
  const messageTextChange = (value) => {
    if (!currentContactId) { return; }
    const action = updateNewMessageTextActionCreator(currentContactId, value);
    props.onDispatch(action);
  };
  // ---------------------------------------------------
  const sendMessageTextClick = () => {
    if (!currentContactId) { return; }
    if (messageText.trim() === '') {
      alert('Текст сообщения не может быть пустым!');
      return;
    }
    const action = sendMessageActionCreator(currentContactId, messageText);
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
  const messageChains = [];
  if (props.data.dialogs[currentContactId]) {
    for (let i = 0; i < props.data.dialogs[currentContactId].messages.length; i++) {
      const message = props.data.dialogs[currentContactId].messages[i];
      messageChains.push(
        (message.isIncoming)
          ? <MessageChain key={`messageChain${i + 1}`} items={message.chain} incoming />
          : <MessageChain key={`messageChain${i + 1}`} items={message.chain} />
      );
    }
  }
  const messageText = (props.data.dialogs[currentContactId])
    ? props.data.dialogs[currentContactId].newMessageText : '';
  return (
    <div className={`content ${style.content} ${style.dialogs}`}>
      <div className={style.contactList}>{contacts}</div>
      <div className={style.dialog}>
        <div className={style.messageChains}>{messageChains}</div>
        <div className={style.messageForm}>
          <h1>Ваше сообщение</h1>
          <textarea value={messageText}
            onChange={(event) => { messageTextChange(event.target.value); }}
          />
          <input type="button" value="Отправить" onClick={sendMessageTextClick} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;