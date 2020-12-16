import React, { Component } from "react";

class ListMenu extends Component {
  render() {
    const { genres, currentGenre, onClick } = this.props;
    return (
      <div className="list-group">
        <a
          className={
            currentGenre.toLowerCase() === "all"
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action "
          }
          onClick={() => onClick("All")}
        >
          All Genres
        </a>
        {genres.map((genre) => (
          <a
            key={genre.name}
            className={
              genre.name === currentGenre
                ? "list-group-item active list-group-item-action"
                : "list-group-item list-group-item-action"
            }
            onClick={() => onClick(genre.name)}
          >
            {genre.name}
          </a>
        ))}
      </div>
    );
  }
}

export default ListMenu;
