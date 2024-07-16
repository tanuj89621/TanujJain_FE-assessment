export const fetchUniversityData = async function () {
  try {
    const result = await fetch(
      "http://universities.hipolabs.com/search?country=United%20Arab%20Emirates"
    );
    const data = await result.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCachedData = function () {
  return JSON.parse(localStorage.getItem("universityData"));
};

export const setCachedData = function (data) {
  localStorage.setItem("universityData", JSON.stringify(data));
};
