const buildVehicleFilter = (query) => {
  const filter = {};

  if (query.make) {
    filter.make = { $regex: query.make, $options: "i" };
  }

  if (query.model) {
    filter.model = { $regex: query.model, $options: "i" };
  }

  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

  // Always exclude soft-deleted vehicles from normal listings/searches
  filter.isDeleted = { $ne: true };

  return filter;
};

module.exports = buildVehicleFilter;