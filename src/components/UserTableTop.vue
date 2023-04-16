<template>
  <span class="text-h5"> Usuários </span>
  <q-space />

  <q-select
    square
    v-model="query"
    dense
    options-dense
    emit-value
    map-options
    :options="columns"
    option-value="name"
    options-cover
    style="min-width: 150px"
    label="Buscar por"
  />

  <q-input
    dense
    debounce="300"
    color="primary"
    v-model="filter"
    label="Insira o termo"
  >
    <template v-slot:append>
      <q-btn
        v-if="showSearch"
        icon="search"
        color="primary"
        dense
        size="sm"
        @click="searchUser()"
      />
      <q-btn
        v-else
        icon="close"
        color="primary"
        dense
        size="sm"
        @click="clearSearchUser()"
      />
    </template>
  </q-input>

  <q-space />

  <q-btn color="primary" label="Adicionar usuário" :to="{ name: 'formUser' }" />
</template>

<script>
import { defineComponent, ref } from "vue";
import usersService from "src/services/users";

export default defineComponent({
  name: "UserTableTop",
  props: {
    columns: {},
  },

  setup(props, context) {
    const { list } = usersService();

    const filter = ref("");
    const query = ref("");
    const showSearch = ref(true);

    const searchUser = async () => {
      const form = {};
      form.page = 1;
      form[query.value] = filter.value;
      const { data } = await list(form);

      context.emit("someEvent", data.data, {
        page: 1,
        pages: data.meta.pagination.pages,
        rowsPerPage: data.meta.pagination.limit,
      });

      showSearch.value = false;
    };

    const clearSearchUser = async () => {
      const { data } = await list({ page: 1 });

      context.emit("someEvent", data.data, {
        page: 1,
        pages: data.meta.pagination.pages,
        rowsPerPage: data.meta.pagination.limit,
      });

      showSearch.value = true;
      filter.value = "";
      query.value = "";
    };

    return {
      filter,
      query,
      showSearch,
      searchUser,
      clearSearchUser,
    };
  },
});
</script>
