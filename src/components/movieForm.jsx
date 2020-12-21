import React, { Component } from "react";

class Movie extends Component {
  state = {};

  handleOnSave() {
    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="m-4 component-div">
        <h2 className="title">Movie form {this.props.match.params.id}</h2>
        <button
          className="btn btn-primary my-3"
          onClick={() => this.handleOnSave()}
        >
          Save
        </button>
      </div>
    );
  }
}

export default Movie;
