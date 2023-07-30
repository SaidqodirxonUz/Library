const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const removeBookS = async ({ id }) => {
  const existing = await Book.findById(id);

  if (!existing) {
    throw new NotFoundError("Book Not Found.");
  }

  // Set the is_deleted flag to true to mark the Book as deleted
  existing.is_deleted = true;

  // Save the changes to the Book document in the database
  await existing.save();

  // Return the deleted Book if needed, or just return a success message
  return existing;
};

module.exports = removeBookS;
