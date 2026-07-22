import { useState, useEffect } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import PurchaseForm from "../components/PurchaseForm";
import BookingConfirmation from "../components/BookingConfirmation";
import CarLoader from "../components/CarLoader";

export default function UserDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [purchasingVehicle, setPurchasingVehicle] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const fetchVehicles = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const hasFilters = Object.keys(filters).length > 0;
      const endpoint = hasFilters ? "/vehicles/search" : "/vehicles";
      const res = await api.get(endpoint, { params: filters });
      setVehicles(res.data.vehicles);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const openPurchaseForm = (vehicleId) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    setPurchasingVehicle(vehicle);
  };

  const handlePurchaseSubmit = async (buyerDetails) => {
    const res = await api.post(
      `/vehicles/${purchasingVehicle._id}/purchase`,
      buyerDetails,
    );
    setPurchasingVehicle(null);
    setConfirmation({ booking: res.data.booking, vehicle: res.data.vehicle });
    await fetchVehicles();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl uppercase mb-6">
        Available Vehicles
      </h1>

      <SearchBar onSearch={fetchVehicles} onReset={() => fetchVehicles()} />

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <CarLoader message="Loading vehicles..." />
      ) : vehicles.length === 0 ? (
        <p className="text-steel mt-6">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onPurchase={openPurchaseForm}
            />
          ))}
        </div>
      )}

      {purchasingVehicle && (
        <PurchaseForm
          vehicle={purchasingVehicle}
          onSubmit={handlePurchaseSubmit}
          onCancel={() => setPurchasingVehicle(null)}
        />
      )}

      {confirmation && (
        <BookingConfirmation
          booking={confirmation.booking}
          vehicle={confirmation.vehicle}
          onClose={() => setConfirmation(null)}
        />
      )}
    </div>
  );
}
