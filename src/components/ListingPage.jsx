import { useState, useEffect } from "react";
import { getUniversityData } from "../controllers/universityController";
import Loader from "./Loader";
import NavBar from "./NavBar";
import ListingTable from "./ListingTable";
import Error from "./Error";

function ListingPage() {
  const [universitiesData, setUniversitiesData] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  const fetchData = async () => {
    try {
      setUniversitiesData({ ...universitiesData, isLoading: true });
      const universityData = await getUniversityData();
      setUniversitiesData({
        universities: universityData,
        isError: false,
        isLoading: false,
      });
      setFilteredUniversities(universityData);
    } catch (error) {
      setUniversitiesData({
        universities: [],
        isError: true,
        isLoading: false,
      });
      setFilteredUniversities([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
    setFilteredUniversities([
      ...universities.filter((university) =>
        university.name.toLowerCase().includes(searchKeyword)
      ),
    ]);
  };

  const handleSortClick = () => {
    if (sortAscending) {
      setFilteredUniversities([
        ...filteredUniversities.sort((a, b) => {
          return a.name.localeCompare(b.name);
        }),
      ]);
    } else {
      setFilteredUniversities([
        ...filteredUniversities.sort((a, b) => {
          return b.name.localeCompare(a.name);
        }),
      ]);
    }
    setSortAscending((sort) => {
      return !sort;
    });
  };

  const handleDeleteClick = (name) => {
    const remainingUniversities = [
      ...filteredUniversities.filter((university) => university.name !== name),
    ];
    setFilteredUniversities(remainingUniversities);
    localStorage.setItem(
      "universityData",
      JSON.stringify(remainingUniversities)
    );
  };

  const { universities, isLoading, isError } = universitiesData;
  if (isLoading) {
    return <Loader />;
  } else if (isError) {
    return <Error />;
  }
  return (
    <>
      <NavBar
        searchKeyword={searchKeyword}
        handleInputChange={handleInputChange}
        handleSortClick={handleSortClick}
        sortAscending={sortAscending}
      />

      <ListingTable
        universities={filteredUniversities}
        handleDeleteClick={(name) => handleDeleteClick(name)}
      />
    </>
  );
}

export default ListingPage;
