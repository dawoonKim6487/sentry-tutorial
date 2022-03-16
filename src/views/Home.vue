<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="testError">err</button>
  </div>
</template>

<script lang="ts">
import * as Sentry from "@sentry/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  methods: {
    testError() {
      Sentry.captureMessage("Something went wrong");
      // Sentry.init({ sampleRate: 0.25 });
    },
  },
});
</script>
