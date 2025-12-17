import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

// Define types for form data
interface FormData {
  UserID: string;
  UserName: string;
  Email: string;
  Password: string;
  Status: string;
}

// Define types for errors
interface FormErrors {
  [key: string]: { msg: string };
}

export default function AddUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    UserID: "",
    UserName: "",
    Email: "",
    Password: "",
    Status: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/AdminMain");
      } else {
        setErrors(data.errors || {});
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="bg-light">
      <Header />
      <MenuBar />

      {/* Add User Section */}
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">Add a New User</h1>

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
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="row g-3">
              {/* User ID */}
              <div className="col-md-6">
                <label htmlFor="UserID" className="form-label">
                  User ID
                </label>
                <input
                  type="text"
                  id="UserID"
                  name="UserID"
                  value={formData.UserID}
                  onChange={handleChange}
                  className={`form-control ${errors.UserID ? "is-invalid" : ""}`}
                />
                {errors.UserID && <div className="invalid-feedback">{errors.UserID.msg}</div>}
              </div>

              {/* User Name */}
              <div className="col-md-6">
                <label htmlFor="UserName" className="form-label">
                  UserName
                </label>
                <input
                  type="text"
                  id="UserName"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  className={`form-control ${errors.UserName ? "is-invalid" : ""}`}
                />
                {errors.UserName && <div className="invalid-feedback">{errors.UserName.msg}</div>}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                />
                {errors.Email && <div className="invalid-feedback">{errors.Email.msg}</div>}
              </div>

              {/* Password */}
              <div className="col-12">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  id="Password"
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  className={`form-control ${errors.Password ? "is-invalid" : ""}`}
                />
                {errors.Password && <div className="invalid-feedback">{errors.Password.msg}</div>}
              </div>

              {/* Status */}
              <div className="col-md-4">
                <label htmlFor="Status" className="form-label">
                  Status
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                  className={`form-select ${errors.Status ? "is-invalid" : ""}`}
                >
                  <option value="1">Client</option>
                  <option value="0">Employee</option>
                  <option value="0">Admin</option>
                </select>
                {errors.Status && <div className="invalid-feedback">{errors.Status.msg}</div>}
              </div>
            </div>

            {/* Buttons */}
            <div className="text-end mt-4">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                Cancel
              </Link>
              <button type="submit" className="btn-pink">
                Add User
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
