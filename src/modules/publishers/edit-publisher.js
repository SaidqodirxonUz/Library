const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const editPublisherS = async ({ id, ...changes }) => {
  const existing = await Publisher.findById(id);

  if (!existing) {
    throw new NotFoundError("Publisher Not Found.");
  }

  // Only allow updating specific fields in the document
  const allowedUpdates = {
    name: changes.name,
    address: changes.address,
    phone: changes.phone,
    // Add other fields that are allowed to be updated here
  };

  // Update the document with allowed fields
  return Publisher.findByIdAndUpdate(id, allowedUpdates, { new: true });
};

module.exports = editPublisherS;
