import React, { type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProduct } from "../../hooks/producthook"; 

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { formData, handleChange, errors, addProduct } = useProduct();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await addProduct();
    if (result && !Object.keys(errors).length) {
      navigate("/AdminMain");
    }
  };

  return (
    <div className="bg-light">
      <section className="py-5">
        <div className="container">
          <h1 className="text-center fw-bold mb-4 text-pink-600">
            Add a New Product
          </h1>

          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {Object.entries(errors).map(([key, err]) => (
                  <li key={key}>{err.msg}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="row g-3">
              {/* Product fields */}
              <div className="col-md-6">
                <label htmlFor="Type" className="form-label">Type</label>
                <input
                  type="text"
                  id="Type"
                  name="Type"
                  value={formData.Type}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Name" className="form-label">Name</label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Brand" className="form-label">Brand</label>
                <input
                  type="text"
                  id="Brand"
                  name="Brand"
                  value={formData.Brand}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="CostPrice" className="form-label">Cost Price</label>
                <input
                  type="number"
                  id="CostPrice"
                  name="CostPrice"
                  value={formData.CostPrice}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="quantity" className="form-label">Quantity</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="Available" className="form-label">Available</label>
                <select
                  id="Available"
                  name="Available"
                  value={formData.Available ? "1" : "0"}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>

              <div className="col-12">
                <label htmlFor="Description" className="form-label">Description</label>
                <textarea
                  id="Description"
                  name="Description"
                  rows={4}
                  value={formData.Description}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="text-end mt-4">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">Cancel</Link>
              <button type="submit" className="btn-pink">Add Product</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddProduct;
