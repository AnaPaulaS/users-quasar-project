import useApi from "src/composables/UseApi.js";

export default function usersService() {
  const { list, post, update, remove } = useApi("users");

  return {
    list,
    post,
    update,
    remove,
  };
}
