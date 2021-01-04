import React from "react";
import Joi from "joi";

import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
class Movie extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  async populateGenres() {
    const response = await getGenres();
    const myGenres = response.data;
    this.setState({ genres: myGenres });
  }

  mapToView(data) {
    const myData = {};
    const { _id, title, genre, numberInStock, dailyRentalRate } = data;
    myData._id = _id;
    myData.title = title;
    myData.genreId = genre._id;
    myData.numberInStock = numberInStock;
    myData.dailyRentalRate = dailyRentalRate;
    return myData;
  }

  async populateMovie() {
    try {
      const { id } = this.props.match.params;
      if (id) {
        const response = await getMovie(id);
        const myMovie = response.data;
        const myData = this.mapToView(myMovie);
        this.setState({ data: myData });
      }
    } catch (exeption) {
      if (exeption.response && exeption.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().label("Title").required().min(5),
    genreId: Joi.string().label("Genre").required(),
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

  async doSumbit() {
    console.log("saved movie", this.state.data);
    await saveMovie(this.state.data);
    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="component-div">
        <h2 className="title">Movie form {this.props.match.params.id}</h2>
        <form onSubmit={(event) => this.handleSumbmit(event)}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
