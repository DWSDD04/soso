import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

// Types for form data
interface UserFormData {
  UserID: string;
  Username: string;
  Email: string;
  Password: string;
  Status: string;
}

// Type for errors
interface FormErrors {
  [key: string]: { msg?: string } | string;
}

export default function UpdateUser() {
  const navigate = useNavigate();

  const [fetchBy, setFetchBy] = useState<"id" | "email">("id");
  const [identifier, setIdentifier] = useState<string>("");
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const base = "http://localhost:4000";

  const buildFetchUrl = (ident: string) =>
    fetchBy === "id"
      ? `${base}/api/users/${ident}`
      : `${base}/api/users/email/${encodeURIComponent(ident)}`;

  const buildUpdateUrl = (ident: string) =>
    fetchBy === "id"
      ? `${base}/api/users/${ident}`
      : `${base}/api/users/email/${encodeURIComponent(ident)}`;

  const fetchUser = async () => {
    if (!identifier) return alert("Please enter an identifier first.");
    setFetching(true);
    setErrors({});
    setFormData(null);

    try {
      const url = buildFetchUrl(identifier);
      const res = await fetch(url);
      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.warn("Non-JSON fetch response", text);
      }

      if (res.ok && data) {
        setFormData({
          UserID: data.UserID ?? "",
          Username: data.Username ?? data.UserName ?? "",
          Email: data.Email ?? "",
          Password: data.Password ?? "",
          Status: data.Status ?? "",
        });
      } else {
        alert(data?.message || "User not found");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch user.");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return alert("No user loaded to update.");
    if (!identifier) return alert("No identifier provided.");

    setLoading(true);
    setErrors({});

    try {
      const url = buildUpdateUrl(identifier);
      const { UserID, ...updateData } = formData;

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        console.warn("Non-JSON response", text);
      }

      if (res.ok) {
        alert(data?.message || "User updated successfully!");
        navigate("/AdminMain");
      } else {
        alert(data?.message || `Update failed (status ${res.status})`);
        setErrors(data?.errors || {});
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Network or server error while updating.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <section className="py-5 flex-grow-1">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">Update User</h1>

          {/* Fetch controls */}
          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Fetch By</label>
                <select
                  className="form-select"
                  value={fetchBy}
                  onChange={(e) => setFetchBy(e.target.value as "id" | "email")}
                >
                  <option value="id">ID</option>
                  <option value="email">Email</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Identifier</label>
                <input
                  type="text"
                  className="form-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={fetchBy === "id" ? "e.g. 5" : "e.g. user@example.com"}
                />
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-pink text-white w-100"
                  onClick={fetchUser}
                  disabled={fetching}
                >
                  {fetching ? "Fetching..." : "Fetch User"}
                </button>
              </div>
            </div>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>{typeof v === "string" ? v : v.msg || JSON.stringify(v)}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          {formData && (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="UserID" className="form-label fw-semibold">
                    User ID
                  </label>
                  <input
                    id="UserID"
                    name="UserID"
                    type="text"
                    value={formData.UserID}
                    className="form-control"
                    disabled
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="Username" className="form-label fw-semibold">
                    Username
                  </label>
                  <input
                    id="Username"
                    name="Username"
                    type="text"
                    value={formData.Username}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="Email" className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    id="Email"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="Password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    id="Password"
                    name="Password"
                    type="text"
                    value={formData.Password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="Status" className="form-label fw-semibold">
                    Status
                  </label>
                  <select
                    id="Status"
                    name="Status"
                    value={formData.Status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select status</option>
                    <option value="Client">Client</option>
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="text-end mt-4">
                <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-pink text-white" disabled={loading}>
                  {loading ? "Updating..." : "Update User"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
