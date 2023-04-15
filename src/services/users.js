import useApi from "src/composables/UseApi.js";

export default function usersService() {
  const { list, post, update, remove, put } = useApi("users");

  return {
    list,
    post,
    update,
    remove,
    put,
  };
}
