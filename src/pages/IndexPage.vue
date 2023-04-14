<template>
  <q-page class="flex flex-center">
    <UserTable />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import UserTable from "components/UserTable.vue";

export default defineComponent({
  name: "IndexPage",

  components: {
    UserTable,
  },
});
</script>
