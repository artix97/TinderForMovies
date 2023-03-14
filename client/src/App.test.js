import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MoviesData from "./MovieDataContext";
import "@testing-library/jest-dom";
import App from "./App";

const database = [
  { id: 1, name: "Movie 1", url: "Director 1", ratings: 5, summary: "" },
  { id: 2, name: "Movie 2", url: "Director 2", ratings: 4, summary: "" },
  { id: 3, name: "Movie 3", url: "Director 3", ratings: 3, summary: "" },
];


describe("Application", () => {
  test("should render header and card components", () => {
    render(
      <MoviesData.Provider value={{ database }}>
        <App />
      </MoviesData.Provider>
    );
    const headerElement = screen.getByTestId("header");
    const tinderCardsElement = screen.getByTestId("movie-list");

    expect(headerElement).toBeInTheDocument();
    expect(tinderCardsElement).toBeInTheDocument();
  });
});
describe("MovieList", () => {
  test("should render application content like movies list and header", () => {
    render(
      <MoviesData.Provider value={{ database }}>
        <App />
      </MoviesData.Provider>
    );

    const movieListElement = screen.getByTestId("movie-list");
    expect(movieListElement).toBeInTheDocument();

    const movieElements = screen.getAllByTestId("movie");
    expect(movieElements).toHaveLength(database.length);

    const headerTitleElement = screen.getByText("Tinder for Movies");
    expect(headerTitleElement).toBeInTheDocument();
  });
});
