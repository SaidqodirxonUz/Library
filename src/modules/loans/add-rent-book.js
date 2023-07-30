const { BadRequestError, NotFoundError } = require("../../shared/errors");
const Book = require("../books/Book");
const Loan = require("./Loan");
const jwt = require("jsonwebtoken");
const config = require("../../shared/config");

const rentBookS = async (req, res, next) => {
  try {
    const { bookId, borrowerId } = req.body;

    // Find the book by ID
    const book = await Book.findById(bookId).populate("loan");
    if (!book || book.is_deleted) {
      return res.status(404).json({ error: "Book Not Found." });
    }

    // Find the borrower's active loans
    const activeLoans = book.loan.filter(
      (loan) => loan.borrower.toString() === borrowerId && !loan.return_date
    );

    if (activeLoans.length >= 10) {
      return res
        .status(400)
        .json({ error: "Borrower cannot rent more than 10 books at a time." });
    }

    const authToken = req.headers.authorization;

    console.log(authToken);

    const decoded = jwt.verify(authToken, config.jwt.secret, {
      ignoreExpiration: false,
    });

    console.log(decoded);
    const decodedToken = decoded.user.id;
    console.log(decodedToken);

    if (!decodedToken) {
      return res
        .status(403)
        .json({ error: "Unauthorized. Admin IDs do not match." });
    }

    // Calculate the due date (maximal 2 months)
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 2);

    // Create the loan document
    const loan = new Loan({
      book: bookId,
      admin: decodedToken,
      borrower: borrowerId,
      due_date: dueDate,
    });

    // Save the loan and update the book's loan array
    await loan.save();
    book.loan.push(loan._id);
    await book.save();

    // Add the loan to the request object to be used in the controller
    req.loan = loan;
    next();
  } catch (error) {
    // Handle any errors that occurred during the process
    next(error);
  }
};

module.exports = rentBookS;
