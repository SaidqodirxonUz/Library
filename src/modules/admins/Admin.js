const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    first_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    last_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_super: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
