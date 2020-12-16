import React, { Component } from "react";

class PaginationBar extends Component {
  state = {};

  render() {
    const { currentPage, itemsCount, pageSize, onPageChange } = this.props;
    const numberOfPages = Math.ceil(itemsCount / pageSize);
    if (numberOfPages === 1) return null;
    const pagesArray = [];
    for (let i = 1; i <= numberOfPages; i++) pagesArray.push(i);

    return (
      <React.Fragment>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <a
                className="page-link"
                aria-label="Previous"
                onClick={() => onPageChange(currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pagesArray.map((page) => (
              <li
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                key={`page${page}`}
              >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            ))}
            <li
              className={
                currentPage >= numberOfPages
                  ? "page-item disabled"
                  : "page-item"
              }
            >
              <a
                className="page-link"
                aria-label="Next"
                onClick={() => onPageChange(currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default PaginationBar;
