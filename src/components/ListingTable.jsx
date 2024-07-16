import React from "react";
import UniversityItem from "./UniversityItem";

function ListingTable({ universities, handleDeleteClick }) {
  return (
    <div className="main--section-container">
      <main className="main--section">
        {universities.length === 0 ? (
          <div className="no-data--container">No Data Found!!</div>
        ) : (
          universities.map((university) => {
            return (
              <UniversityItem
                university={university}
                key={university.name}
                handleDeleteClick={handleDeleteClick}
              />
            );
          })
        )}
      </main>
    </div>
  );
}

export default ListingTable;
