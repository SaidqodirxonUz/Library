const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Borrower",
      required: true,
    },
    out_date: {
      type: Date,
      default: Date.now,
    },
    due_date: {
      type: Date,
      required: true,
    },
    return_date: {
      type: Date,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
