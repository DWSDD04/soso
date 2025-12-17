import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

interface AppointmentFormData {
  AppointmentID: string | number;
  Name: string;
  ServiceID: string;
  Status: "Pending" | "Completed" | "Cancelled";
  ScheduledTime: string; // datetime-local value: "YYYY-MM-DDTHH:MM"
}

interface FormErrors {
  [key: string]: { msg: string } | undefined;
}

const GRAPHQL_URL = "http://localhost:3000/graphql";
const INCOME_ENDPOINT = "http://localhost:3000/api/incomes/from-appointment"; // adjust if your incomes service is on a different port

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function isoToLocalDatetime(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  // Build local datetime-local string: YYYY-MM-DDTHH:MM
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function UpdateAppointment() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AppointmentFormData>({
    AppointmentID: "",
    Name: "",
    ServiceID: "",
    Status: "Pending",
    ScheduledTime: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [identifier, setIdentifier] = useState<string>("");
  const [previousStatus, setPreviousStatus] = useState<string>("");

  // Fetch appointment by ID via GraphQL
  const fetchAppointment = async () => {
    if (!identifier) return alert("Please enter an Appointment ID");

    const query = `
      query GetAppointment($id: Int!) {
        appointment(id: $id) {
          AppointmentID
          Name
          ServiceID
          Status
          ScheduledTime
        }
      }
    `;

    try {
      const res = await fetch(GRAPHQL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { id: Number(identifier) } }),
      });
      const json = await res.json();
      console.log("Fetch appointment response:", json);

      if (json.errors && json.errors.length) {
        alert(json.errors[0].message || "Failed to fetch appointment");
        return;
      }

      const appt = json.data?.appointment;
      if (!appt) {
        alert("Appointment not found");
        return;
      }

      // Map server payload -> UI form data
      setFormData({
        AppointmentID: appt.AppointmentID ?? "",
        Name: appt.Name ?? "",
        ServiceID: appt.ServiceID != null ? String(appt.ServiceID) : "",
        Status: (appt.Status as AppointmentFormData["Status"]) ?? "Pending",
        ScheduledTime: isoToLocalDatetime(appt.ScheduledTime),
      });

      setPreviousStatus(appt.Status ?? "");
      setIdentifier(String(appt.AppointmentID ?? identifier));
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch appointment. Check console for details.");
    }
  };

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission via GraphQL mutation
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setErrors({});

  if (!identifier) {
    alert("Please fetch an appointment first!");
    return;
  }

  const idToUpdate = Number(identifier);
  if (Number.isNaN(idToUpdate)) {
    alert("Invalid appointment ID");
    return;
  }

  // convert datetime-local to ISO (or leave undefined if empty)
  const isoScheduled =
    formData.ScheduledTime && formData.ScheduledTime !== ""
      ? new Date(formData.ScheduledTime).toISOString()
      : undefined;

  // Build data object only with provided fields to avoid sending nulls
  const dataPayload: Record<string, any> = {
  AppointmentID: idToUpdate, // Add this line
};

if (formData.Name !== undefined && formData.Name !== "") dataPayload.Name = formData.Name;
if (formData.ServiceID !== undefined && formData.ServiceID !== "") {
  const parsed = parseInt(formData.ServiceID as string, 10);
  if (!Number.isNaN(parsed)) dataPayload.ServiceID = parsed;
  else {
    setErrors({ ServiceID: { msg: "ServiceID must be a number" } });
    return;
  }
}
if (formData.Status !== undefined) dataPayload.Status = formData.Status;
if (isoScheduled !== undefined) dataPayload.ScheduledTime = isoScheduled;


  if (Object.keys(dataPayload).length === 0) {
    alert("No changes to submit.");
    return;
  }

  const mutation = `
    mutation UpdateAppointment($id: Int!, $data: UpdateAppointmentDTO!) {
      updateAppointmentByID(id: $id, data: $data) {
        AppointmentID
        Name
        ServiceID
        Status
        ScheduledTime
      }
    }
  `;

  const variables = { id: idToUpdate, data: dataPayload };

  try {
    console.log("Outgoing GraphQL payload:", JSON.stringify({ query: mutation, variables }, null, 2));

    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const json = await res.json();
    console.log("Update response (raw):", json);

    if (json.errors && json.errors.length) {
      console.error("GRAPHQL ERRORS (stringified):", JSON.stringify(json.errors, null, 2));
      setErrors({ general: { msg: json.errors[0].message || "Update failed" } });
      alert(json.errors[0].message || "Failed to update appointment");
      return;
    }

    const updated = json.data?.updateAppointmentByID;
    if (!updated) {
      alert("Unexpected server response");
      return;
    }

    // handle income generation logic
    const prevStatus = previousStatus || "";
    const newStatus = formData.Status || "";
    const appointmentId = updated.AppointmentID ?? idToUpdate;

    // Only trigger income if status changed to Completed
    if (prevStatus.toLowerCase() !== "completed" && newStatus.toLowerCase() === "completed") {
      try {
        await fetch(`${INCOME_ENDPOINT}/${appointmentId}`, { method: "POST" });
        alert("Appointment completed! Income has been generated automatically.");
      } catch (err) {
        console.error("Error creating income:", err);
        alert("Appointment updated, but failed to generate income.");
      }
    } else {
      alert("Appointment updated successfully!");
    }

    navigate("/AdminMain");
  } catch (err) {
    console.error("Network / fetch error:", err);
    alert("Failed to update appointment. Check console for details.");
  }
};



  return (
    <div className="bg-light py-5">
      <div className="container">
        <h1 className="text-center fw-bold mb-4 text-pink-600">Update Appointment</h1>

        {/* Fetch section */}
        <div className="bg-white p-3 rounded shadow-sm mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-md-6">
              <label className="form-label fw-semibold">Appointment ID</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="form-control"
                placeholder="Enter Appointment ID"
              />
            </div>
            <div className="col-md-3">
              <button type="button" onClick={fetchAppointment} className="btn btn-primary mt-4 w-100">
                Fetch Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        {formData && formData.AppointmentID !== "" && (
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label htmlFor="Name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={formData.Name || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Service ID */}
              <div className="col-md-6">
                <label htmlFor="ServiceID" className="form-label fw-semibold">
                  Service ID
                </label>
                <input
                  type="text"
                  id="ServiceID"
                  name="ServiceID"
                  value={formData.ServiceID || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <label htmlFor="Status" className="form-label fw-semibold">
                  Status
                </label>
                <select
                  id="Status"
                  name="Status"
                  value={formData.Status || "Pending"}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              {/* Scheduled Time */}
              <div className="col-md-6">
                <label htmlFor="ScheduledTime" className="form-label fw-semibold">
                  Scheduled Time
                </label>
                <input
                  type="datetime-local"
                  id="ScheduledTime"
                  name="ScheduledTime"
                  value={formData.ScheduledTime || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="text-end mt-4">
              <Link to="/AdminMain" className="btn btn-outline-secondary me-2">
                Cancel
              </Link>
              <button type="submit" className="btn btn-success text-white">
                Update Appointment
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
