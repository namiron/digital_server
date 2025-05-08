const { readLaureatesData } = require("../controllers/laureates.controllers");

const categories = async (req, res) => {
  try {
    const laureates = await readLaureatesData();
    const categories = new Set();

    laureates.forEach((laureate) => {
      laureate.prizes.forEach((prize) => {
        categories.add(prize.category);
      });
    });

    res.status(200).json([...categories]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving categories" });
  }
};

const category = async (req, res) => {
  const { category } = req.params;
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const laureates = await readLaureatesData();

    const filteredLaureates = laureates.filter((laureate) => laureate.prizes.some((prize) => prize.category === category));

    const paginatedLaureates = filteredLaureates.slice(offset, offset + limit);

    res.status(200).json({
      total: filteredLaureates.length,
      count: paginatedLaureates.length,
      data: paginatedLaureates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving laureates" });
  }
};

module.exports = { categories, category };
