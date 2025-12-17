import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Tag } from "lucide-react";

// ------------------------------------------
// Product Type
// ------------------------------------------
interface Product {
  ProductID: string;
  Type: string;
  Name: string;
  Brand: string;
  CostPrice: string | number;
  quantity: number;
  Available: boolean | number;
  Description: string;
  imageUrl?: string;
}

// ------------------------------------------

const ViewProducts: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products");
        const data = await res.json();

        if (res.ok) setProducts(data);
        else console.error("Error fetching products:", data);
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-light min-vh-100">
      <section className="py-5">
        <div className="container">
          <h1 className="mb-4 text-center fw-bold text-pink-600">
            Our Complete Catalog
          </h1>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-pink-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {products.map((product) => (
                <div key={product.ProductID} className="col">
                  <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                    <img
                      src={product.imageUrl || "/images/default-product.jpg"}
                      className="card-img-top"
                      alt={product.Name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-pink-600 fw-bold mb-2">
                        {product.Name}
                      </h5>

                      <p className="card-text mb-1 d-flex align-items-center gap-1">
                        <Tag className="w-4 h-4 text-pink-400" />{" "}
                        <strong>Type:</strong> {product.Type}
                      </p>

                      <p className="card-text mb-1">
                        <strong>Brand:</strong> {product.Brand}
                      </p>

                      <p className="card-text mb-2">
                        <strong>Description:</strong> {product.Description}
                      </p>

                      <p className="card-text mb-1">
                        <strong>Cost Price:</strong> $
                        {Number(product.CostPrice).toFixed(2)}
                      </p>

                      <p className="card-text mb-1">
                        <strong>Quantity:</strong> {product.quantity}
                      </p>

                      <p className="card-text mb-3 d-flex align-items-center gap-2">
                        <strong>Available:</strong>{" "}
                        {Number(product.Available) === 1 ? (
                          <span className="badge bg-pink-600 text-white d-flex align-items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Yes
                          </span>
                        ) : (
                          <span className="badge bg-secondary text-white d-flex align-items-center gap-1">
                            <XCircle className="w-4 h-4" /> No
                          </span>
                        )}
                      </p>

                      <div className="mt-auto">
                        <Link
                          to={`/Products/${product.ProductID}`}
                          className="btn btn-pink w-100 text-white"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-secondary text-center" role="alert">
              No products available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ViewProducts;
