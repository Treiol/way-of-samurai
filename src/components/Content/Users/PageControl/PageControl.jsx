import style from './PageControl.module.css';

const PageControl = (props) => {
  // ---------------------------------------------------
  const pageClick = (pageNumber) => {
    if (pageNumber === props.pageParams.currentPage) { return; }
    const authentification = {
      isAuthentificated:    props.isAuthentificated,
      setIsAuthentificated: props.setIsAuthentificated
    };
    const newPageParams = { ...props.pageParams, currentPage: pageNumber };
    props.fetchUsers(authentification, newPageParams,
      () => {
        props.setPageParams(newPageParams);
      }
    );
  };
  // ---------------------------------------------------
  const pages = [];
  for (let i = 1; i <= props.pageParams.pagesCount; i++) {
    const pageClassName = (i === props.pageParams.currentPage)
      ? `${style.page} ${style.current}`
      : style.page;
    pages.push(
      <span key={`page${i}`} className={pageClassName} onClick={() => { pageClick(i); }}>{i}</span>
    );
  }
  return (
    <div className={style.pages}>{pages}</div>
  );
};

export default PageControl;