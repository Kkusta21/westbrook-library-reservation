import { useEffect, useState } from "react";
import { getAll, create, update, deactivate } from "../services/user.service";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll().then((data) => {
      setUsers(data?.data || data || []);
    }).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const createUser = async (data) => {
    const res = await create(data);
    const newItem = res?.data || res;
    setUsers((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateUser = async (id, data) => {
    const res = await update(id, data);
    const updated = res?.data || res;
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    return updated;
  };

  const deactivateUser = async (id) => {
    const res = await deactivate(id);
    const updated = res?.data || res;
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
    return updated;
  };

  return { users, loading, error, createUser, updateUser, deactivateUser };
};

export default useUsers;
