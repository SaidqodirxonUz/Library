const { hash } = require("bcryptjs");
const Admin = require("./Admin");

const addAdmin = async (data) => {
  const hashedPassword = await hash(data.password, 10);
  const result = await Admin.create({ ...data, password: hashedPassword });

  return result;
};

module.exports = addAdmin;
