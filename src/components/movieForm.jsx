import React from "react";
import Joi from "joi";

import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
class Movie extends Form {
  state = {
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };

  mapToView(data) {
    const myData = {};
    const { _id, title, genre, numberInStock, dailyRentalRate } = data;
    myData._id = _id;
    myData.title = title;
    myData.genre = genre.name;
    myData.numberInStock = numberInStock;
    myData.dailyRentalRate = dailyRentalRate;
    return myData;
  }

  async componentDidMount() {
    const { data, genres } = this.state;
    const myGenres = [...genres];
    let myData = { ...data };
    const response = await getGenres();
    const movieGenres = response.data;
    for (let moviGenre of movieGenres) {
      myGenres.push(moviGenre.name);
    }
    this.setState({ genres: myGenres });

    const { id } = this.props.match.params;

    if (id) {
      try {
        const response = await getMovie(id);
        const myMovie = response.data;
        myData = this.mapToView(myMovie);
        this.setState({ data: myData });
      } catch (exeption) {
        if (exeption.response && exeption.response.status === 404)
          return this.props.history.replace("/not-found");
      }
    }
  }

  schema = Joi.object({
    _id: Joi.string(),
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
    const {
      _id,
      title,
      genre,
      numberInStock,
      dailyRentalRate,
    } = this.state.data;
    const myMovie = { genre: {} };
    myMovie._id = _id;
    myMovie.title = title;
    myMovie.numberInStock = numberInStock;
    myMovie.dailyRentalRate = dailyRentalRate;
    const movieGenres = getGenres();
    for (let moviGenre of movieGenres) {
      if (moviGenre.name.toLowerCase() === genre.toLowerCase()) {
        myMovie.genre.name = genre;
        myMovie.genre._id = moviGenre._id;
      }
    }

    const savedMovie = saveMovie(myMovie);
    console.log("saved movie", savedMovie);
    this.props.history.replace("/movies");
  }

  render() {
    return (
      <div className="component-div">
        <h2 className="title">Movie form {this.props.match.params.id}</h2>
        <form onSubmit={(event) => this.handleSumbmit(event)}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default Movie;
