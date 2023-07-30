const { hash } = require("bcryptjs");
const Borrower = require("./Borrower");
const { UnauthorizedError } = require("../../shared/errors"); // Make sure to provide the correct path to the shared errors file.

const addBorrowerS = async (data) => {
  // const hashedPassword = await hash(data.password, 10);
  const result = await Borrower.create({ ...data });

  return result;
};
module.exports = addBorrowerS;
