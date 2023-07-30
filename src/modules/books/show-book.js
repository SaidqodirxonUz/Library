const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const showBookS = async ({ id }) => {
  try {
    // Kitobni ID orqali topamiz
    const book = await Book.findById(id)
      .populate("publisher", "name")
      .populate("author", "name")
      .exec();

    if (!book) {
      throw new NotFoundError("Book Not Found.");
    }

    return book;
  } catch (error) {
    // Handle errors
    throw error;
  }
};

module.exports = showBookS;
