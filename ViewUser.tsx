import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

// Type for a User
interface User {
  UserID: number | string;
  Username: string;
  Email: string;
  Status: "Admin" | "Employee" | "Client" | string;
}

export default function ViewUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user");
        const data: User[] = await res.json();

        if (res.ok) {
          setUsers(data);
        } else {
          console.error("Error fetching users:", data);
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Header />
      <MenuBar />

      <section className="py-5 flex-grow-1">
        <div className="container">
          <h1 className="mb-4 text-center fw-bold text-primary">
            All Registered Users
          </h1>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.UserID}>
                      <td>{user.UserID}</td>
                      <td>{user.Username}</td>
                      <td>{user.Email}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.Status === "Admin"
                              ? "bg-danger"
                              : user.Status === "Employee"
                              ? "bg-warning text-dark"
                              : "bg-success"
                          }`}
                        >
                          {user.Status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/users/${user.UserID}`}
                            className="btn btn-sm btn-primary"
                          >
                            View
                          </Link>
                          <Link
                            to={`/users/update/${user.UserID}`}
                            className="btn btn-sm btn-warning"
                          >
                            Edit
                          </Link>
                          <Link
                            to={`/users/delete/${user.UserID}`}
                            className="btn btn-sm btn-danger"
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="alert alert-secondary text-center">
              No users found.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
