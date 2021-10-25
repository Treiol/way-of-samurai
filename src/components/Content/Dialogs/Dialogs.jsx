import { useParams } from 'react-router-dom';
import style        from './Dialogs.module.css';
import Contact      from './Contact/Contact';
import MessageChain from './MessageChain/MessageChain';

const Dialogs = (props) => {
  // ---------------------------------------------------
  const messageTextChange = (contactId, value) => {
    if (!contactId) { return; }
    props.updateNewMessageText(contactId, value);
  };
  // ---------------------------------------------------
  const sendMessageClick = (contactId, messageText) => {
    if (!contactId) {
      alert('Сначала выберите, кому вы хотите написать!');
      return;
    }
    if (messageText.trim() === '') {
      alert('Введите ваше сообщение!');
      return;
    }
    props.sendMessage(contactId);
  };
  // ---------------------------------------------------
  const { contactId } = useParams();
  const contacts = props.contacts.map(
    (contact) => 
      <Contact
        id={contact.id} key={`contact${contact.id}`} name={contact.name}
        selected={contact.id === parseInt(contactId)} onClick={props.initDialog}
      />
  );
  const messageChains = [];
  if (props.dialogs[contactId]) {
    for (let i = 0; i < props.dialogs[contactId].messages.length; i++) {
      const message = props.dialogs[contactId].messages[i];
      messageChains.push(
        <MessageChain
          key={`messageChain${i + 1}`} items={message.chain} incoming={message.isIncoming}
        />
      );
    }
  }
  const newMessageText = (props.dialogs[contactId]) ? props.dialogs[contactId].newMessageText : '';
  return (
    <div className={`content ${style.content} ${style.dialogs}`}>
      <div className={style.contactList}>{contacts}</div>
      <div className={style.dialog}>
        <div className={style.messageChains}>{messageChains}</div>
        <div className={style.messageForm}>
          <h1>Ваше сообщение</h1>
          <textarea
            value={newMessageText}
            onChange={(event) => { messageTextChange(contactId, event.target.value); }}
          />
          <input
            type="button" value="Отправить"
            onClick={() => { sendMessageClick(contactId, newMessageText); }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dialogs;