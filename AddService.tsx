import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";


// ----------------------------
// Types
// ----------------------------
interface ServiceForm {
  ServiceID: string;
  Type: string;
  Name: string;
  Description: string;
  Price: string;
  Duration: string;
  Available: string;
}

interface FieldError {
  msg: string;
}

interface ErrorResponse {
  [key: string]: FieldError;
}

// ----------------------------
// Component
// ----------------------------
export default function AddService() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ServiceForm>({
    ServiceID: "",
    Type: "",
    Name: "",
    Description: "",
    Price: "",
    Duration: "",
    Available: "",
  });

  const [errors, setErrors] = useState<ErrorResponse>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  // Convert form values to proper types
  const payload = {
    Type: formData.Type,
    Name: formData.Name,
    Description: formData.Description || undefined,
    Price: parseFloat(formData.Price),        // string → number
    Duration: parseInt(formData.Duration, 10), // string → number
    Available: formData.Available === "1",     // "0"/"1" → boolean
  };

  try {
    const res = await fetch("http://localhost:3000/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/AdminMain");
    } else {
      setErrors(data.errors || {});
    }
  } catch (err) {
    console.error("Error adding service:", err);
  }
};


  return (
    <div className="bg-light">
      {/* Add Service Section */}
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">
            Add a New Service
          </h1>

          {/* Error Message */}
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
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow-sm"
          >
            <div className="row g-3">
              {/* Service ID */}
              <div className="col-md-6">
                <label htmlFor="ServiceID" className="form-label">
                  Service ID
                </label>
                <input
                  type="text"
                  id="ServiceID"
                  name="ServiceID"
                  value={formData.ServiceID}
                  onChange={handleChange}
                  className={`form-control ${errors.ServiceID ? "is-invalid" : ""}`}
                />
                {errors.ServiceID && (
                  <div className="invalid-feedback">
                    {errors.ServiceID.msg}
                  </div>
                )}
              </div>

              {/* Type */}
              <div className="col-md-6">
                <label htmlFor="Type" className="form-label">
                  Type
                </label>
                <input
                  type="text"
                  id="Type"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  className={`form-control ${errors.Type ? "is-invalid" : ""}`}
                />
                {errors.Type && (
                  <div className="invalid-feedback">{errors.Type.msg}</div>
                )}
              </div>

              {/* Name */}
              <div className="col-md-6">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                />
                {errors.Name && (
                  <div className="invalid-feedback">{errors.Name.msg}</div>
                )}
              </div>

              {/* Description */}
              <div className="col-12">
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  id="Description"
                  name="Description"
                  rows={4}
                  value={formData.Description}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.Description ? "is-invalid" : ""
                  }`}
                />
                {errors.Description && (
                  <div className="invalid-feedback">
                    {errors.Description.msg}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="col-md-4">
                <label htmlFor="Price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="Price"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  className={`form-control ${errors.Price ? "is-invalid" : ""}`}
                />
                {errors.Price && (
                  <div className="invalid-feedback">{errors.Price.msg}</div>
                )}
              </div>

              {/* Duration */}
              <div className="col-md-4">
                <label htmlFor="Duration" className="form-label">
                  Duration
                </label>
                <input
                  type="number"
                  id="Duration"
                  name="Duration"
                  value={formData.Duration}
                  onChange={handleChange}
                  className={`form-control ${
                    errors.Duration ? "is-invalid" : ""
                  }`}
                />
                {errors.Duration && (
                  <div className="invalid-feedback">{errors.Duration.msg}</div>
                )}
              </div>

              {/* Available */}
              <div className="col-md-4">
                <label htmlFor="Available" className="form-label">
                  Available
                </label>
                <select
                  id="Available"
                  name="Available"
                  value={formData.Available}
                  onChange={handleChange}
                  className={`form-select ${
                    errors.Available ? "is-invalid" : ""
                  }`}
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
                {errors.Available && (
                  <div className="invalid-feedback">
                    {errors.Available.msg}
                  </div>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="text-end mt-4">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                Cancel
              </Link>
              <button type="submit" className="btn-pink">
                Add Service
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
