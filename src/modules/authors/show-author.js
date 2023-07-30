const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const showAuthorS = async ({ id }) => {
  try {
    const author = await Author.findById(id);
    if (!author) {
      throw new NotFoundError("author Not Found.");
    }

    return author;
  } catch (error) {
    // Handle any potential errors that might occur during the query or population.
    throw error;
  }
};

module.exports = showAuthorS;
