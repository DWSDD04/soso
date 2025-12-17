// pages/AddNotification.tsx
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";


interface NotificationFormData {
  AppointmentID: string;
  message: string;
}

interface FieldError {
  msg: string;
}

interface NotificationErrors {
  [key: string]: FieldError;
}

export default function AddNotification() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState<NotificationFormData>({
    AppointmentID: "",
    message: "",
  });

  const [errors, setErrors] = useState<NotificationErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/AdminMain");
      } else {
        setErrors(
          data.errors || { message: { msg: data.message || "Failed to create notification" } }
        );
      }
    } catch (err) {
      console.error("Error adding notification:", err);
      setErrors({ message: { msg: "Network error. Please try again." } });
    }
  };

  return (
    <div className="bg-light">
      <main className="container py-5">
        <h1 className="mb-4 text-center">Create a New Notification</h1>

        {/* Error messages */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul className="mb-0">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>{err.msg}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
          <div className="row g-3">

            {/* AppointmentID */}
            <div className="col-md-6">
              <label htmlFor="AppointmentID" className="form-label">Appointment ID</label>
              <input
                type="number"
                id="AppointmentID"
                name="AppointmentID"
                value={formData.AppointmentID}
                onChange={handleChange}
                className={`form-control ${errors.AppointmentID ? "is-invalid" : ""}`}
                required
              />
              {errors.AppointmentID && (
                <div className="invalid-feedback">{errors.AppointmentID.msg}</div>
              )}
            </div>

            {/* Message */}
            <div className="col-md-6">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                rows={2}
                value={formData.message}
                onChange={handleChange}
                className={`form-control ${errors.message ? "is-invalid" : ""}`}
                required
              ></textarea>
              {errors.message && (
                <div className="invalid-feedback">{errors.message.msg}</div>
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="text-end mt-4">
            <Link to="/AdminMain" className="btn btn-outline-secondary me-2">Cancel</Link>
            <button type="submit" className="btn-pink">Add Notification</button>
          </div>
        </form>
      </main>
    </div>
  );
}
