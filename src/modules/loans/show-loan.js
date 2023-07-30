const Loan = require("./Loan");
const Book = require("../books/Book");

// Middleware function to get a rented book by ID and populate related fields
const getRentedBookById = async (req, res, next) => {
  try {
    const loanId = req.params.id;
    console.log(loanId);

    const result = await Loan.findById(loanId)
      .populate({
        path: "book",
        populate: [
          { path: "author", model: "Author" }, // Assuming the author model is "Author"
          { path: "publisher", model: "Publisher" },
        ],
      })
      .populate("admin")
      .populate("borrower")
      .lean()
      .exec();

    req.body = result; // Store the fetched rentedBook in the request object
    next();
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    console.error("An error occurred while fetching the rented book:", error);
    next(error);
  }
};

module.exports = { getRentedBookById };
