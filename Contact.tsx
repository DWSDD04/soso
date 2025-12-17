import React, { type JSX } from "react";
import { Link } from "react-router-dom";


export default function Contact(): JSX.Element {
  return (
    <div className="bg-light">

      {/* Hero Section */}
      <section className="bg-white text-center py-5">
        <div className="container">
          <h1 className="display-4 text-pink-600 fw-bold mb-3">Get in Touch</h1>
          <p className="lead text-secondary">
            We’d love to hear from you! Reach out via any of the following
            channels:
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center g-4">

            {/* WhatsApp */}
            <div className="col-12 col-md-4 text-center">
              <i className="bi bi-whatsapp service-icon mb-3 fs-1 text-pink-600" />
              <h5 className="fw-semibold mb-2">WhatsApp</h5>
              <p>
                <a
                  href="https://wa.me/1234567890"
                  className="text-decoration-none text-pink-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +961 81 778 097
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="col-12 col-md-4 text-center">
              <i className="bi bi-envelope-fill service-icon mb-3 fs-1 text-pink-600" />
              <h5 className="fw-semibold mb-2">Email</h5>
              <p>
                <a
                  href="mailto:rimaabdallah44@gmail.com"
                  className="text-decoration-none text-pink-600"
                >
                  rimaabdallah44@gmail.com
                </a>
              </p>
            </div>

            {/* Instagram */}
            <div className="col-12 col-md-4 text-center">
              <i className="bi bi-instagram service-icon mb-3 fs-1 text-pink-600" />
              <h5 className="fw-semibold mb-2">Instagram</h5>
              <p>
                <a
                  href="https://instagram.com/rimas_beauty"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none text-pink-600"
                >
                  @reema_s_beauty
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
