const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const removePublisherS = async ({ id }) => {
  const existing = await Publisher.findById(id);

  if (!existing) {
    throw new NotFoundError("Publisher Not Found.");
  }

  // Set the is_deleted flag to true to mark the Publisher as deleted
  existing.is_deleted = true;

  // Save the changes to the Publisher document in the database
  await existing.save();

  // Return the deleted Publisher if needed, or just return a success message
  return existing;
};

module.exports = removePublisherS;
