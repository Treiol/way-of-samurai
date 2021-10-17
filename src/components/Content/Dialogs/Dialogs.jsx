import style        from './Dialogs.module.css';
import Contact      from './Contact/Contact';
import MessageChain from './MessageChain/MessageChain';

const Dialogs = (props) => {
  const contacts = props.contacts.map(
    (contact) => (contact.id === parseInt(props.contactId))
      ? <Contact
          id={contact.id} key={`contact${contact.id}`} name={contact.name}
          onClick={() => { props.onContactClick(contact.id); }} selected
        />
      : <Contact
          id={contact.id} key={`contact${contact.id}`} name={contact.name}
          onClick={() => { props.onContactClick(contact.id); }}
        />
  );
  const messageChains = [];
  for (let i = 0; i < props.messages.length; i++) {
    const message = props.messages[i];
    messageChains.push(
      (message.isIncoming)
        ? <MessageChain key={`messageChain${i + 1}`} items={message.chain} incoming />
        : <MessageChain key={`messageChain${i + 1}`} items={message.chain} />
    );
  }
  return (
    <div className={`content ${style.content} ${style.dialogs}`}>
      <div className={style.contactList}>{contacts}</div>
      <div className={style.dialog}>
        <div className={style.messageChains}>{messageChains}</div>
        <div className={style.messageForm}>
          <h1>Ваше сообщение</h1>
          <textarea
            value={props.newMessageText}
            onChange={(event) => { props.onMessageTextChange(event.target.value); }}
          />
          <input type="button" value="Отправить" onClick={props.onSendMessageClick} />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;