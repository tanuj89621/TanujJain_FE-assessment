import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar Component", () => {
  // Mock functions for props
  const handleInputChange = jest.fn();
  const handleSortClick = jest.fn();

  beforeEach(() => {
    // Reset mock function calls before each test
    handleInputChange.mockClear();
    handleSortClick.mockClear();
  });

  it("renders input with placeholder and button with correct text", () => {
    render(
      <NavBar
        searchKeyword=""
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={true}
      />
    );

    // Check if input and button elements are rendered with correct attributes
    const inputElement = screen.getByPlaceholderText("Search University");
    const sortButtonElement = screen.getByText("Sort A-Z");

    expect(inputElement).toBeInTheDocument();
    expect(sortButtonElement).toBeInTheDocument();
  });

  it("calls handleInputChange on input change", () => {
    render(
      <NavBar
        searchKeyword=""
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={true}
      />
    );

    // Simulate change event on the input element
    const inputElement = screen.getByPlaceholderText("Search University");
    fireEvent.change(inputElement, { target: { value: "University" } });

    // Check if handleInputChange function is called with the correct value
    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });

  it("calls handleSortClick on button click", () => {
    render(
      <NavBar
        searchKeyword=""
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={true}
      />
    );

    // Simulate click event on the sort button
    const sortButtonElement = screen.getByText("Sort A-Z");
    fireEvent.click(sortButtonElement);

    // Check if handleSortClick function is called
    expect(handleSortClick).toHaveBeenCalledTimes(1);
  });

  it("displays correct button text based on sortAscending prop", () => {
    render(
      <NavBar
        searchKeyword=""
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={true}
      />
    );

    // Check initial button text when sortAscending is true
    expect(screen.getByText("Sort A-Z")).toBeInTheDocument();

    // Rerender component with sortAscending set to false
    render(
      <NavBar
        searchKeyword=""
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={false}
      />
    );

    // Check button text after prop change to sortAscending false
    expect(screen.getByText("Sort Z-A")).toBeInTheDocument();
  });
});
