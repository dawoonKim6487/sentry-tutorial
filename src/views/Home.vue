<template>
  <div class="home">
    <button @click="testError('태그 이벤트')">기본 에러</button>
    <button @click="promiseError">강제 에러</button>
  </div>
</template>

<script lang="ts">
import * as Sentry from "@sentry/vue";
import axios from "axios";
import { defineComponent } from "vue";
export default defineComponent({
  name: "Home",
  methods: {
    testError(message: string) {
      console.log("이것도 확인가능");
      Sentry.setTag("local-tag", "로컬태그");
      Sentry.captureEvent({
        message,
        extra: {
          에러정보담기: "포맷은 자유로움",
          userId: "유저 정보 담을 수 있음",
        },
      });
      // Sentry.init({ sampleRate: 0.25 });
    },
    async promiseError() {
      try {
        const getData = await axios.get("https://tapi.wssw.kr/item", {
          params: {
            user_code: "ws_05000",
            table_prefix: "w2021",
            limit: 10,
            pageNum: 1,
          },
        });
        console.log(getData);
        // throw Error();
      } catch (err) {
        console.error(err);
        Sentry.captureException(err, (scope) => {
          scope.setTag("test", "test2");
          scope.setExtras({
            test: "123",
            에러정보: "에러에러",
          });
          return scope;
        });
      }
    },
  },
});
</script>
