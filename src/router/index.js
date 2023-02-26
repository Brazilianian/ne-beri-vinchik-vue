import {createRouter, createWebHistory} from 'vue-router'
import MainPage from "@/pages/MainPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import InfoPage from "@/pages/InfoPage.vue";
import StatisticPage from "@/pages/StatisticPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/profile/:id',
            component: ProfilePage,
        },
        {
            path: '/about',
            component: InfoPage
        },
        {
            path: '/statistic',
            component: StatisticPage
        }
    ],
})

export default router
