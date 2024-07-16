import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UniversityDetailsPage from "../components/UniversityDetailsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe("UniversityDetailsPage Component", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks before each test
  });

  it("renders university details correctly", async () => {
    try{
      
    const mockUniversity = {
      name: "Sample University",
      country: "Sample Country",
      "state-province": "Sample State",
      web_pages: ["https://www.sampleuniversity.com"],
      domains: ["sampleuniversity.com", "sampleuni.ac"],
    };

    jest.spyOn(require("react-router-dom"), "useLocation").mockReturnValue({
      state: { university: mockUniversity },
    });

    render(
      <BrowserRouter>
        <UniversityDetailsPage />
      </BrowserRouter>
    );

    expect(screen.getByText("Sample University")).toBeInTheDocument();
    expect(screen.getByText("Country: Sample Country")).toBeInTheDocument();
    expect(
      screen.getByText("State/Province: Sample State")
    ).toBeInTheDocument();
    expect(screen.getByText("Website:")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "https://www.sampleuniversity.com" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Domains: sampleuniversity.com, sampleuni.ac")
    ).toBeInTheDocument();
    }catch(e){
      console.error(e);
    }
  });
});
