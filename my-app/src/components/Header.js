import React from "react";

export const Header = ({ handleOnSubmit, handleOnChange }) => {
  return (
    <header className="header">
      <img className="logo" src="/build/assets/icon-movie.png" />
      <form onSubmit={handleOnSubmit}>
        <input
          className="search-box"
          type="search"
          placeholder="Search a film..."
          onChange={handleOnChange}
        ></input>
      </form>
    </header>
  );
};
