// const { NotFoundError } = require("../../shared/errors");
// const Admin = require("./Admin");

// const allAdmins = async ({ id }) => {
//   try {
//     const admin = await Admin.find(id);
//     if (!admin) {
//       throw new NotFoundError("Admin Not Found.");
//     }

//     return admin;
//   } catch (error) {
//     // Handle any potential errors that might occur during the query or population.
//     throw error;
//   }
// };

// module.exports = allAdmins;
const { NotFoundError } = require("../../shared/errors");
const Admin = require("./Admin");

const allAdmins = async (query) => {
  try {
    const { q, sort, filters, page, limit } = query || {};

    const searchQuery = {};
    const sortOptions = {};
    const paginationOptions = {};

    // Search
    if (q) {
      searchQuery.first_name = { $regex: q, $options: "i" };
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

    // Fetch admins based on the query
    const admins = await Admin.find(searchQuery)
      .sort(sortOptions)
      .skip(paginationOptions.skip)
      .limit(paginationOptions.limit)
      .lean()
      .exec();

    // Fetch total count of admins for pagination information
    const totalAdmins = await Admin.countDocuments(searchQuery);

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalAdmins / itemsPerPage);

    return {
      admins,
      page: currentPage,
      totalPages,
      totalItems: totalAdmins,
    };
  } catch (error) {
    // Handle any potential errors that might occur during the query.
    throw error;
  }
};

module.exports = allAdmins;
