import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '@/components/MainContent.vue';
import KnowledgeBase from '@/components/KnowledgeBase.vue';
import WelcomePage from '@/components/WelcomePage.vue'

const routes = [
    {
        path: '/',
        name: 'WelcomePage',
        component: WelcomePage,
    },
    {
        path: '/main-content',
        name: 'MainContent',
        component: MainContent,
    },
    {
        path: '/knowledge-base',
        name: 'KnowledgeBase',
        component: KnowledgeBase,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
