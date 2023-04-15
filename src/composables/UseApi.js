import { api } from "boot/axios";

export default function useApi(url) {
  const config = {
    headers: {
      Authorization: `Bearer 4ece45dad01dade2e5b071e68faa83dc8111c78aa75c2a9b51292a5976bcae91`,
    },
  };

  const list = async () => {
    try {
      const data = await api.get(url, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const getById = async (id) => {
    try {
      const data = await api.get(`${url}/${id}`, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const update = async (form) => {
    try {
      const { data } = await api.patch(`${url}/${form.id}`, form, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const put = async (id, form) => {
    try {
      const { data } = await api.put(`${url}/${id}`, form, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`, config);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  return {
    list,
    getById,
    post,
    update,
    put,
    remove,
  };
}
