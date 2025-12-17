import { useState } from "react";

export interface ProductFormData {
  ProductID?: string;
  Type: string;
  Name: string;
  Brand: string;
  CostPrice: string;
  quantity: string;
  Available: string | boolean;
  Description: string;
}

export interface FieldError {
  msg: string;
}

export interface ErrorObject {
  [key: string]: FieldError;
}

interface UseProductProps {
  initialData?: ProductFormData;
}

export function useProduct({ initialData }: UseProductProps = {}) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      ProductID: "",
      Type: "",
      Name: "",
      Brand: "",
      CostPrice: "",
      quantity: "",
      Available: "1",
      Description: "",
    }
  );

  const [errors, setErrors] = useState<ErrorObject>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addProduct = async () => {
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        Type: formData.Type,
        Name: formData.Name,
        Description: formData.Description || undefined,
        Brand: formData.Brand,
        CostPrice: parseFloat(formData.CostPrice),
        quantity: parseInt(formData.quantity, 10),
        Available: formData.Available === "1" || formData.Available === true,
      };

      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) setErrors(data.errors || {});
      return data;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string) => {
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        Type: formData.Type,
        Name: formData.Name,
        Description: formData.Description || undefined,
        Brand: formData.Brand,
        CostPrice: parseFloat(formData.CostPrice),
        quantity: parseInt(formData.quantity, 10),
        Available: formData.Available === "1" || formData.Available === true,
      };

      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) setErrors(data.errors || {});
      return data;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    loading,
    handleChange,
    addProduct,
    updateProduct,
  };
}
