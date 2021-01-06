import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import _ from "lodash";
import { toast, ToastContainer } from "react-toastify";

import NavBar from "./components/navBar";
import Background from "./components/background";
import Main from "./components/main";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import Footer from "./components/footer";
import Movie from "./components/movieForm";
import paginate from "./utilities/paginate";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LogOut from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import { getMovies, deleteMovie } from "./services/movieService";
import { getGenres } from "./services/genreService";
import { getCurrentUser } from "./services/authService";

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 8,
    genres: [],
    currentGenre: "all",
    sortColumn: { sortBy: "title", sortOrder: "asc" },
    user: "",
  };

  async populateGenres() {
    let response = await getGenres();
    const myGenres = response.data;
    this.setState({ genres: myGenres });
  }

  async populateMovies() {
    const response = await getMovies();
    const myMovies = response.data;
    this.setState({ movies: myMovies });
  }

  decodeJwt() {
    const myUser = getCurrentUser();
    this.setState({ user: myUser });
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
    this.decodeJwt();
  }

  async handleDelete(movieId) {
    const orginalMovies = [...this.state.movies];
    const myMovies = orginalMovies.filter((m) => m._id !== movieId);
    this.setState({ movies: myMovies });
    try {
      await deleteMovie(movieId);
    } catch (exeption) {
      if (exeption.response && exeption.response.status === 404) {
        toast.error("Movie not found");
        this.setState({ movies: orginalMovies });
      }
    }
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
      user,
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
        <ToastContainer />
        <NavBar user={user} />
        <Background />
        <Switch>
          <ProtectedRoute path="/movies/new" component={Movie} />
          <ProtectedRoute path="/movies/:id" component={Movie} />
          <Route
            path="/movies"
            render={(props) => (
              <Main
                user={user}
                movies={moviesPaginate}
                currentPage={currentPage}
                pageSize={pageSize}
                genres={genres}
                currentGenre={currentGenre}
                sortColumn={sortColumn}
                count={count}
                searchQuery={searchQuery}
                OnLoad={async () => await this.populateMovies()}
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
          <Route path="/logout" component={LogOut} />
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
