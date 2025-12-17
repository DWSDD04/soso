// pages/NailsArtServices.tsx
import React, { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";

interface NailService {
  ServiceID: number;
  Name: string;
  Description: string | null;
  Price?: string;
  Duration?: number;
  [key: string]: any;
}

export default function NailsArtServices(): JSX.Element {
  const [nailServices, setNailServices] = useState<NailService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/services/type/Nails")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch nail art services");
        return res.json();
      })
      .then((data: NailService[]) => {
        setNailServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[NailsArtServices] fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-white text-center py-5">
        <div className="container">
          <h1 className="display-4 text-pink-600 fw-bold mb-3">
            Our Nails Art Services
          </h1>
          <p className="lead text-secondary mb-4">
            Explore our range of professional nails art packages.
          </p>
          <a href="#nailsart-list" className="btn btn-pink btn-lg">
            View Services
          </a>
        </div>
      </section>

      {/* Nails Art Services List */}
      <section id="nailsart-list" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Nails Art Packages</h2>

          {loading ? (
            <p className="text-center text-secondary">Loading services...</p>
          ) : nailServices.length > 0 ? (
            <div className="row g-4">
              {nailServices.map((service) => (
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
          ) : (
            <p className="text-center text-secondary">
              No nails art services available at the moment.
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
    </div>
  );
}
