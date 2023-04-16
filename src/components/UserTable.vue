<template>
  <div class="q-pa-md">
    <q-table
      title="Usuários"
      :rows="users"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
    >
      <template v-slot:top>
        <UserTableTop :columns="columns" @some-event="searchCallback" />
      </template>

      <template v-slot:body-cell-gender="props">
        <q-td :props="props">
          {{ props.row.gender === "male" ? "Masculino" : "Feminino" }}
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          {{ props.row.status === "active" ? "Ativo" : "Inativo" }}
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <UserTableActions :row="props.row" @some-event="callback" />
        </q-td>
      </template>
    </q-table>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="pagination.page"
        :max="pagination.pages"
        :max-pages="4"
        direction-links
        @update:model-value="moreUsersPage"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import usersService from "src/services/users";
import UserTableActions from "src/components/UserTableActions.vue";
import UserTableTop from "src/components/UserTableTop.vue";

export default defineComponent({
  name: "UserTable",
  components: { UserTableActions, UserTableTop },

  setup() {
    const { list } = usersService();
    const users = ref([]);
    const filter = ref("");
    const columns = [
      {
        name: "name",
        align: "left",
        label: "Nome",
        field: "name",
        sortable: true,
      },
      {
        name: "email",
        align: "left",
        label: "Email",
        field: "email",
        sortable: true,
      },
      {
        name: "gender",
        align: "left",
        label: "Gênero",
        field: "gender",
        sortable: true,
      },
      {
        name: "status",
        align: "left",
        label: "Status",
        field: "status",
        sortable: true,
      },
      {
        name: "action",
        align: "center",
        label: "Ação",
        field: "action",
        sortable: false,
      },
    ];

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      pages: 2,
      rowsPerPage: 5,
    });

    onMounted(() => {
      getUsers(pagination.value.page);
    });

    const getUsers = async (page) => {
      try {
        const { data } = await list({ page: page });
        users.value = data.data;

        pagination.value.pages = data.meta.pagination.pages;
        pagination.value.rowsPerPage = data.meta.pagination.limit;
      } catch (err) {
        console.error(err);
      }
    };

    const callback = () => {
      getUsers(pagination.value.page);
    };

    const searchCallback = (user, pages) => {
      users.value = user;

      pagination.value.page = pages.page;
      pagination.value.pages = pages.pages;
      pagination.value.rowsPerPage = pages.rowsPerPage;
    };

    const moreUsersPage = async () => {
      const { data } = await list({ page: pagination.value.page });
      users.value.push(...data.data);
    };

    return {
      filter,
      columns,
      users,
      pagination,
      callback,
      searchCallback,
      moreUsersPage,
    };
  },
});
</script>
