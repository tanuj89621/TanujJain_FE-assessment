import React from "react";
import { render, screen } from "@testing-library/react";
import ListingTable from "../components/ListingTable";
import { BrowserRouter } from "react-router-dom"; // Import MemoryRoute

describe("ListingTable Component", () => {
  const universities = [
    { name: "University A", country: "Country A" },
    { name: "University B", country: "Country B" },
  ];

  const handleDeleteClick = jest.fn();

  it("renders table header and universities correctly", () => {
    render(
      <BrowserRouter>
        <ListingTable
          universities={universities}
          handleDeleteClick={handleDeleteClick}
        />
      </BrowserRouter>
    );

    // Check if table headers are rendered
    expect(screen.getByText("University Name")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();

    // Check if university items are rendered
    universities.forEach((university) => {
      expect(screen.getByText(university.name)).toBeInTheDocument();
      expect(screen.getByText(university.country)).toBeInTheDocument();
    });
  });

  it("renders no data message when universities array is empty", () => {
    render(
      <ListingTable universities={[]} handleDeleteClick={handleDeleteClick} />
    );

    expect(screen.getByText("No Data Found!!")).toBeInTheDocument();
  });
});
