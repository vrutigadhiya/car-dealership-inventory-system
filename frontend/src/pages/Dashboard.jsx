import { useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await api.get("/vehicles");
        console.log(res.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </div>
  );
}