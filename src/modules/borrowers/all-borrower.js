const { NotFoundError } = require("../../shared/errors");
const Borrower = require("./Borrower");

const allBorrower = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      searchQuery.full_name = { $regex: q, $options: "i" };
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

    // Fetch Borrower based on the query
    const borrower = await Borrower.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    // Fetch total count of Borrower for pagination information
    const totalBorrower = await Borrower.countDocuments(searchQuery);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalBorrower / itemsPerPage);

    return {
      borrower,
      page: currentPage,
      totalPages,
      totalItems: totalBorrower,
    };
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    throw error;
  }
};

module.exports = allBorrower;
