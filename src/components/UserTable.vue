<template>
  <div class="q-pa-md">
    <q-table title="Usuários" :rows="users" :columns="columns" row-key="name">
      <template v-slot:top>
        <span class="text-h5"> Usuários </span>
        <q-space />

        <q-btn
          color="primary"
          label="Adicionar usuário"
          :to="{ name: 'formUser' }"
        />

        <!-- <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
      </template>

      <template v-slot:body-cell-female="props">
        <q-td :props="props">
          {{ props.row.female }}
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          {{ props.row.status }}
        </q-td>
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            color="negative"
            dense
            size="sm"
            @click="handleDeleteUser(props.row)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from "vue";
import usersService from "src/services/users";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "UserTable",

  setup() {
    const { list, remove } = usersService();
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

    const $q = useQuasar();

    const getUsers = async () => {
      try {
        const { data } = await list();
        // console.log(data);
        users.value = data.data;
        // pagination.value = data.meta.pagination;
        // console.log(pagination);
      } catch (err) {
        console.log(err);
      }
    };

    const handleDeleteUser = async (user) => {
      try {
        $q.dialog({
          title: "Remover usuário",
          message: `Deseja remover o usuário ${user.name} ?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await remove(user.id);

          $q.notify({
            message: "Usuário deletado com sucesso!",
            icon: "check",
            color: "positive",
          });
        });
      } catch (err) {
        $q.notify({
          message: "Erro ao deletar!",
          icon: "times",
          color: "negative",
        });
      }
    };

    return {
      columns,
      users,
      handleDeleteUser,
    };
  },
});
</script>
