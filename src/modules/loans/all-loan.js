const Loan = require("./Loan");
const Book = require("../books/Book");

const getRentedBookS = async (req, res, next) => {
  try {
    const { q, sort, filters, page, limit } = req.query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    // (If you have any specific search requirements for rented books, you can implement them here)

    // Filtering
    if (filters && filters.admin) {
      searchQuery.admin = filters.admin;
    }
    if (filters && filters.book) {
      searchQuery.book = filters.book;
    }

    // Sorting
    if (sort && sort.by) {
      sortOptions[sort.by] = sort.order === "desc" ? -1 : 1;
    }

    // Pagination
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    paginationOptions.skip = (currentPage - 1) * itemsPerPage;
    paginationOptions.limit = itemsPerPage;

    // Find the rented books with sorting and pagination
    const rentedBooks = await Loan.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .populate("book")
      .populate("borrower")
      .lean()
      .exec();

    // Fetch total count of rented books for pagination information
    const totalRentedBooks = await Loan.countDocuments(searchQuery);

    // Add the rentedBooks and pagination details to the request object
    return (req.rentedBooks = {
      rentedBooks,
      page: currentPage,
      totalPages: Math.ceil(totalRentedBooks / itemsPerPage),
      totalItems: totalRentedBooks,
    });

    next();
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    console.error("An error occurred while fetching rented books:", error);
    next(error);
  }
};

module.exports = getRentedBookS;
