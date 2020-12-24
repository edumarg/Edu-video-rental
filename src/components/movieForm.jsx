import React from "react";
import Joi from "joi";

import Form from "./common/form";

import { getMovie } from "../services/fakeMovieService";
class Movie extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      const myMovie = getMovie(id);
      console.log("mymovie", myMovie);
      if (!myMovie) this.props.history.replace("/not-found");
      else {
        const { title, genre, numberInStock, dailyRentalRate } = myMovie;
        const myData = { ...this.state.data };
        myData.title = title;
        myData.genre = genre.name;
        myData.numberInStock = numberInStock;
        myData.dailyRentalRate = dailyRentalRate;
        this.setState({ data: myData });
      }
    }
  }

  schema = Joi.object({
    title: Joi.string().label("Title").required(),
    genre: Joi.string().label("Genre").required(),
    numberInStock: Joi.number()
      .label("Number in stock")
      .required()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .precision(2)
      .label("Rate")
      .min(0)
      .max(10)
      .required()
      .messages({
        "number.base": "Value should be a float number with 1 decimal point",
      }),
    // list of error from https://github.com/sideway/joi/blob/master/API.md#list-of-errors
  });

  doSumbit() {
    console.log("save movie");
    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="component-div">
        <h2 className="title">Movie form {this.props.match.params.id}</h2>
        <form onSubmit={(event) => this.handleSumbmit(event)}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", [
            "Action",
            "Comedy",
            "Thriller",
          ])}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
