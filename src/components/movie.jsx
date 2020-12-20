import React, { Component } from "react";

class Movie extends Component {
  state = {};

  handleOnSave() {
    return;
  }

  render() {
    return (
      <div>
        <h2>Movie information for {}</h2>
        <button className="btn btn-primary" onClick={() => this.handleOnSave()}>
          Save
        </button>
      </div>
    );
  }
}

export default Movie;
