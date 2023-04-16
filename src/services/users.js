import useApi from "src/composables/UseApi.js";

export default function usersService() {
  const list = async (query) => {
    let endpoint = `?page=${query.page}`;
    if (query.name) endpoint += `&name=${query.name}`;
    if (query.email) endpoint += `&email=${query.email}`;
    if (query.gender) endpoint += `&gender=${query.gender}`;
    if (query.status) endpoint += `&status=${query.status}`;

    return useApi("users").list(endpoint);
  };

  const { getById, post, update, remove, put } = useApi("users");

  return {
    list,
    getById,
    post,
    update,
    remove,
    put,
  };
}
