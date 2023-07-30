const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../shared/errors");
const config = require("../../shared/config");
const Admin = require("./Admin");

const loginAdmin = async ({ username, password }) => {
  const existing = await Admin.findOne({ username });

  if (!existing) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const match = await compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret);

  const decoded = jwt.verify(token, config.jwt.secret, {
    ignoreExpiration: false,
  });

  const decodedToken = decoded.user;

  const admin = await Admin.findById(decodedToken.id);

  const isDeleted = admin.is_deleted;
  if (isDeleted) {
    throw new UnauthorizedError("Forbidden");
  }

  return token;
};

module.exports = loginAdmin;
