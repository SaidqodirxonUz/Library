const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const showPublisherS = async ({ id }) => {
  try {
    const publisher = await Publisher.findById(id);
    if (!publisher) {
      throw new NotFoundError("publisher Not Found.");
    }

    return publisher;
  } catch (error) {
    // Handle any potential errors that might occur during the query or population.
    throw error;
  }
};

module.exports = showPublisherS;
