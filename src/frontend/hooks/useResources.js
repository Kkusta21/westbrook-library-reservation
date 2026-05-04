import { useEffect, useState } from "react";
import {
  getAll,
  create,
  update,
  remove,
} from "../services/resource.service";

const useResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const data = await getAll();
      setResources(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch resources");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const createResource = async (data) => {
    try {
      const newResource = await create(data);
      setResources((prev) => [...prev, newResource]);
      return newResource;
    } catch (err) {
      setError(err.message || "Failed to create resource");
      throw err;
    }
  };

  const updateResource = async (id, data) => {
    try {
      const updatedResource = await update(id, data);
      setResources((prev) =>
        prev.map((r) => (r.id === id ? updatedResource : r))
      );
      return updatedResource;
    } catch (err) {
      setError(err.message || "Failed to update resource");
      throw err;
    }
  };

  const deleteResource = async (id) => {
    try {
      await remove(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete resource");
      throw err;
    }
  };

  return {
    resources,
    loading,
    error,
    createResource,
    updateResource,
    deleteResource,
  };
};

export default useResources;
