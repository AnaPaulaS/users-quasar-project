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
        <q-td :props="props" class="q-gutter-sm">
          <q-btn
            icon="edit"
            color="primary"
            dense
            size="sm"
            @click="handleEditUser(props.row.id)"
          />

          <q-btn
            :icon="`${props.row.status === 'active' ? 'lock' : 'lock_open'}`"
            color="accent"
            dense
            size="sm"
            @click="handlePutUser(props.row)"
          />

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
import { defineComponent, ref, onMounted } from "vue";
import usersService from "src/services/users";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserTable",

  setup() {
    const { list, remove, put } = usersService();
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
    const router = useRouter();

    const getUsers = async () => {
      try {
        const { data } = await list();
        // console.log(data);
        users.value = data.data;
        // pagination.value = data.meta.pagination;
        // console.log(pagination);
      } catch (err) {
        console.error(err);
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

          getUsers();
        });
      } catch (err) {
        $q.notify({
          message: "Erro ao deletar!",
          icon: "times",
          color: "negative",
        });
      }
    };

    const handlePutUser = async (user) => {
      try {
        $q.dialog({
          title: "Status do usuário",
          message: `Deseja ${
            user.status === "active" ? "desativar" : "ativar"
          } o usuário?`,
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await put(user.id, {
            status: user.status === "active" ? "inactive" : "active",
          });

          $q.notify({
            message: "Usuário editado com sucesso!",
            icon: "check",
            color: "positive",
          });

          getUsers();
        });
      } catch (err) {
        $q.notify({
          message: "Erro ao desativar!",
          icon: "times",
          color: "negative",
        });
      }
    };

    const handleEditUser = async (id) => {
      router.push({ name: "formUser", params: { id } });
    };

    return {
      columns,
      users,
      handleDeleteUser,
      handlePutUser,
      handleEditUser,
    };
  },
});
</script>
