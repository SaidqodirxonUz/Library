const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");
const Publisher = require("../publishers/Publisher"); // Import the Publisher model

const editBookS = async ({ id, ...changes }) => {
  const existing = await Book.findById(id);

  if (!existing) {
    throw new NotFoundError("Book Not Found.");
  }

  // Check if "publisher" field is provided and it is a string (name of the publisher)
  if (changes.publisher && typeof changes.publisher == {}) {
    // Find the publisher document by name
    const publisher = await Publisher.findOne({ name: changes.publisher });

    if (!publisher) {
      throw new NotFoundError("Publisher Not Found.");
    }

    // Update the "publisher" field with the ObjectId of the found publisher
    changes.publisher = publisher._id;
  }

  // Only allow updating specific fields in the document
  const allowedUpdates = {
    title: changes.title,
    publisher: changes.publisher,
    author: changes.author,
    copies: changes.copies,
    // Add other fields that are allowed to be updated here
  };

  // Update the document with allowed fields
  return Book.findByIdAndUpdate(id, allowedUpdates, { new: true });
};

module.exports = editBookS;
