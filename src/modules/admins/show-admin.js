const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const showAdmin = async ({ id }) => {
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      throw new NotFoundError("Admin Not Found.");
    }

    return admin;
  } catch (error) {
    // Handle any potential errors that might occur during the query or population.
    throw error;
  }
};

module.exports = showAdmin;
