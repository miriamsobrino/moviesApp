import React from "react";

export const Header = ({ handleOnSubmit, handleOnChange }) => {
  return (
    <header className="header">
     
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
