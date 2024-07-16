import {
  fetchUniversityData,
  getCachedData,
  setCachedData,
} from "../model/universityModel.js";

global.fetch = jest.fn();

describe("universityModel", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  describe("fetchUniversityData", () => {
    it("should fetch university data successfully", async () => {
      const mockData = [{ name: "University of Example", country: "UAE" }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const data = await fetchUniversityData();
      expect(data).toEqual(mockData);
    });

    it("should throw an error if the fetch throws an error", async () => {
      fetch.mockRejectedValueOnce(new Error("Fetch failed"));

      await expect(fetchUniversityData()).rejects.toThrow("Fetch failed");
    });
  });

  describe("getCachedData", () => {
    it("should return parsed data from localStorage", () => {
      const mockData = [{ name: "University of Example", country: "UAE" }];
      localStorage.setItem("universityData", JSON.stringify(mockData));

      const data = getCachedData();
      expect(data).toEqual(mockData);
    });

    it("should return null if no data is in localStorage", () => {
      const data = getCachedData();
      expect(data).toBeNull();
    });
  });

  describe("setCachedData", () => {
    it("should store data in localStorage", () => {
      const mockData = [{ name: "University of Example", country: "UAE" }];
      setCachedData(mockData);

      const storedData = localStorage.getItem("universityData");
      expect(storedData).toEqual(JSON.stringify(mockData));
    });
  });
});
