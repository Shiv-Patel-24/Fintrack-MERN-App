import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import "./UserList.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = useCallback(
    async (page) => {
      try {
        const response = await api.get("/admin/users", {
          params: { page },
        });
        setUsers(response.data.users);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        alert("Could not fetch users. You may not be an admin.");
        navigate("/");
      }
    },
    [navigate]
  );

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, fetchUsers]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    alert("You have been logged out.");
    navigate("/");
  };

  const handleDeleteUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setUsers(users.filter((user) => user._id !== userId));
        // Refetch users to ensure pagination is consistent after deletion
        fetchUsers(currentPage);
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
      alert("User role updated successfully.");
    } catch (error) {
      console.error("Failed to update role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>User Management</h1>
        <Link
          to="/dashboard"
          className="nav-link"
          style={{ marginRight: "1rem" }}
        >
          Dashboard
        </Link>
        <button onClick={handleLogout} className="admin-logout-btn">
          Logout
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>
                <Link to={`/users/${user._id}`} className="user-details-link">
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>
                <select
                  className="role-selector"
                  value={user.role}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="delete-action-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={fetchUsers}
      />
    </div>
  );
}

export default UserList;
