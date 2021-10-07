import style from './Feed.module.css';

const Feed = () => {
  return (
    <div className={`content ${style.content} ${style.feed}`}>Содержание новостей</div>
  );
};

export default Feed;