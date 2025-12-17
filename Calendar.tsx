import React, { useEffect, useState, type JSX } from "react";
import { Link } from "react-router-dom";

interface Appointment {
  id: number;
  appointmentDate: string;
  status: string;
}

export default function AvailableSlots(): JSX.Element {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const START_HOUR = 8;
  const END_HOUR = 17;

  useEffect(() => {
    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            upcomingAppointments {
              id
              appointmentDate
              status
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setAppointments(result.data.upcomingAppointments);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch appointments:", err);
        setLoading(false);
      });
  }, []);

  const today = new Date();

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const appointmentsForHour = (hour: number) => {
    return appointments.filter((appt) => {
      const d = new Date(appt.appointmentDate);
      return isSameDay(d, today) && d.getHours() === hour;
    });
  };

  return (
    <div className="bg-light">
      <section className="py-5">
        <div className="container">
          <h1 className="mb-4 text-center">Available Slots for Today</h1>

          {loading ? (
            <p className="text-center text-secondary">Loading slots...</p>
          ) : (
            <div className="list-group">
              {Array.from({ length: END_HOUR - START_HOUR + 1 }).map((_, i) => {
                const hour = START_HOUR + i;
                const occupiedAppointments = appointmentsForHour(hour);
                const isOccupied = occupiedAppointments.length > 0;

                return (
                  <div
                    key={hour}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <strong>{hour.toString().padStart(2, "0")}:00</strong>

                    {isOccupied ? (
                      <span className="badge bg-danger">Occupied</span>
                    ) : (
                      <Link
                           to="/contact"
                               className="btn btn-sm btn-success"
                                 >
                                     Free – Book
                             </Link>

                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
