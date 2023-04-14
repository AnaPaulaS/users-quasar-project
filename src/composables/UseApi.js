import { api } from "boot/axios";

export default function useApi(url) {
  const list = async () => {
    try {
      const data = await api.get(url);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const post = async (form) => {
    try {
      const { data } = await api.post(url, form);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const update = async (form) => {
    try {
      const { data } = await api.patch(`${url}/${form.id}`, form);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  const remove = async (form) => {
    try {
      const { data } = await api.delete(`${url}/${form.id}`);
      return data;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  };

  return {
    list,
    post,
    update,
    remove,
  };
}