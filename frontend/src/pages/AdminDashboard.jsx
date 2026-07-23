import { useState, useEffect } from "react";
import api from "../services/api";
import VehicleCard from "../components/VehicleCard";
import SearchBar from "../components/SearchBar";
import VehicleForm from "../components/VehicleForm";
import ConfirmDialog from "../components/ConfirmDialog";
import RestockModal from "../components/RestockModal";
import { useToast } from "../context/ToastContext";
import CarLoader from "../components/CarLoader";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  const [restockingVehicle, setRestockingVehicle] = useState(null);

  const { showToast } = useToast();

  const fetchVehicles = async (filters = {}) => {
    setLoading(true);
    try {
      const res = await api.get("/vehicles/mine", { params: filters });
      setVehicles(res.data.vehicles);
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load vehicles.", "error");
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

  const handleFormSubmit = async (formData) => {
    try {
      if (editingVehicle) {
        await api.put(`/vehicles/${editingVehicle._id}`, formData);
        showToast("Vehicle updated successfully");
      } else {
        await api.post("/vehicles", formData);
        showToast("Vehicle added to inventory");
      }
      setShowForm(false);
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Save failed.", "error");
      throw err;
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/vehicles/${confirmingDelete._id}`);
      showToast(`${confirmingDelete.make} ${confirmingDelete.model} deleted`);
      setConfirmingDelete(null);
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Delete failed.", "error");
      setConfirmingDelete(null);
    }
  };

  const handleRestockSubmit = async (amount) => {
    try {
      await api.post(`/vehicles/${restockingVehicle._id}/restock`, {
        quantity: amount,
      });
      showToast(`Added ${amount} to ${restockingVehicle.make} ${restockingVehicle.model}`);
      setRestockingVehicle(null);
      fetchVehicles();
    } catch (err) {
      showToast(err.response?.data?.message || "Restock failed.", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl uppercase">Inventory Management</h1>
        <button
          onClick={openAddForm}
          className="bg-amber hover:bg-amber-dark text-ink font-semibold uppercase tracking-wide text-xs px-4 py-2.5 rounded-sm transition-colors"
        >
          + Add Vehicle
        </button>
      </div>

      <SearchBar onSearch={fetchVehicles} onReset={() => fetchVehicles()} />

      {loading ? (
        <CarLoader message="Loading inventory..." />
      ) : vehicles.length === 0 ? (
        <div className="mt-10 flex flex-col items-center text-center text-steel">
          <div className="w-40 h-40 flex items-center justify-center bg-amber/10 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 10v8m10-8v8M5 6h14l1 4H4l1-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-medium mb-2 text-ink">No vehicles yet</h2>
          <p className="max-w-xl">Your inventory is empty. Add vehicles to start tracking stock, pricing, and details. You can add new vehicles individually or import them later.</p>
          <button
            onClick={openAddForm}
            className="mt-6 bg-amber hover:bg-amber-dark text-ink font-semibold uppercase tracking-wide text-xs px-4 py-2.5 rounded-sm transition-colors"
          >
            + Add your first vehicle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              vehicle={vehicle}
              onEdit={openEditForm}
              onDelete={() => setConfirmingDelete(vehicle)}
              onRestock={() => setRestockingVehicle(vehicle)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <VehicleForm
          initial={editingVehicle}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title="Delete vehicle?"
          message={`This will permanently remove ${confirmingDelete.make} ${confirmingDelete.model} from your inventory.`}
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmingDelete(null)}
        />
      )}

      {restockingVehicle && (
        <RestockModal
          vehicle={restockingVehicle}
          onSubmit={handleRestockSubmit}
          onCancel={() => setRestockingVehicle(null)}
        />
      )}
    </div>
  );
}