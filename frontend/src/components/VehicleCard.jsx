import React from "react";
import { Edit2, Trash2, RefreshCw } from "lucide-react";

/**
 * Helper to build an absolute URL for local server uploads
 * or return the original URL if hosted externally (e.g., Cloudinary/S3).
 */
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // External image link (http/https)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Local server path resolution
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace("/api", "")
    : "http://localhost:5000";

  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API_BASE_URL}${cleanPath}`;
};

export default function VehicleCard({ vehicle, onEdit, onDelete, onRestock }) {
  const { make, model, year, price, stock, image, type } = vehicle;

  // Fallback image placeholder
  const placeholderImage =
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600";

  return (
    <div className="bg-white border border-ink/10 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between hover:border-amber/50 transition-all">
      <div>
        {/* Image Container */}
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={getImageUrl(image) || placeholderImage}
            alt={`${make} ${model}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Gracefully handle broken image URLs
              e.currentTarget.onerror = null;
              e.currentTarget.src = placeholderImage;
            }}
          />
          {type && (
            <span className="absolute top-2 right-2 bg-ink/80 text-paper text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs backdrop-blur-xs">
              {type}
            </span>
          )}
        </div>

        {/* Details Section */}
        <div className="p-4">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-display text-lg uppercase text-ink">
              {year} {make} {model}
            </h3>
          </div>

          <p className="text-amber-dark font-semibold text-base mb-3">
            ${price ? price.toLocaleString() : "N/A"}
          </p>

          <div className="flex items-center justify-between text-xs text-steel border-t border-ink/10 pt-3 font-mono">
            <span>Stock Status:</span>
            <span
              className={`font-semibold ${
                stock > 0 ? "text-emerald-600" : "text-rust"
              }`}
            >
              {stock > 0 ? `${stock} available` : "Out of stock"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-3 gap-2">
        <button
          onClick={() => onEdit(vehicle)}
          className="flex items-center justify-center gap-1 text-xs border border-ink/15 text-ink hover:bg-slate-50 py-1.5 rounded-sm transition-colors"
          title="Edit Details"
        >
          <Edit2 size={14} />
          <span>Edit</span>
        </button>

        <button
          onClick={() => onRestock(vehicle)}
          className="flex items-center justify-center gap-1 text-xs border border-ink/15 text-ink hover:bg-slate-50 py-1.5 rounded-sm transition-colors"
          title="Restock Inventory"
        >
          <RefreshCw size={14} />
          <span>Stock</span>
        </button>

        <button
          onClick={() => onDelete(vehicle)}
          className="flex items-center justify-center gap-1 text-xs border border-red-200 text-red-600 hover:bg-red-50 py-1.5 rounded-sm transition-colors"
          title="Delete Vehicle"
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}