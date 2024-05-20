import { createRouter, createWebHistory } from 'vue-router';
import MainContent from '@/components/MainContent.vue';
import KnowledgeBase from '@/components/KnowledgeBase.vue';

const routes = [
    {
        path: '/',
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
