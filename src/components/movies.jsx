import React, { Component } from "react";
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

  render() {
    const { movies, onDelete, onLike } = this.props;
    const count = movies.length;

    return (
      <React.Fragment>
        {count === 0 && (
          <div>
            <p className="title">There are no movies in the database</p>
          </div>
        )}
        {count > 0 && (
          <div>
            <p className="title">
              Showing {count} {count === 1 && "movie"}
              {count > 1 && "movies"} in the database
            </p>
            <table className="table my-table">
              <thead className="">
                <tr>
                  <th scope="col" onClick={() => this.raiseSort("title")}>
                    Title
                  </th>
                  <th scope="col" onClick={() => this.raiseSort("genre.name")}>
                    Genre
                  </th>
                  <th
                    scope="col"
                    onClick={() => this.raiseSort("numberInStock")}
                  >
                    Stock Qty
                  </th>
                  <th
                    scope="col"
                    onClick={() => this.raiseSort("dailyRentalRate")}
                  >
                    Rate $
                  </th>
                  <th scope="col" onClick={() => this.raiseSort("like")}>
                    Like
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="">
                {movies.map((movie) => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
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
