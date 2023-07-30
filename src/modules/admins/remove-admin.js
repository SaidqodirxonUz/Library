const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const removeAdmin = async ({ id }) => {
  const existing = await Admin.findById(id);

  if (!existing) {
    throw new NotFoundError("Admin Not Found.");
  }

  // Set the is_deleted flag to true to mark the admin as deleted
  existing.is_deleted = true;

  // Save the changes to the admin document in the database
  await existing.save();

  // Return the deleted admin if needed, or just return a success message
  return existing;
};

module.exports = removeAdmin;
