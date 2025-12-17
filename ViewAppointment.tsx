import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Clock, Info } from "lucide-react"; // optional icons

interface Appointment {
  AppointmentID: string | number;
  Name: string;
  ServiceID: string;
  Status: "Pending" | "Completed" | "Cancelled" | string;
  ScheduledTime: string;
}

export default function ViewAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppointments = async () => {
  try {
    const res = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            appointments {
              AppointmentID
              Name
              ServiceID
              Status
              ScheduledTime
            }
          }
        `
      }),
    });

    const json = await res.json();
    if (json.data) {
      setAppointments(json.data.appointments);
    } else {
      console.error("GraphQL error:", json.errors);
    }
  } catch (err) {
    console.error("Network error:", err);
  } finally {
    setLoading(false);
  }
};

    fetchAppointments();
  }, []);

  // Helper for status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Pending":
        return "warning";
      case "Cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <section className="py-5 flex-grow-1">
        <div className="container">
          <h1 className="mb-4 text-center fw-bold text-primary">
            Appointment List
          </h1>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : appointments.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {appointments.map((appointment) => (
                <div key={appointment.AppointmentID} className="col">
                  <div className="card h-100 shadow-sm border-0 hover-shadow transition">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-capitalize fw-bold mb-2">
                        {appointment.Name}
                      </h5>
                      <p className="card-text mb-2 d-flex align-items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted" />
                        <strong>Service ID:</strong> {appointment.ServiceID}
                      </p>
                      <p className="card-text mb-2 d-flex align-items-center gap-2">
                        <Info className="w-4 h-4 text-muted" />
                        <strong>Status:</strong>{" "}
                        <span
                          className={`badge bg-${getStatusBadge(
                            appointment.Status
                          )} text-light`}
                        >
                          {appointment.Status}
                        </span>
                      </p>
                      <p className="card-text mb-2 d-flex align-items-center gap-2">
                        <Clock className="w-4 h-4 text-muted" />
                        <strong>Scheduled:</strong>{" "}
                        {new Date(appointment.ScheduledTime).toLocaleString()}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to={`/appointments/${appointment.AppointmentID}`}
                          className="btn btn-primary w-100"
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
              No appointments found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
