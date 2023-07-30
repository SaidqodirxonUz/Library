const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const editBorrowerS = async ({ id, ...changes }) => {
  const existing = await Borrower.findById(id);

  if (!existing) {
    throw new NotFoundError("Borrower Not Found.");
  }

  // Only allow updating specific fields in the document
  const allowedUpdates = {
    full_name: changes.full_name,
    address: changes.address,
    phone: changes.phone,
    // Add other fields that are allowed to be updated here
  };

  // Update the document with allowed fields
  return Borrower.findByIdAndUpdate(id, allowedUpdates, { new: true });
};

module.exports = editBorrowerS;
