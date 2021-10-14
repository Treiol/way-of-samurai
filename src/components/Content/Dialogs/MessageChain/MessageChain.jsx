import style from './MessageChain.module.css';

const MessageChain = (props) => {
  const items = props.items.map(
    (item, i) => <span key={`item${i + 1}`} className={style.item}>{item}</span>
  );
  const messageChainClassName =
    (props.incoming) ? `${style.messageChain} ${style.incoming}` : style.messageChain;
  return (
    <div className={messageChainClassName}>{items}</div>
  );
};

export default MessageChain;