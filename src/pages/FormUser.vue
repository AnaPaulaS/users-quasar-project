<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 800px">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          filled
          v-model="form.name"
          label="Nome"
          hint="Nome completo"
          lazy-rules
          :rules="[myInputRules]"
        />

        <q-input
          filled
          v-model="form.email"
          label="Email"
          hint="Email"
          lazy-rules
          type="email"
          :rules="[myInputRules]"
        />

        <q-select
          outlined
          v-model="form.gender"
          :options="optionsGender"
          label="Gênero"
          lazy-rules
          :rules="[(val) => val || 'Selecione uma opção']"
        />

        <q-select
          outlined
          v-model="form.status"
          :options="optionsStatus"
          label="Status"
          :rules="[(val) => val || 'Selecione uma opção']"
        />

        <div>
          <q-btn label="Enviar" type="submit" color="primary" />
          <q-btn
            label="Cancelar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
            :to="{ name: 'home' }"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import usersService from "src/services/users";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "FormUser",

  setup() {
    const $q = useQuasar();
    const { post, getById, update } = usersService();
    const router = useRouter();
    const route = useRoute();

    const optionsGender = [
      { value: "female", label: "Feminino" },
      { value: "male", label: "Masculino" },
    ];
    const optionsStatus = [
      { value: "active", label: "Ativo" },
      { value: "inactive", label: "Inativo" },
    ];

    const form = ref({
      name: "",
      email: "",
      gender: "",
      status: "",
    });

    onMounted(() => {
      if (route.params.id) getUserById();
    });

    const getUserById = async () => {
      try {
        const { data } = await getById(route.params.id);

        form.value = {
          id: data.data.id,
          name: data.data.name,
          email: data.data.email,
          gender: {
            value: data.data.gender,
            label:
              optionsGender[
                optionsGender.findIndex((op) => op.value === data.data.gender)
              ].label,
          },
          status: {
            value: data.data.status,
            label:
              optionsStatus[
                optionsStatus.findIndex((op) => op.value === data.data.status)
              ].label,
          },
        };
      } catch (err) {
        console.error(err);
      }
    };

    const onSubmit = async () => {
      try {
        if (form.value.id) {
          await update({
            id: form.value.id,
            name: form.value.name,
            email: form.value.email,
            gender: form.value.gender.value,
            status: form.value.status.value,
          });
        } else {
          await post({
            name: form.value.name,
            email: form.value.email,
            gender: form.value.gender.value,
            status: form.value.status.value,
          });
        }
        router.push({ name: "home" });

        $q.notify({
          message: "Dados salvos com sucesso!",
          icon: "check",
          color: "positive",
        });
      } catch (err) {
        $q.notify({
          message: "Erro: ao processar usuário!",
          icon: "times",
          color: "negative",
        });
      }
    };

    const myInputRules = (val) => {
      if (val.length === 0) return "Campo obrigatório";
      if (val.length > 191) return "Limite máximo de caracteres atingido";
    };

    return {
      onSubmit,
      myInputRules,
      form,
      optionsGender,
      optionsStatus,
    };
  },
});
</script>
