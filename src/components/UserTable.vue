<template>
  <div class="q-pa-md">
    <q-table title="Usuários" :rows="users" :columns="columns" row-key="name" />
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import usersService from "src/services/users";

export default defineComponent({
  name: "UserTable",

  setup() {
    const { list } = usersService();
    const users = ref([]);
    const pagination = ref([]);
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

    onMounted(() => {
      getUsers();
    });

    const getUsers = async () => {
      try {
        const { data } = await list();
        console.log(data);
        users.value = data.data;
        pagination.value = data.meta.pagination;
        console.log(pagination);
      } catch (err) {
        console.log(err);
      }
    };

    return {
      columns,
      users,
    };
  },
});
</script>
