// src/pages/MenuPage.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import MenuBar from "../components/MenuBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import { setTitle } from "../slices/uiSlice";

// Portfolio images as a typed array
const portfolioImages: number[] = [1, 2, 3, 4, 5, 6];

const MenuPage: React.FC = () => {
  const dispatch = useDispatch();

  // Set dynamic title on mount
  useEffect(() => {
    dispatch(setTitle("Rima's Beauty Salon"));
  }, [dispatch]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Menu Bar */}
      <MenuBar />

      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-white text-center py-5">
        <div className="container">
          <h1 className="display-4 text-pink-600 fw-bold mb-3">
            Transform Your Beauty
          </h1>
          <p className="lead text-secondary mb-4">
            Professional makeup artistry for weddings, special events, and photo shoots
          </p>

          <Link to="/contact" className="btn btn-pink btn-lg me-2 mb-2">
            Book Now
          </Link>
          <Link to="/calendar" className="btn btn-outline-primary btn-lg me-2 mb-2">
            View Calendar
          </Link>
          <Link to="/login" className="btn btn-outline-success btn-lg mb-2">
            Admin Login
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Our Services</h2>
          <div className="row g-4 justify-content-center">
            <ServiceCard
              link="/makeup"
              icon="bi-heart-fill"
              title="Professional Makeup"
              description="Full face makeup for all occasions including bridal, special events, and everyday glamour."
            />
            <ServiceCard
              link="/nailsart"
              icon="bi-star-fill"
              title="Nail Art & Care"
              description="Manicures, pedicures, nail extensions, and artistic nail designs."
            />
            <ServiceCard
              link="/facial"
              icon="bi-camera-fill"
              title="Facial Treatments"
              description="Professional skincare services including facials, cleansing, and rejuvenation."
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">Portfolio</h2>
          <div className="row g-3 justify-content-center">
            {portfolioImages.map((i) => (
              <div className="col-6 col-md-4" key={i}>
                <img
                  src={`/images/portfolio-${i}.jpg`}
                  alt={`Portfolio ${i}`}
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 mt-auto">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Get in Touch</h2>
          <div className="mb-3">
            <Link to="/contact" className="text-pink-600 fs-3 mx-2">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="/contact" className="text-pink-600 fs-3 mx-2">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="/contact" className="text-pink-600 fs-3 mx-2">
              <i className="bi bi-telephone-fill"></i>
            </Link>
          </div>
          <Link to="/contact" className="btn btn-pink btn-lg">
            Contact Me
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MenuPage;
