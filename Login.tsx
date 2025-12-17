import React, { useState, type FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "../components/Header";
import { setTitle } from "../slices/uiSlice"; // Redux action to set title
import { loginAdmin } from "../slices/authSlice";


export default function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Set dynamic header title on mount
  useEffect(() => {
    dispatch(setTitle("Enter Your Credentials"));
  }, [dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (email === "admin@example.com" && password === "1234") {
    dispatch(loginAdmin());
    navigate("/AdminMain");
  } else {
    alert("Invalid credentials. Try admin@example.com / 1234");
  }
};


  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Header reads title from Redux now */}
      <Header />

      <section className="flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="container text-center">
          <div className="card shadow p-5 mx-auto" style={{ maxWidth: "400px" }}>
            <h2 className="fw-bold text-pink-600 mb-4">Log In</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-pink btn-lg w-100">
                Log In
              </button>
            </form>

            <p className="mt-4 mb-0">
              Don’t have an account?{" "}
              <Link to="/adminmain" className="text-pink-600 fw-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
