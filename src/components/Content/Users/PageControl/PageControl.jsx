import style from './PageControl.module.css';

const PageControl = (props) => {
  // ---------------------------------------------------
  const pageClick = (pageNumber) => {
    if (pageNumber === props.currentPage) { return; }
    props.fetchUsers(pageNumber, props.pageSize,
      () => {
        props.setPageParams({ currentPage: pageNumber });
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