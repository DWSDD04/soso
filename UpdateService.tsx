import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";


// ----------------------
// Types
// ----------------------
interface ServiceData {
  ServiceID: number | string;
  Type: string;
  Name: string;
  Description: string;
  Price: number | string;
  Duration: string;
  Available: string; // "true" | "false"
}

interface ErrorBag {
  [key: string]: any;
}

type FetchBy = "id" | "name" | "type";

// ----------------------
// Component
// ----------------------
export default function UpdateService() {
  const navigate = useNavigate();

  const [fetchBy, setFetchBy] = useState<FetchBy>("id");
  const [identifier, setIdentifier] = useState<string>("");
  const [formData, setFormData] = useState<ServiceData | null>(null);
  const [errors, setErrors] = useState<ErrorBag>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);

  const base = "http://localhost:3000";

  // ---------------------------
  // Helpers – Build URLs
  // ---------------------------
  const buildFetchUrl = (ident: string) => {
    if (fetchBy === "id") return `${base}/services/${ident}`;
    if (fetchBy === "name")
      return `${base}/services/name/${encodeURIComponent(ident)}`;
    return `${base}/services/type/${encodeURIComponent(ident)}`;
  };

  const buildUpdateUrl = (ident: string) => {
    if (fetchBy === "id") return `${base}/services/${ident}`;
    if (fetchBy === "name")
      return `${base}/services/name/${encodeURIComponent(ident)}`;
    return `${base}/services/type/${encodeURIComponent(ident)}`;
  };

  // ---------------------------
  // Fetch Service
  // ---------------------------
  const fetchService = async () => {
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
        console.warn("Invalid JSON:", text);
      }

      if (res.ok) {
        let service = data?.ServiceID?.ServiceID ? data.ServiceID : data;

        if (Array.isArray(service)) service = service[0];

        if (!service) {
          alert("Service not found");
          setFormData(null);
          return;
        }

        // Normalize for form, convert numbers to strings
        setFormData({
          ServiceID: service.ServiceID ?? "",
          Type: service.Type ?? "",
          Name: service.Name ?? "",
          Description: service.Description ?? "",
          Price: service.Price !== undefined ? String(service.Price) : "",
          Duration: service.Duration ?? "",
          Available:
            service.Available === 1 ||
            service.Available === true ||
            service.Available === "true"
              ? "true"
              : "false",
        });
      } else {
        alert(data?.message || "Service not found.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch service.");
    } finally {
      setFetching(false);
    }
  };

  // ---------------------------
  // Handle input changes
  // ---------------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // ---------------------------
  // Submit Update
  // ---------------------------
  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!formData || !identifier) return alert("No service loaded or identifier missing.");

  setLoading(true);
  setErrors({});

  try {
    const url = buildUpdateUrl(identifier);

    const { ServiceID, ...updateData } = formData;

    const payload = {
      Type: updateData.Type,
      Name: updateData.Name,
      Description: updateData.Description || undefined,
      Price: Number(updateData.Price),
      Duration: Number(updateData.Duration),
      Available: updateData.Available === "true",
    };

    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Service updated successfully!");
      navigate("/AdminMain");
    } else {
      setErrors(data.errors || {});
      alert(data.message || "Update failed.");
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Network/server error.");
  } finally {
    setLoading(false);
  }
};


  // ---------------------------
  // JSX
  // ---------------------------
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <section className="py-5 flex-grow-1">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">
            Update Service
          </h1>

          {/* Fetch Controls */}
          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <div className="row g-3 align-items-end">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Fetch By</label>
                <select
                  className="form-select"
                  value={fetchBy}
                  onChange={(e) => setFetchBy(e.target.value as FetchBy)}
                >
                  <option value="id">ID</option>
                  <option value="name">Name</option>
                  <option value="type">Type</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Identifier</label>
                <input
                  type="text"
                  className="form-control"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={
                    fetchBy === "id"
                      ? "e.g. 10"
                      : fetchBy === "name"
                      ? "e.g. Haircut"
                      : "e.g. Styling"
                  }
                />
              </div>

              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-pink text-white w-100"
                  onClick={fetchService}
                  disabled={fetching}
                >
                  {fetching ? "Fetching..." : "Fetch Service"}
                </button>
              </div>
            </div>
          </div>

          {/* Error List */}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>{v?.msg || v}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          {formData && (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Service ID</label>
                  <input
                    disabled
                    className="form-control"
                    value={String(formData.ServiceID)}
                    name="ServiceID"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Type</label>
                  <input
                    className="form-control"
                    name="Type"
                    value={formData.Type}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Name</label>
                  <input
                    className="form-control"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    name="Description"
                    value={formData.Description}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    name="Price"
                    value={String(formData.Price)}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Duration</label>
                  <input
                    className="form-control"
                    name="Duration"
                    value={formData.Duration}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">Available</label>
                  <select
                    className="form-select"
                    name="Available"
                    value={formData.Available}
                    onChange={handleChange}
                  >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>
              </div>

              <div className="text-end mt-4">
                <Link
                  to="/AdminMain"
                  className="btn btn-outline-secondary me-2"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-pink text-white"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Service"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
