const { UnauthorizedError } = require("../../shared/errors");
const Book = require("./Book");
const mongoose = require("mongoose");

const addBookS = async (data) => {
  // Validate and convert the "publisher" and "author" strings to ObjectId
  const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

  if (!isValidObjectId(data.publisher) || !isValidObjectId(data.author)) {
    throw new Error("Invalid publisher or author ID.");
  }

  const publisherId = new mongoose.Types.ObjectId(data.publisher);
  const authorId = new mongoose.Types.ObjectId(data.author);

  const result = await Book.create({
    ...data,
    publisher: publisherId,
    author: authorId,
  });

  return result;
};

module.exports = addBookS;
