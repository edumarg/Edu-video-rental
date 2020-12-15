import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete(movieId) {
    deleteMovie(movieId);
    this.setState({ movies: getMovies() });
  }

  handleLike(movie) {
    const myMovies = [...this.state.movies];
    const index = myMovies.indexOf(movie);
    const myMovie = { ...movie };
    myMovie.like = !myMovie.like;
    myMovies[index] = myMovie;
    this.setState({ movies: myMovies });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.movies.length === 0 && (
          <div>
            <p className="my-table">There are no movies in the database</p>
          </div>
        )}
        {this.state.movies.length > 0 && (
          <div>
            <p className="my-table">
              Showing {this.state.movies.length}{" "}
              {this.state.movies.length === 1 && "movie"}
              {this.state.movies.length > 1 && "movies"} in the database
            </p>
            <table className="table">
              <thead className="my-table">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock Qty</th>
                  <th scope="col">Rate $</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody className="my-table">
                {this.state.movies.map((movie) => {
                  return (
                    <tr key={movie._id}>
                      <td>{movie.title}</td>
                      <td>{movie["genre"]["name"]}</td>
                      <td>{movie.numberInStock}</td>
                      <td>{movie.dailyRentalRate}</td>
                      <td>
                        <Like
                          like={movie.like}
                          onClick={() => this.handleLike(movie)}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => this.handleDelete(movie._id)}
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
