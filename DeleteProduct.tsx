import React, { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

interface FormData {
  method: "id" | "name" | "type";
  value: string;
}

interface Message {
  type: "success" | "danger";
  text: string;
}

export default function DeleteProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    method: "id",
    value: "",
  });

  const [message, setMessage] = useState<Message | null>(null);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let url = "";

    switch (formData.method) {
      case "id":
        url = `http://localhost:3000/products/${formData.value}`;
        break;
      case "name":
        url = `http://localhost:3000/products/name/${encodeURIComponent(
          formData.value
        )}`;
        break;
      case "type":
        url = `http://localhost:3000/products/type/${encodeURIComponent(
          formData.value
        )}`;
        break;
      default:
        setMessage({
          type: "danger",
          text: `Deletion by ${formData.method} not supported yet.`,
        });
        return;
    }

    try {
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage({
          type: "danger",
          text: data.message || "Failed to delete product.",
        });
        return;
      }

      setMessage({ type: "success", text: "Product deleted successfully!" });
      setTimeout(() => navigate("/AdminMain"), 1500);
    } catch (err) {
      console.error("Error deleting product:", err);
      setMessage({
        type: "danger",
        text: "An error occurred while deleting the product.",
      });
    }
  };

  // Dynamic label and placeholder based on delete method
  const getLabel = () => {
    switch (formData.method) {
      case "name":
        return "Name";
      case "type":
        return "Type";
      default:
        return "Product ID";
    }
  };

  const getPlaceholder = () => {
    switch (formData.method) {
      case "name":
        return "Enter exact product name";
      case "type":
        return "Enter product type";
      default:
        return "Enter numeric ProductID";
    }
  };

  return (
    <div className="bg-light">
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">
            Delete a Product
          </h1>

          {/* Message display */}
          {message && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm"
          >
            {/* Delete method */}
            <div className="mb-3">
              <label htmlFor="deleteMethod" className="form-label">
                Delete by
              </label>
              <select
                id="deleteMethod"
                name="method"
                className="form-select"
                value={formData.method}
                onChange={handleChange}
              >
                <option value="id">Product ID</option>
                <option value="name">Name</option>
                <option value="type">Type</option>
              </select>
            </div>

            {/* Input field */}
            <div className="mb-3">
              <label htmlFor="valueInput" className="form-label">
                {getLabel()}
              </label>
              <input
                type={formData.method === "id" ? "number" : "text"}
                id="valueInput"
                name="value"
                value={formData.value}
                placeholder={getPlaceholder()}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Buttons */}
            <div className="text-end">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                Cancel
              </Link>
              <button type="submit" className="btn-pink">
                Delete
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
