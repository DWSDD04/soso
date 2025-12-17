// src/hooks/useService.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ----------------------------
// Types
// ----------------------------
interface ServiceForm {
  ServiceID: string;
  Type: string;
  Name: string;
  Description: string;
  Price: string;
  Duration: string;
  Available: string;
}

interface FieldError {
  msg: string;
}

interface ErrorResponse {
  [key: string]: FieldError;
}

export const useService = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ServiceForm>({
    ServiceID: "",
    Type: "",
    Name: "",
    Description: "",
    Price: "",
    Duration: "",
    Available: "1",
  });

  const [errors, setErrors] = useState<ErrorResponse>({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add service
  const addService = async () => {
    setLoading(true);

    // Prepare payload
    const payload = {
      ServiceID: formData.ServiceID,
      Type: formData.Type,
      Name: formData.Name,
      Description: formData.Description || undefined,
      Price: parseFloat(formData.Price),
      Duration: parseInt(formData.Duration, 10),
      Available: formData.Available === "1",
    };

    try {
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setErrors({});
        navigate("/AdminMain");
        return data;
      } else {
        setErrors(data.errors || {});
        return null;
      }
    } catch (err) {
      console.error("Error adding service:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, errors, loading, addService };
};
