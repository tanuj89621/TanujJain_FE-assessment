import React from "react";
import { useLocation } from "react-router-dom";

const UniversityDetailsPage = () => {
  const location = useLocation();
  const { university } = location.state;

  return (
    <div className="university-details">
      <h1>{university.name}</h1>
      <p>
        <strong>Country: </strong>
        {university.country}
      </p>
      <p>
        <strong>State/Province:</strong> {university["state-province"]}
      </p>
      <p>
        <strong>Website: </strong>
        <a
          href={university.web_pages[0]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {university.web_pages[0]}
        </a>
      </p>
      <p>
        <strong>Domains:</strong> {university.domains.join(", ")}
      </p>
    </div>
  );
};

export default UniversityDetailsPage;
