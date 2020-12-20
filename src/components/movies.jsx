import React, { Component } from "react";
import { Link } from "react-router-dom";

import Like from "./common/like";

class Movies extends Component {
  raiseSort(byElement) {
    const mySortColumn = { ...this.props.sortColumn };
    if (mySortColumn.sortBy === byElement) {
      if (mySortColumn.sortOrder === "asc") mySortColumn.sortOrder = "desc";
      else mySortColumn.sortOrder = "asc";
    } else {
      mySortColumn.sortBy = byElement;
      mySortColumn.sortOrder = "asc";
    }
    this.props.onSort(mySortColumn);
  }

  renderSortIcon(column) {
    if (column !== this.props.sortColumn.sortBy)
      return <i class="fa fa-sort" aria-hidden="true"></i>;
    if (this.props.sortColumn.sortOrder === "asc")
      return <i class="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i class="fa fa-sort-desc" aria-hidden="true"></i>;
  }

  render() {
    const { movies, onDelete, onLike } = this.props;
    const count = movies.length;

    return (
      <React.Fragment>
        {count === 0 && (
          <div>
            <h2 className="title">There are no movies in the database</h2>
          </div>
        )}
        {count > 0 && (
          <div>
            <h2 className="title">
              Showing {count} {count === 1 && "movie"}
              {count > 1 && "movies"} in the database
            </h2>
            <table className="table my-table">
              <thead className="">
                <tr>
                  <th
                    className="clickable"
                    scope="col"
                    onClick={() => this.raiseSort("title")}
                  >
                    Title {this.renderSortIcon("title")}
                  </th>
                  <th
                    className="clickable"
                    scope="col"
                    onClick={() => this.raiseSort("genre.name")}
                  >
                    Genre {this.renderSortIcon("genre.name")}
                  </th>
                  <th
                    className="clickable"
                    scope="col"
                    onClick={() => this.raiseSort("numberInStock")}
                  >
                    Stock Qty {this.renderSortIcon("numberInStock")}
                  </th>
                  <th
                    className="clickable"
                    scope="col"
                    onClick={() => this.raiseSort("dailyRentalRate")}
                  >
                    Rate $ {this.renderSortIcon("dailyRentalRate")}
                  </th>
                  <th
                    className="clickable"
                    scope="col"
                    onClick={() => this.raiseSort("like")}
                  >
                    Like {this.renderSortIcon("like")}
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="movies-table">
                {movies.map((movie) => {
                  return (
                    <tr key={movie._id}>
                      <td>
                        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
                      </td>
                      <td>{movie["genre"]["name"]}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like like={movie.like} onClick={() => onLike(movie)} />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => onDelete(movie._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
