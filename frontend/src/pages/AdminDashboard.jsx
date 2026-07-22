import { useState, useEffect } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import VehicleForm from "../components/VehicleForm";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingVehicle, setEditingVehicle] = useState(null); // null = closed, {} = adding, {...} = editing
  const [showForm, setShowForm] = useState(false);

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

  const openAddForm = () => {
    setEditingVehicle(null);
    setShowForm(true);
  };

  const openEditForm = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleFormSubmit = async (formData) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    if (editingVehicle) {
      await api.put(`/vehicles/${editingVehicle._id}`, formData, config);
    } else {
      await api.post("/vehicles", formData, config);
    }
    setShowForm(false);
    fetchVehicles();
  };

  const handleDelete = async (vehicleId) => {
    if (!window.confirm("Delete this vehicle permanently?")) return;
    try {
      await api.delete(`/vehicles/${vehicleId}`);
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed.");
    }
  };

  const handleRestock = async (vehicleId) => {
    const amount = window.prompt("Restock quantity to add:", "1");
    if (!amount || isNaN(amount)) return;
    try {
      await api.post(`/vehicles/${vehicleId}/restock`, {
        quantity: Number(amount),
      });
      fetchVehicles();
    } catch (err) {
      setError(err.response?.data?.message || "Restock failed.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl uppercase">
          Inventory Management
        </h1>
        <button
          onClick={openAddForm}
          className="bg-amber hover:bg-amber-dark text-ink font-semibold uppercase tracking-wide text-xs px-4 py-2.5 rounded-sm transition-colors"
        >
          + Add Vehicle
        </button>
      </div>

      <SearchBar onSearch={fetchVehicles} onReset={() => fetchVehicles()} />

      {error && (
        <div className="bg-rust/10 border border-rust/30 text-rust text-sm rounded-sm px-3 py-2 my-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-steel mt-6">Loading vehicles...</p>
      ) : vehicles.length === 0 ? (
        <p className="text-steel mt-6">No vehicles found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onEdit={openEditForm}
              onDelete={handleDelete}
              onRestock={handleRestock}
            />
          ))}
        </div>
      )}

      {showForm && (
        <VehicleForm
          initial={editingVehicle}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}
