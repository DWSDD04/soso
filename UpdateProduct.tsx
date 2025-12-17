import React, { type FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProduct } from "../../hooks/producthook";

const UpdateProduct: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [fetchBy, setFetchBy] = useState<"id" | "Name">("id");

  const { formData, setFormData, handleChange, errors, updateProduct } = useProduct();

  // Fetch product by ID or Name
  const fetchProduct = async () => {
    if (!identifier) return alert("Please enter an identifier");

    const url =
      fetchBy === "id"
        ? `http://localhost:3000/products/${identifier}`
        : `http://localhost:3000/products/search?q=${encodeURIComponent(identifier)}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) return alert("Product not found");

      if (fetchBy === "Name") setFormData(Array.isArray(data) ? data[0] : data);
      else setFormData(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching product");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.ProductID) return alert("No product loaded");
    const result = await updateProduct(formData.ProductID);
    if (result && !Object.keys(errors).length) {
      alert("Product updated successfully");
      navigate("/AdminMain");
    }
  };

  return (
    <div className="bg-light">
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">Update Product</h1>

          {/* Fetch Section */}
          <div className="bg-white p-3 rounded shadow-sm mb-4">
            <div className="row g-3 align-items-center">
              <div className="col-md-3">
                <label className="form-label fw-semibold">Update By</label>
                <select
                  value={fetchBy}
                  onChange={e => setFetchBy(e.target.value as "id" | "Name")}
                  className="form-select"
                >
                  <option value="id">ID</option>
                  <option value="Name">Name</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Identifier</label>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="col-md-3">
                <button type="button" onClick={fetchProduct} className="btn btn-primary mt-4 w-100">
                  Fetch Product
                </button>
              </div>
            </div>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">
              <ul>
                {Object.entries(errors).map(([key, err]) => (
                  <li key={key}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Form */}
          {formData.ProductID && (
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">Product ID</label>
                  <input type="text" value={formData.ProductID} readOnly className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Type</label>
                  <input type="text" name="Type" value={formData.Type || ""} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Name</label>
                  <input type="text" name="Name" value={formData.Name || ""} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Brand</label>
                  <input type="text" name="Brand" value={formData.Brand || ""} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Cost Price</label>
                  <input type="number" name="CostPrice" value={formData.CostPrice || ""} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity || ""} onChange={handleChange} className="form-control" />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Available</label>
                  <select name="Available" value={formData.Available ? "1" : "0"} onChange={handleChange} className="form-select">
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea name="Description" value={formData.Description || ""} onChange={handleChange} className="form-control" />
                </div>
              </div>

              <div className="text-end mt-4">
                <Link to="/AdminMain" className="btn btn-outline-secondary me-2">Cancel</Link>
                <button type="submit" className="btn btn-success text-white">Update Product</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default UpdateProduct;
