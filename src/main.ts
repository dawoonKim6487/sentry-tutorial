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

Sentry.init({
    app,
    dsn: "https://62285895ced74365ab5d72a54f51c2f2@o1168882.ingest.sentry.io/6261157",
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

