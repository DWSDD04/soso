// pages/MakeupServices.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Service {
  ServiceID: number;
  Title?: string;
  title?: string;
  Name?: string;
  Description?: string | null;
  description?: string | null;
  Price?: string;
  Duration?: number;
  [key: string]: any;
}

export default function MakeupServices() {
  const [makeupServices, setMakeupServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = "http://localhost:3000/services/type/Makeup";
    console.log("[MakeupServices] starting fetch:", url);

    fetch(url)
      .then((res) => {
        console.log("[MakeupServices] fetch response:", res.status, res.statusText);
        if (!res.ok) throw new Error(`Failed to fetch makeup services (status ${res.status})`);
        return res.json();
      })
      .then((data: Service[]) => {
        console.log("[MakeupServices] parsed JSON data:", data);
        setMakeupServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("[MakeupServices] fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Log whenever the services state changes (helps verify state updates)
  useEffect(() => {
    console.log("[MakeupServices] makeupServices state updated:", makeupServices);
  }, [makeupServices]);

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-white text-center py-5">
        <div className="container">
          <h1 className="display-4 text-pink-600 fw-bold mb-3">
            Our Makeup Services
          </h1>
          <p className="lead text-secondary mb-4">
            Explore our range of professional makeup packages tailored for every
            occasion.
          </p>
          <a href="#makeup-list" className="btn btn-pink btn-lg">
            View Services
          </a>
        </div>
      </section>

      {/* Makeup Services List */}
      <section id="makeup-list" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Makeup Packages</h2>

          {loading ? (
            <p className="text-center text-secondary">Loading services...</p>
          ) : makeupServices.length > 0 ? (
            <div className="row g-4">
              {makeupServices.map((service) => (
                <div className="col-12 col-md-6 col-lg-4" key={service.ServiceID}>
                  <div className="card h-100 service-hover shadow-sm">
                    <div className="card-body text-center">
                      {/* Title */}
                      <h5 className="card-title fw-semibold mb-2">
                        {service.Title || service.title || service.Name || "Untitled Service"}
                      </h5>

                      {/* Description */}
                      <p className="card-text text-secondary mb-2">
                        {service.Description || service.description || "No description available."}
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
              No makeup services available at the moment.
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
