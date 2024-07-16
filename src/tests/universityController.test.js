import { getUniversityData } from "../controllers/universityController.js";
import {
  fetchUniversityData,
  getCachedData,
  setCachedData,
} from "../model/universityModel";

jest.mock("../model/universityModel");

describe("getUniversityData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch university data and cache it", async () => {
    const mockData = [{ name: "University of Example", country: "UAE" }];
    fetchUniversityData.mockResolvedValue(mockData);

    const data = await getUniversityData();

    expect(fetchUniversityData).toHaveBeenCalled();
    expect(setCachedData).toHaveBeenCalledWith(mockData);
    expect(data).toEqual(mockData);
  });

  it("should return cached data if fetch fails and cached data exists", async () => {
    const mockData = [{ name: "University of Example", country: "UAE" }];
    fetchUniversityData.mockRejectedValue(new Error("Fetch failed"));
    getCachedData.mockReturnValue(mockData);

    const data = await getUniversityData();

    expect(fetchUniversityData).toHaveBeenCalled();
    expect(getCachedData).toHaveBeenCalled();
    expect(data).toEqual(mockData);
  });

  it("should throw an error if fetch fails and no cached data exists", async () => {
    fetchUniversityData.mockRejectedValue(new Error("Fetch failed"));
    getCachedData.mockReturnValue(null);

    await expect(getUniversityData()).rejects.toThrow("Fetch failed");

    expect(fetchUniversityData).toHaveBeenCalled();
    expect(getCachedData).toHaveBeenCalled();
  });
});
