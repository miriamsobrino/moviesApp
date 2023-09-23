import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons"; // Icono de contorno
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons"; // Icono

export const Movie = ({ key, title, poster, toggleFavorite }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchMovieDetails = (title) => {
    const API_KEY = "151b453c";
    const detail_api = `https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`;

    fetch(detail_api)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetails(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchMovieDetails(title);
  }, [title]);
  return (
    <div>
      <div className="movie-card">
        <button
          onClick={() => {
            setIsFavorite(!isFavorite);
            toggleFavorite({
              key: [movieDetails.imdbID],
              Title: title,
              Poster: poster,
            });
          }}
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        >
          <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartOutline} />
        </button>
        <img src={poster} alt={title} />
        <div className="movie-info">
          <p className="title">{title}</p>
          <p className="rate">
            {movieDetails ? movieDetails.imdbRating : "N/A"}
          </p>
        </div>
        <div className="plot">
          <p>{movieDetails ? movieDetails.Plot : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};
