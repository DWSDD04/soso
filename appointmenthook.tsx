import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AppointmentFormData {
  Name: string;
  ServiceID: string;
  Status: "Pending" | "Completed" | "Cancelled" | string;
  ScheduledTime: string; // local datetime string: YYYY-MM-DDTHH:MM
}

interface FormErrors {
  Name?: { msg: string };
  ServiceID?: { msg: string };
  Status?: { msg: string };
  ScheduledTime?: { msg: string };
  general?: { msg: string };
  [key: string]: any;
}

interface AppointmentFormProps {
  initialData?: Partial<AppointmentFormData>; // for update
  appointmentID?: number; // undefined for add
  onSuccess?: () => void;
  graphQLEndpoint: string;
}

export default function AppointmentForm({
  initialData,
  appointmentID,
  onSuccess,
  graphQLEndpoint,
}: AppointmentFormProps) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<AppointmentFormData>({
    Name: "",
    ServiceID: "",
    Status: "Pending",
    ScheduledTime: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Convert datetime-local -> ISO string
  const toISOFromDatetimeLocal = (val: string): string | null => {
    if (!val) return null;
    let normalized = val;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(val)) normalized = `${val}:00`;
    const d = new Date(normalized);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const serviceIdNum = parseInt(formData.ServiceID, 10);
    if (Number.isNaN(serviceIdNum)) {
      setErrors({ ServiceID: { msg: "ServiceID must be a number" } });
      return;
    }

    const isoTime = toISOFromDatetimeLocal(formData.ScheduledTime);
    if (!isoTime) {
      setErrors({ ScheduledTime: { msg: "ScheduledTime must be a valid date/time" } });
      return;
    }

    setLoading(true);

    try {
      let mutation = "";
      let variables: Record<string, any> = {};

      if (appointmentID) {
        // Update
        mutation = `
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
        variables = {
          id: appointmentID,
          data: {
            AppointmentID: appointmentID, // ✅ required
            Name: formData.Name,
            ServiceID: serviceIdNum,
            Status: formData.Status,
            ScheduledTime: isoTime,
          },
        };
      } else {
        // Add
        mutation = `
          mutation CreateAppointment($data: CreateAppointmentDTO!) {
            createAppointment(data: $data) {
              AppointmentID
              Name
              ServiceID
              Status
              ScheduledTime
            }
          }
        `;
        variables = {
          data: {
            Name: formData.Name,
            ServiceID: serviceIdNum,
            Status: formData.Status,
            ScheduledTime: isoTime,
          },
        };
      }

      console.log("Outgoing GraphQL payload:", JSON.stringify({ query: mutation, variables }, null, 2));

      const res = await fetch(graphQLEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const json = await res.json();
      console.log("GraphQL response:", json);

      if (json.errors && json.errors.length) {
        setErrors({ general: { msg: json.errors[0].message || "GraphQL error" } });
        return;
      }

      if (onSuccess) onSuccess();
      else navigate("/AdminMain");
    } catch (err) {
      console.error("Network / fetch error:", err);
      setErrors({ general: { msg: "Network error — check backend is running" } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      {errors.general && <div className="alert alert-danger">{errors.general.msg}</div>}

      <div className="row g-3">
        {/* Name */}
        <div className="col-md-6">
          <label htmlFor="Name" className="form-label">Name</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className={`form-control ${errors.Name ? "is-invalid" : ""}`}
          />
          {errors.Name && <div className="invalid-feedback">{errors.Name.msg}</div>}
        </div>

        {/* ServiceID */}
        <div className="col-md-6">
          <label htmlFor="ServiceID" className="form-label">ServiceID</label>
          <input
            type="text"
            id="ServiceID"
            name="ServiceID"
            value={formData.ServiceID}
            onChange={handleChange}
            className={`form-control ${errors.ServiceID ? "is-invalid" : ""}`}
          />
          {errors.ServiceID && <div className="invalid-feedback">{errors.ServiceID.msg}</div>}
        </div>

        {/* Status */}
        <div className="col-md-6">
          <label htmlFor="Status" className="form-label">Status</label>
          <select
            id="Status"
            name="Status"
            value={formData.Status}
            onChange={handleChange}
            className={`form-select ${errors.Status ? "is-invalid" : ""}`}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {errors.Status && <div className="invalid-feedback">{errors.Status.msg}</div>}
        </div>

        {/* ScheduledTime */}
        <div className="col-md-6">
          <label htmlFor="ScheduledTime" className="form-label">Scheduled Time</label>
          <input
            type="datetime-local"
            id="ScheduledTime"
            name="ScheduledTime"
            value={formData.ScheduledTime}
            onChange={handleChange}
            className={`form-control ${errors.ScheduledTime ? "is-invalid" : ""}`}
          />
          {errors.ScheduledTime && <div className="invalid-feedback">{errors.ScheduledTime.msg}</div>}
        </div>
      </div>

      <div className="text-end mt-4">
        <button
          type="submit"
          className={`btn ${appointmentID ? "btn-success" : "btn-primary"}`}
          disabled={loading}
        >
          {loading ? (appointmentID ? "Updating..." : "Adding...") : appointmentID ? "Update Appointment" : "Add Appointment"}
        </button>
      </div>
    </form>
  );
}
