import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface Message {
  type: "success" | "danger" | "warning";
  text: string;
}

export default function DeleteAppointment() {
  const navigate = useNavigate();
  const [appointmentID, setAppointmentID] = useState<string>("");
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAppointmentID(e.target.value);
  };

  // Handle delete submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!appointmentID) {
      setMessage({ type: "warning", text: "Please enter an Appointment ID." });
      return;
    }

    try {
      setLoading(true);

      // GraphQL mutation
      const mutation = `
        mutation DeleteAppointment($id: Int!) {
          deleteAppointmentByID(id: $id)
        }
      `;

      const res = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: mutation,
          variables: { id: parseInt(appointmentID, 10) },
        }),
      });

      const data = await res.json();

      if (data.errors) {
        setMessage({
          type: "danger",
          text: data.errors[0]?.message || "Failed to delete appointment.",
        });
        return;
      }

      if (data.data.deleteAppointmentByID) {
        setMessage({ type: "success", text: "Appointment deleted successfully!" });
        setTimeout(() => navigate("/AdminMain"), 1500);
      } else {
        setMessage({ type: "danger", text: "Appointment not found or could not be deleted." });
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setMessage({
        type: "danger",
        text: "An error occurred while deleting the appointment.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <section className="py-5 flex-grow-1">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-primary">Delete Appointment</h1>

          {message && (
            <div className={`alert alert-${message.type} text-center`}>
              {message.text}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm mx-auto"
            style={{ maxWidth: "500px" }}
          >
            <div className="mb-3">
              <label htmlFor="appointmentID" className="form-label">
                Appointment ID
              </label>
              <input
                type="number"
                id="appointmentID"
                name="appointmentID"
                value={appointmentID}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Appointment ID"
                required
              />
            </div>

            <div className="text-end">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                Cancel
              </Link>
              <button type="submit" className="btn btn-danger" disabled={loading}>
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
