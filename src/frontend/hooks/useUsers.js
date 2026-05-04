import { useEffect, useState } from "react";
import {
  getAll,
  create,
  update,
  deactivate,
} from "../services/user.service";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = async (data) => {
    try {
      const newUser = await create(data);
      setUsers((prev) => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message || "Failed to create user");
      throw err;
    }
  };

  const updateUser = async (id, data) => {
    try {
      const updatedUser = await update(id, data);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to update user");
      throw err;
    }
  };

  const deactivateUser = async (id) => {
    try {
      const updatedUser = await deactivate(id);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? updatedUser : u))
      );
      return updatedUser;
    } catch (err) {
      setError(err.message || "Failed to deactivate user");
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deactivateUser,
  };
};

export default useUsers;
