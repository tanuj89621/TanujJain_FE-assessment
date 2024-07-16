import {
  fetchUniversityData,
  getCachedData,
  setCachedData,
} from "../model/universityModel";

export const getUniversityData = async function () {
  try {
    const universityData = await fetchUniversityData();
    setCachedData(universityData);
    return universityData;
  } catch (error) {
    const cachedUniversityData = getCachedData();
    if (cachedUniversityData) {
      return cachedUniversityData;
    } else {
      throw error;
    }
  }
};
