import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

// Type for form data
interface FormData {
  method: "id" | "email";
  value: string;
}

// Type for message
interface Message {
  type: "success" | "danger";
  text: string;
}

export default function DeleteUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    method: "id",
    value: "",
  });

  const [message, setMessage] = useState<Message | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "User deleted successfully!" });
        setTimeout(() => navigate("/AdminMain"), 1500);
      } else {
        setMessage({
          type: "danger",
          text: data.message || "Failed to delete User.",
        });
      }
    } catch (err) {
      console.error("Error deleting User:", err);
      setMessage({
        type: "danger",
        text: "An error occurred while deleting the User.",
      });
    }
  };

  const getLabel = (): string => {
    return formData.method === "email" ? "Email" : "User ID";
  };

  const getPlaceholder = (): string => {
    return formData.method === "email"
      ? "Enter exact user name"
      : "Enter numeric UserID";
  };

  return (
    <div className="bg-light">
      <Header />
      <MenuBar />

      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">Delete a User</h1>

          {/* Message display */}
          {message && (
            <div className={`alert alert-${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
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
                <option value="id">User ID</option>
                <option value="email">Email</option>
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

      <Footer />
    </div>
  );
}
