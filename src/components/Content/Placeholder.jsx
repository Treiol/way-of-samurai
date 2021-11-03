import style from './Placeholder.module.css';

const Placeholder = (props) => {
  return (
    <div className={style.placeholder}><span>{props.message}</span></div>
  );
};

export default Placeholder;