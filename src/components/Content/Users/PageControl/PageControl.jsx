import Axios from 'axios';
import style from './PageControl.module.css';

const PageControl = (props) => {
  // ---------------------------------------------------
  const pageClick = (pageNumber) => {
    if (pageNumber === props.currentPage) { return; }
    props.onSetIsFetching(true);
    Axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${props.pageSize}&page=${pageNumber}`).then(
      (response) => {
        props.onSetIsFetching(false);
        if (response.status >= 400) {
          console.error(`Failed to get users:\n${response.status} ${response.statusText}`);
          return;
        }
        props.onSetFetchedUsers(response.data.items);
        props.onSetPageParams({ currentPage: pageNumber });
      }
    );
  };
  // ---------------------------------------------------
  const pages = [];
  for (let i = 1; i <= props.pagesCount; i++) {
    const pageClassName = (i === props.currentPage) ? `${style.page} ${style.current}` : style.page;
    pages.push(
      <span key={`page${i}`} className={pageClassName} onClick={() => { pageClick(i); }}>{i}</span>
    );
  }
  return (
    <div className={style.pages}>{pages}</div>
  );
};

export default PageControl;