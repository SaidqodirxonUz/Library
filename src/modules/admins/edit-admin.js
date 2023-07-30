const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");
const Joi = require("joi");

const editAdminS = async ({ id, ...changes }) => {
  try {
    // Validate changes against the patchMeSchema before making updates
    const { error, value } = patchMeSchema.body.validate(changes);

    if (error) {
      // If there is a validation error, throw a BadRequestError with the error details
      const details = error.details.map((err) => err.message).join(", ");
      throw new BadRequestError(`Validation error: ${details}`);
    }

    // Find the admin by ID or user ID (if ID is not provided) and update the specified fields
    const updatedAdmin = await Admin.findByIdAndUpdate(id, value, {
      new: true,
    });

    if (!updatedAdmin) {
      throw new NotFoundError("Admin Not Found.");
    }

    return updatedAdmin;
  } catch (error) {
    // Handle any potential errors that might occur during the update process.
    throw error;
  }
};

module.exports = editAdminS;
