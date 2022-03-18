<template>
  <div class="home">
    <button @click="testError('유저 아이디 확인')">기본 에러</button>
    <button @click="testError('test2')">기본 에러</button>
  </div>
</template>

<script lang="ts">
import * as Sentry from "@sentry/vue";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  methods: {
    testError(message: string) {
      console.log("이것도 확인가능");
      Sentry.captureEvent({
        message,
        extra: {
          에러정보담기: "포맷은 자유로움",
          userId: "유저 정보 담을 수 있음",
        },
      });
      // Sentry.init({ sampleRate: 0.25 });
    },
  },
});
</script>
