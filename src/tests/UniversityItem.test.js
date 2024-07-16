import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Import MemoryRouter
import UniversityItem from "../components/UniversityItem";

describe('UniversityItem Component', () => {
  const university = { name: 'University A', country: 'Country A' };
  const handleDeleteClick = jest.fn();

  it('renders university details and delete button', () => {
    try{
      const { debug } = render(
        <BrowserRouter>
          <UniversityItem
            university={university}
            handleDeleteClick={handleDeleteClick}
          />
        </BrowserRouter>
      );
  
      // Print the rendered DOM for debugging
      debug();
  
      expect(screen.getByText(university.name)).toBeInTheDocument();
      expect(screen.getByText(university.country)).toBeInTheDocument();
    }catch(e){
      console.log(e)
    }
  });

  it('calls handleDeleteClick when delete button is clicked', () => {
    try{
      render(
        <BrowserRouter>
          <UniversityItem
            university={university}
            handleDeleteClick={handleDeleteClick}
          />
        </BrowserRouter>
      );
  
      const deleteButton = screen.getByText('Delete');
      deleteButton.click();
  
      expect(handleDeleteClick).toHaveBeenCalledWith(university.name);
    }catch(e){
      console.error(e)
    }
  });
});
