const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const removeAuthorS = async ({ id }) => {
  const existing = await Author.findById(id);

  if (!existing) {
    throw new NotFoundError("Author Not Found.");
  }

  // Set the is_deleted flag to true to mark the Author as deleted
  existing.is_deleted = true;

  // Save the changes to the Author document in the database
  await existing.save();

  // Return the deleted Author if needed, or just return a success message
  return existing;
};

module.exports = removeAuthorS;
