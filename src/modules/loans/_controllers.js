const rentBookS = require("./add-rent-book");
const getRentedBookS = require("./all-loan");
const getRentedBookById = require("./show-loan");

const rentBook = async (req, res, next) => {
  try {
    await rentBookS(req, res, next);

    const { loan } = req;

    res.status(200).json({ success: true, loan });
  } catch (error) {
    next(error);
  }
};

const getRentedBooks = async (req, res, next) => {
  try {
    await getRentedBookS(req, res, next);
    const { rentedBooks } = req;

    return res.status(200).json(rentedBooks);
  } catch (error) {
    // Handle any errors that occurred during the process
    next(error);
  }
};

const showRentedBooks = async (req, res, next) => {
  try {
    // await getRentedBookById(req, res, next);
    const { result } = req.body;

    console.log({ result: req.body }); // Access result from the request object after the middleware

    if (!{ result: req.body }) {
      return res.status(404).json({ message: "Loans not found" });
    }

    return res.json({ result: req.body });
  } catch (error) {
    // Handle any potential errors that might occur during the process.
    console.error("An error occurred while fetching the rented book:", error);
    next(error);
  }
};

module.exports = {
  rentBook,
  getRentedBooks,
  showRentedBooks,
};
