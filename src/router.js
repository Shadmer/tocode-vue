// default
import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home';


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/:pathMatch(.*)',
            name: 'not-found',
            component: () => import('./pages/NotFound')
        },
    ]
});

export default router;

