// PageNotFound.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PageNotFound from "./PageNotFound";

test("renders the PageNotFound component correctly", () => {
  render(
    <Router>
      <PageNotFound />
    </Router>
  );

  // Check if the 404 message is rendered
  expect(screen.getByText("404: Page Not Found")).toBeInTheDocument();

  // Check if the description text is rendered
  expect(
    screen.getByText("Oops! The page you are looking for does not exist.")
  ).toBeInTheDocument();

  // Check if the "Go back to Home" link is rendered
  expect(screen.getByText("Go back to Home")).toBeInTheDocument();
});
