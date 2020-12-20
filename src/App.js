import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import _ from "lodash";

import NavBar from "./components/navBar";
import Background from "./components/background";
import Movies from "./components/movies";
import PaginationBar from "./components/common/paginationBar";
import ListMenu from "./components/common/listMenu";
import Footer from "./components/footer";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/fakeGenreService";
import paginate from "./utilities/paginate";

class App extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 8,
    genres: [],
    currentGenre: "all",
    sortColumn: { sortBy: "title", sortOrder: "asc" },
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

  handleSort(mySortColumn) {
    this.setState({ sortColumn: mySortColumn });
  }

  render() {
    const {
      movies,
      currentPage,
      pageSize,
      genres,
      currentGenre,
      sortColumn,
    } = this.state;
    const moviesFiltered =
      currentGenre.toLowerCase() === "all"
        ? movies
        : movies.filter(
            (movie) =>
              movie["genre"]["name"].toLowerCase() ===
              currentGenre.toLowerCase()
          );
    const sortedMovies = _.orderBy(
      moviesFiltered,
      [sortColumn.sortBy],
      [sortColumn.sortOrder]
    );
    const moviesPaginate = paginate(sortedMovies, currentPage, pageSize);
    const count = moviesFiltered.length;
    return (
      <React.Fragment>
        <NavBar />
        <Background />
        <div className="container">
          <div className="row mt-3">
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
                movies={moviesPaginate}
                sortColumn={sortColumn}
                onDelete={(movieId) => this.handleDelete(movieId)}
                onLike={(movie) => this.handleLike(movie)}
                onSort={(byElement) => this.handleSort(byElement)}
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
