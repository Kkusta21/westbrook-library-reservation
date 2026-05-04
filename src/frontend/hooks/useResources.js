import { useEffect, useState } from "react";
import { getAll, create, update, deleteResource as del } from "../services/resource.service";

const useResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll().then((data) => {
      setResources(data?.data || data || []);
    }).catch((err) => setError(err.message)).finally(() => setLoading(false));
  }, []);

  const createResource = async (data) => {
    const res = await create(data);
    const newItem = res?.data || res;
    setResources((prev) => [...prev, newItem]);
    return newItem;
  };

  const updateResource = async (id, data) => {
    const res = await update(id, data);
    const updated = res?.data || res;
    setResources((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  const deleteResource = async (id) => {
    await del(id);
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  return { resources, loading, error, createResource, updateResource, deleteResource };
};

export default useResources;
