const checkVehicleStock = (vehicle) => {
  if (vehicle.quantity <= 0) {
    throw new Error("Vehicle is out of stock");
  }
};

module.exports = checkVehicleStock;