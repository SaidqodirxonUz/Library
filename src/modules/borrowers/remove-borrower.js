const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const removeBorrower = async ({ id }) => {
  const existing = await Borrower.findById(id);

  if (!existing) {
    throw new NotFoundError("Borrower Not Found.");
  }

  // Set the is_deleted flag to true to mark the Borrower as deleted
  existing.is_deleted = true;

  // Save the changes to the Borrower document in the database
  await existing.save();

  // Return the deleted Borrower if needed, or just return a success message
  return existing;
};

module.exports = removeBorrower;
