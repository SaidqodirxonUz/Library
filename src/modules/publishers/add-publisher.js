const { hash } = require("bcryptjs");
const Publisher = require("./Publisher");
const { UnauthorizedError } = require("../../shared/errors"); // Make sure to provide the correct path to the shared errors file.

const addPublisherS = async (data) => {
  // const hashedPassword = await hash(data.password, 10);
  const result = await Publisher.create({ ...data });

  return result;
};
module.exports = addPublisherS;
