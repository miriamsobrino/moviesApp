import { useEffect, useState } from "react";
import "./App.css";
import { Movie } from "./components/Movie.js";
import { Header } from "./components/Header.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { API_KEY } from "./config";

function App() {
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [showFavoritesList, setShowFavoritesList] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const api = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`;

      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          if (data.Search && data.Search.length > 0) {
            setMovies(data.Search);
            setOriginalMovies(data.Search);
            setNoResults(false);
          } else {
            setMovies([]);
            setOriginalMovies([]);
            setNoResults(true);
          }
        });
    } else {
      setMovies([]);
      setOriginalMovies([]);
      setNoResults(false);
    }
  }, [searchTerm]);

  const toggleFavorite = (movie) => {
    const isAlreadyFavorite = favoriteMovies.some(
      (favorite) => favorite.imdbID === movie.imdbID
    );
    let updatedFavorites;

    if (isAlreadyFavorite) {
      updatedFavorites = favoriteMovies.filter(
        (favorite) => favorite.imdbID !== movie.imdbID
      );
    } else {
      updatedFavorites = [...favoriteMovies, movie];
    }

    setFavoriteMovies(updatedFavorites);

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavoriteMovies = localStorage.getItem("favoriteMovies");

    if (storedFavoriteMovies) {
      setFavoriteMovies(JSON.parse(storedFavoriteMovies));
    }
  }, []);

  const showFavorites = () => {
    setIsClicked(!isClicked);
    setShowFavoritesList(!showFavoritesList);
    console.log("favoriteMovies:", favoriteMovies);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="App">
      <Header handleOnChange={handleOnChange} handleOnSubmit={handleOnSubmit} />
      <div className="buttons-header">
        <button
          className={`favorites ${isClicked ? "favorites-active" : ""}`}
          onClick={showFavorites}
        >
          <FontAwesomeIcon icon={faHeart} />
          {"\u00A0"} Favorites
        </button>
      </div>

      <div className="movies-container">
        {noResults ? (
          <div className="error-container">
            <p className="error-text">Can't find a movie</p>
          </div>
        ) : showFavoritesList ? (
          favoriteMovies.map((movie) => (
            <Movie
              key={movie.imdbID}
              movie={movie}
              title={movie.Title}
              poster={movie.Poster}
              toggleFavorite={() => toggleFavorite(movie)}
            />
          ))
        ) : (
          movies &&
          movies
            .filter((movie) => movie.Type === "movie")
            .map(
              (movie) =>
                movie.Poster !== "N/A" && (
                  <Movie
                    key={movie.imdbID}
                    movie={movie}
                    title={movie.Title}
                    poster={movie.Poster}
                    toggleFavorite={() => toggleFavorite(movie)}
                  />
                )
            )
        )}
      </div>
    </div>
  );
}

export default App;
