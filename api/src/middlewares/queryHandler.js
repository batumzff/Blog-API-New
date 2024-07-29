"use strict";

module.exports = (req, res, next) => {
  let { filter, search, sort, limit, page, skip } = req.query;

  filter = filter || {}; //! URL?filter[key1]=value1&filter[key2]=value2
  sort = sort || {}; //! URL?sort[key1]=asc&sort[key2]=desc (asc: A->Z - desc: Z->A)

  search = search || {}; //! URL?search[key1]=value1&search[key2]=value2
  for (let key in search) search[key] = { $regex: search[key], $options: "i" };

  limit = Number(limit); //! URL?page=1&limit=10
  limit = limit > 0 ? limit : Number(process.env?.PAGE_SIZE);

  page = page > 0 ? page - 1 : 0; //! In Backend page must be started with 0

  //! to make function dynamic:

  res.getModelList = async (Model, customFilter = {}, populate = null) => {
    const filtersAndSearch = { ...filter, ...search, ...customFilter };
    return await Model.find(filtersAndSearch)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  //! Details:

  res.getModelListDetails = async (Model, customFilter = {}) => {
    const filtersAndSearch = { ...filter, ...search, ...customFilter };

    const data = await Model.find(filtersAndSearch);

    let details = {
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous_page: page > 0 ? page : false,
        current_page: page + 1,
        next_page: page + 2,
        total_pages: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next_page =
      details.pages.next_page > details.pages.total_pages
        ? false
        : details.pages.next_page;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };
  next();
};
