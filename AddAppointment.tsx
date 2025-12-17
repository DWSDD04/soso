import React from "react";
import AppointmentForm from "../../hooks/appointmenthook";

export default function AddAppointment() {
  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="text-center fw-bold mb-4 text-pink-600">Add a New Appointment</h1>
        <AppointmentForm graphQLEndpoint="http://localhost:3000/graphql" />
      </div>
    </div>
  );
}
