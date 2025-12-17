import React from "react";
import { Link } from "react-router-dom";

export default function ServiceCard({ link, icon, title, description }) {
  return (
    <div className="col-md-4 text-center service-hover rounded shadow-sm">
      <Link to={link} className="text-decoration-none text-dark d-block">
        <i className={`bi ${icon} service-icon mb-3`}></i>
        <h5 className="fw-semibold">{title}</h5>
        <p>{description}</p>
      </Link>
    </div>
  );
}
