const { NotFoundError } = require("../../shared/errors");
const Book = require("./Book");

const allBookS = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      searchQuery.title = { $regex: q, $options: "i" };
    }

    // Filtering
    if (filters && filters.is_deleted) {
      searchQuery.is_deleted = filters.is_deleted === "true";
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

    // Fetch books based on the query
    const booksQuery = Book.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit);

    // Populate author, publisher, and loan fields
    booksQuery.populate("author", "name"); // Change "name" to the appropriate field in the Author model.
    booksQuery.populate("publisher", "name"); // Change "name" to the appropriate field in the Publisher model.

    const books = await booksQuery.exec();

    // Fetch total count of books for pagination information
    const totalBooks = await Book.countDocuments(searchQuery);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalBooks / itemsPerPage);

    return {
      books,
      page: currentPage,
      totalPages,
      totalItems: totalBooks,
    };
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    throw error;
  }
};

module.exports = allBookS;
