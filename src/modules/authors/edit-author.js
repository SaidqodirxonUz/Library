const { NotFoundError } = require("../../shared/errors");
const Author = require("./Author");

const editAuthorS = async ({ id, ...changes }) => {
  const existing = await Author.findById(id);

  if (!existing) {
    throw new NotFoundError("Author Not Found.");
  }

  // Only allow updating specific fields in the document
  const allowedUpdates = {
    name: changes.name,
    // address: changes.address,
    // phone: changes.phone,
    // Add other fields that are allowed to be updated here
  };

  // Update the document with allowed fields
  return Author.findByIdAndUpdate(id, allowedUpdates, { new: true });
};

module.exports = editAuthorS;
