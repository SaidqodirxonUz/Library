const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    // permission: {
    //   type: mongoose.SchemaTypes.Boolean,
    //   default: true,
    // },
    // loan: {
    //   type: [mongoose.SchemaTypes.ObjectId],
    //   default: [],
    //   ref: "Loan",
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
