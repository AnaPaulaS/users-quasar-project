import useApi from "src/composables/UseApi.js";

export default function usersService() {
  const { list, getById, post, update, remove, put } = useApi("users");

  return {
    list,
    getById,
    post,
    update,
    remove,
    put,
  };
}
