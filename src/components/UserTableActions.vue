<template>
  <div class="q-gutter-sm">
    <q-btn
      icon="edit"
      color="primary"
      dense
      size="sm"
      @click="handleEditUser(row.id)"
    />

    <q-btn
      :icon="`${'row.status' === 'active' ? 'lock' : 'lock_open'}`"
      color="accent"
      dense
      size="sm"
      @click="handlePutUser(row)"
    />

    <q-btn
      icon="delete"
      color="negative"
      dense
      size="sm"
      @click="handleDeleteUser(row)"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import usersService from "src/services/users";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "UserTableActions",
  props: {
    row: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const { remove, put } = usersService();

    const $q = useQuasar();
    const router = useRouter();

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

          context.emit("someEvent");
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

          context.emit("someEvent");
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
      handleDeleteUser,
      handlePutUser,
      handleEditUser,
    };
  },
});
</script>
