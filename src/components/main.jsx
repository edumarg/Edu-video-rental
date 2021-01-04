import React, { Component } from "react";

import Movies from "../components/movies";
import PaginationBar from "../components/common/paginationBar";
import ListMenu from "../components/common/listMenu";

class Main extends Component {
  state = {};
  render() {
    const {
      movies,
      currentPage,
      pageSize,
      genres,
      currentGenre,
      sortColumn,
      count,
      searchQuery,
      OnLoad,
      onGenreSelect,
      onDelete,
      onLike,
      onSort,
      onPageChange,
      onSearch,
    } = this.props;
    return (
      <React.Fragment>
        <div className="container component-div">
          <div className="row mt-3">
            <div className="col-sm-3">
              <ListMenu
                items={genres}
                textProperty="name"
                valueProperty="_id"
                currentItem={currentGenre}
                onItemClick={(genre) => onGenreSelect(genre)}
              />
            </div>
            <div className="col-sm">
              <Movies
                movies={movies}
                sortColumn={sortColumn}
                searchQuery={searchQuery}
                onDelete={(movieId) => onDelete(movieId)}
                onLike={(movie) => onLike(movie)}
                onSort={(byElement) => onSort(byElement)}
                onSearch={(query) => onSearch(query)}
                onLoad={() => OnLoad()}
              />
              <PaginationBar
                currentPage={currentPage}
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={(page) => onPageChange(page)}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
