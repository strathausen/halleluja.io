<template>
  <div class="home">
    <ReportManagement />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ReportManagement from "@/components/ReportManagement.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Beitraege",
  components: {
    ReportManagement
  }
});
</script>
