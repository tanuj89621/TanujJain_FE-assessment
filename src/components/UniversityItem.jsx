import { Link } from "react-router-dom";
import { useState } from "react";
import React from "react";

function UniversityItem({ university, handleDeleteClick }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDeleteClick = async (name) => {
    setIsDeleting(true);
    // Adding settimeout so that state can be handled before component unmounts for css animation
    setTimeout(async () => {
      await handleDeleteClick(name);
    }, 300);
    setTimeout(() => {
      setIsDeleting(false);
    }, 300);
  };
  return (
    <div className={`university--item ${isDeleting ? "deleted" : ""}`}>
      <Link to={`/details/${university.name}`} state={{ university }}>
        {university.name}
      </Link>
      <p>{university.country}</p>
      <button onClick={() => onDeleteClick(university.name)}>Delete</button>
    </div>
  );
}

export default UniversityItem;
