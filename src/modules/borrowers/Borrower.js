const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema(
  {
    full_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    adress: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    phone: {
      type: mongoose.SchemaTypes.String,
      unique: true,
      required: true,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    permission: {
      type: mongoose.SchemaTypes.Boolean,
      default: true,
    },
    loan: {
      type: [mongoose.SchemaTypes.ObjectId],
      default: [],
      ref: "Loan",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Borrower = mongoose.model("Borrower", borrowerSchema);

module.exports = Borrower;
