import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Background from "./components/background";
import Movies from "./components/movies";
import PaginationBar from "./components/common/paginationBar";
import Footer from "./components/footer";
import { Pagination } from "react-bootstrap";

class App extends Component {
  state = {
    currentPage: 1,
    currentGenre: "",
  };

  handlePagination() {
    return;
  }

  render() {
    return (
      <React.Fragment>
        <Background />
        <Movies />
        <PaginationBar />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
