import './Placeholder.module.css';

const Placeholder = (props) => {
  return (
    <div><span>{props.message}</span></div>
  );
};

export default Placeholder;