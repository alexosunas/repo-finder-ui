import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/pull-requests",
        name: "pullrequests",
        component: () => import("./components/PullRequestsList.vue"),
    },
    {
        path: "/commits",
        name: "commits",
        component: () => import("./components/Commits.vue"),
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;