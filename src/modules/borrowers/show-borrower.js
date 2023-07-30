const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const showBorrowerS = async ({ id }) => {
  try {
    const borrower = await Borrower.findById(id);
    if (!borrower) {
      throw new NotFoundError("borrower Not Found.");
    }

    return borrower;
  } catch (error) {
    // Handle any potential errors that might occur during the query or population.
    throw error;
  }
};

module.exports = showBorrowerS;
