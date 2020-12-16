import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Background from "./components/background";
import Movies from "./components/movies";
import PaginationBar from "./components/common/paginationBar";
import ListMenu from "./components/common/listMenu";
import Footer from "./components/footer";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";

class App extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 8,
    genres: [],
    currentGenre: "all",
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

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

  handleGenreSelect(genre) {
    this.setState({ currentGenre: genre, currentPage: 1 });
  }

  render() {
    const { movies, currentPage, pageSize, genres, currentGenre } = this.state;
    const count =
      currentGenre.toLowerCase() === "all"
        ? movies.length
        : movies.filter(
            (movie) =>
              movie["genre"]["name"].toLowerCase() ===
              currentGenre.toLowerCase()
          ).length;
    return (
      <React.Fragment>
        <Background />
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <ListMenu
                items={genres}
                textProperty="name"
                valueProperty="_id"
                currentItem={currentGenre}
                onItemClick={(genre) => this.handleGenreSelect(genre)}
              />
            </div>
            <div className="col-sm">
              <Movies
                movies={movies}
                onDelete={(movieId) => this.handleDelete(movieId)}
                onLike={(movie) => this.handleLike(movie)}
                currentPage={currentPage}
                pageSize={pageSize}
                currentGenre={currentGenre}
              />
              <PaginationBar
                currentPage={currentPage}
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={(page) => this.handlePagination(page)}
              />
            </div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
