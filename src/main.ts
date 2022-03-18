import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";


const app = createApp(App);

app.config.globalProperties.$Sentry = Sentry;
app.config.globalProperties.$test = 'test';

app.use(store);
app.use(router);
app.mount("#app");

// Sentry.setUser({ username: "dawoon-test" });
Sentry.setContext('사용자 정보', { username: "dawoon" });
Sentry.setTag("global-tag", "전역태그");
Sentry.init({
    app,
    dsn: "https://62285895ced74365ab5d72a54f51c2f2@o1168882.ingest.sentry.io/6261157",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
    release: "sentry-test 1.0", // 현재 릴리즈 버전 env 사용하면 될듯
    environment: "develope" // 환경 설정 개발 환경인지 상용인지 env로 판단가능할듯 
});

