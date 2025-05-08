const axios = require("axios");
const fs = require("fs");
const path = require("path");
const LAUREATES_URL = process.env.LAUREATES_URL;
const laureatesFilePath = path.join(__dirname, "../db/laureate.json");

const fetchLaureatesData = async () => {
  try {
    const response = await axios.get(LAUREATES_URL);
    const data = await response.data;
    fs.writeFileSync(laureatesFilePath, JSON.stringify(data, null, 2));
    return data.laureates;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
};

const readLaureatesData = async () => {
  try {
    if (fs.existsSync(laureatesFilePath)) {
      const raw = fs.readFileSync(laureatesFilePath, "utf-8");

      if (!raw.trim()) {
        return await fetchLaureatesData();
      }

      const parsed = JSON.parse(raw);
      if (!parsed.laureates || !Array.isArray(parsed.laureates)) {
        return await fetchLaureatesData();
      }

      return parsed.laureates;
    } else {
      return await fetchLaureatesData();
    }
  } catch (error) {
    console.error("Error reading laureates data:", error);
    throw error;
  }
};

module.exports = { readLaureatesData };
