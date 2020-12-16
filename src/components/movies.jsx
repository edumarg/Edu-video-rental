import React, { Component } from "react";
import Like from "./common/like";
import paginate from "../utilities/paginate";

class Movies extends Component {
  state = {};

  render() {
    const {
      movies,
      onDelete,
      onLike,
      currentPage,
      pageSize,
      currentGenre,
    } = this.props;
    const count = movies.length;
    const moviesFiltered =
      currentGenre.toLowerCase() === "all"
        ? movies
        : movies.filter(
            (movie) =>
              movie["genre"]["name"].toLowerCase() ===
              currentGenre.toLowerCase()
          );
    const moviesPaginate = paginate(moviesFiltered, currentPage, pageSize);
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
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock Qty</th>
                  <th scope="col">Rate $</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="">
                {moviesPaginate.map((movie) => {
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
