import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import _ from "lodash";

import NavBar from "./components/navBar";
import Background from "./components/background";
import Main from "./components/main";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Footer from "./components/footer";
import Movie from "./components/movieForm";
import { getMovies, deleteMovie } from "./services/fakeMovieService";
import { getGenres } from "./services/genreService";
import paginate from "./utilities/paginate";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

class App extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 8,
    genres: [],
    currentGenre: "all",
    sortColumn: { sortBy: "title", sortOrder: "asc" },
  };

  async componentDidMount() {
    const response = await getGenres();
    const myGenres = response.data;
    this.setState({ movies: getMovies(), genres: myGenres });
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
    this.setState({ currentGenre: genre, currentPage: 1, searchQuery: "" });
  }

  handleSort(mySortColumn) {
    this.setState({ sortColumn: mySortColumn });
  }

  handleSearch(query) {
    this.setState({ currentGenre: "all", currentPage: 1, searchQuery: query });
  }

  render() {
    const {
      movies,
      currentPage,
      pageSize,
      genres,
      currentGenre,
      sortColumn,
      searchQuery,
    } = this.state;
    let moviesFiltered = movies;
    if (searchQuery) {
      moviesFiltered = movies.filter((movie) =>
        movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else
      moviesFiltered =
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
        <Switch>
          <Route path="/movies/new" render={(props) => <Movie {...props} />} />
          <Route path="/movies/:id" render={(props) => <Movie {...props} />} />
          <Route
            path="/movies"
            render={(props) => (
              <Main
                movies={moviesPaginate}
                currentPage={currentPage}
                pageSize={pageSize}
                genres={genres}
                currentGenre={currentGenre}
                sortColumn={sortColumn}
                count={count}
                searchQuery={searchQuery}
                onGenreSelect={(genre) => this.handleGenreSelect(genre)}
                onDelete={(movieId) => this.handleDelete(movieId)}
                onLike={(movie) => this.handleLike(movie)}
                onSort={(byElement) => this.handleSort(byElement)}
                onPageChange={(page) => this.handlePagination(page)}
                onSearch={(query) => this.handleSearch(query)}
                {...props}
              />
            )}
          />
          <Route
            path="/customers"
            render={(props) => <Customers {...props} />}
          />
          <Route path="/rentals" render={(props) => <Rentals {...props} />} />
          <Route path="/login" render={(props) => <LoginForm {...props} />} />
          <Route
            path="/register"
            render={(props) => <RegisterForm {...props} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
