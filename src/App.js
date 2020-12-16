import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Background from "./components/background";
import Movies from "./components/movies";
import PaginationBar from "./components/common/paginationBar";
import Footer from "./components/footer";
import { getMovies, deleteMovie } from "./services/fakeMovieService";

class App extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 8,
    currentGenre: "",
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

  handlePagination(page) {
    this.setState({ currentPage: page });
  }

  render() {
    const { movies, currentPage, pageSize, currentGenre } = this.state;
    const count = movies.length;
    return (
      <React.Fragment>
        <Background />
        <Movies
          movies={movies}
          onDelete={(movieId) => this.handleDelete(movieId)}
          onLike={(movie) => this.handleLike(movie)}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        <PaginationBar
          currentPage={currentPage}
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={(page) => this.handlePagination(page)}
        />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
