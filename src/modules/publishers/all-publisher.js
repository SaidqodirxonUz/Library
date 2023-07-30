const { NotFoundError } = require("../../shared/errors");
const Publisher = require("./Publisher");

const allPublisherS = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      searchQuery.name = { $regex: q, $options: "i" };
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

    // Fetch Publisher based on the query
    const publisher = await Publisher.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    // Fetch total count of Publisher for pagination information
    const totalPublisher = await Publisher.countDocuments(searchQuery);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalPublisher / itemsPerPage);

    return {
      publisher,
      page: currentPage,
      totalPages,
      totalItems: totalPublisher,
    };
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    throw error;
  }
};

module.exports = allPublisherS;
