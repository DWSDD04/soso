import React, { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";

interface FacialService {
  ServiceID: number;
  Name: string;
  Description: string | null;
  Price?: string;
  Duration?: number;
  [key: string]: any;
}

export default function Facial(): JSX.Element {
  const [facialServices, setFacialServices] = useState<FacialService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/services/type/Facial")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch facial services");
        return res.json();
      })
      .then((data: FacialService[]) => {
        setFacialServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("[FacialServices] fetch error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white text-center py-5">
        <div className="container">
          <h1 className="display-4 text-pink-600 fw-bold mb-3">
            Our Facial Related Services
          </h1>
          <p className="lead text-secondary mb-4">
            Explore our range of professional facial treatment packages
          </p>
          <a href="#facial-list" className="btn btn-pink btn-lg">
            View Services
          </a>
        </div>
      </section>

      {/* Facial Services List */}
      <section id="facial-list" className="py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">
            Facial Treatment Packages
          </h2>

          {loading ? (
            <p className="text-center text-secondary">Loading services...</p>
          ) : facialServices.length > 0 ? (
            <div className="scrollable-services">
              <div className="row g-4">
                {facialServices.map((service) => (
                  <div className="col-12 col-md-6 col-lg-4" key={service.ServiceID}>
                    <div className="card h-100 service-hover shadow-sm">
                      <div className="card-body text-center">
                        {/* Service Name */}
                        <h5 className="card-title fw-semibold mb-2">
                          {service.Name || "Untitled Service"}
                        </h5>

                        {/* Description */}
                        <p className="card-text text-secondary mb-2">
                          {service.Description || "No description available."}
                        </p>

                        {/* Price */}
                        {service.Price && (
                          <p className="card-text text-secondary mb-2">
                            Price: ${service.Price}
                          </p>
                        )}

                        {/* Duration */}
                        {service.Duration && (
                          <p className="card-text text-secondary mb-4">
                            Duration: {service.Duration} min
                          </p>
                        )}

                        <Link to="/contact" className="btn btn-pink">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-secondary">
              No facial services available at the moment.
            </p>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Questions?</h2>
          <p className="mb-4 text-secondary">
            Reach out for custom quotes or inquiries.
          </p>
          <Link to="/contact" className="btn btn-pink btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
