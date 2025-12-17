import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Tag } from "lucide-react";

// ---------------------------
// Types
// ---------------------------
interface Service {
  ServiceID: number | string;
  Name: string;
  Type: string;
  Description: string;
  Price: number | string;
  Duration: number | string;
  Available: boolean | number | string;
  imageUrl?: string;
}

// ---------------------------
// Component
// ---------------------------
export default function ViewService() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/services");
        const data: Service[] = await res.json();
        if (res.ok) setServices(data);
        else console.error("Error fetching services:", data);
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // ---------------------------
  // JSX
  // ---------------------------
  return (
    <div className="bg-light min-vh-100">
      <section className="py-5">
        <div className="container">
          <h1 className="mb-4 text-center fw-bold text-pink-600">
            Our Services
          </h1>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-pink-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : services.length > 0 ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {services.map((service) => {
                const priceNum = Number(service.Price) || 0;
                const durationNum = Number(service.Duration) || 0;
                const isAvailable =
                  service.Available === true ||
                  service.Available === 1 ||
                  service.Available === "true";

                return (
                  <div key={service.ServiceID} className="col">
                    <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                      <img
                        src={service.imageUrl || "/images/default-service.jpg"}
                        className="card-img-top"
                        alt={service.Name}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-pink-600 fw-bold mb-2">
                          {service.Name}
                        </h5>

                        <p className="card-text mb-1 d-flex align-items-center gap-1">
                          <Tag className="w-4 h-4 text-pink-400" />{" "}
                          <strong>Type:</strong> {service.Type}
                        </p>

                        <p className="card-text mb-2">{service.Description}</p>
                        <p className="card-text mb-1">
                          <strong>Price:</strong> ${priceNum.toFixed(2)}
                        </p>
                        <p className="card-text mb-2">
                          <strong>Duration:</strong> {durationNum} mins
                        </p>
                        <p className="card-text mb-3 d-flex align-items-center gap-2">
                          <strong>Available:</strong>{" "}
                          {isAvailable ? (
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
                            to={`/Services/${service.ServiceID}`}
                            className="btn btn-pink w-100 text-white"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="alert alert-secondary text-center" role="alert">
              No services available at the moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
