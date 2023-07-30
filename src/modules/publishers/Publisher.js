const mongoose = require("mongoose");

const publisherSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    adress: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phone: {
      type: mongoose.SchemaTypes.String,
      unique: false,
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

const Publisher = mongoose.model("Publisher", publisherSchema);

module.exports = Publisher;
