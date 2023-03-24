function Pagination({ setPageNumber, pageNumber }) {
  const onPageChange = (event, value) => {
    // console.log(event.target.value, value);
    setPageNumber(value)
  };

  return (
    <nav className="m-4" size="lg" aria-label="Page navigation example">
      <ul className="pagination justify-content-center  pagination-lg">
        <li className="page-item disabled">
          <a className="page-link" href="#" tabindex="-1">
            Previous
          </a>
        </li>
        <li className="page-item" onClick={(e) => onPageChange(e,1)}>
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item" onClick={(e) => onPageChange(e,2)}>
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item" onClick={(e) => onPageChange(e,3)}>
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
