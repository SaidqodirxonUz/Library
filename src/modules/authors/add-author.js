const { hash } = require("bcryptjs");
const Author = require("./Author");
const { UnauthorizedError } = require("../../shared/errors"); // Make sure to provide the correct path to the shared errors file.

const addAuthorS = async (data) => {
  // const hashedPassword = await hash(data.password, 10);
  const result = await Author.create({ ...data });

  return result;
};
module.exports = addAuthorS;
