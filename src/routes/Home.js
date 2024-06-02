import React, { Component } from "react";
import logo from "./logo.svg";
import "./Home.css";
import axios from "axios";
import Movie from "../components/Movie";

class Home extends Component {
  state = { isLoading: true, movies: [] };

  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );

    this.setState({ movies: movies, isLoading: false });
    //console.log(this.state.movies);
  };

  componentDidMount() {
    //영화 데이터 로딩
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">"Loading..."</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              //console.log(movie);
              return (
                <Movie
                  key={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
