const login = r => require.ensure([], () => r(require('@/pages/login/login.vue')), 'login');
const dashboard = r => require.ensure([], () => r(require('@/pages/dashboard/dashboard.vue')), 'dashboard');
const character = r => require.ensure([], () => r(require('@/pages/personnel/character.vue')), 'character');

let routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
    {
        path: '/character',
        name: 'character',
        component: character
    },
    {
        path: '/login',
        ame: 'login',
        component: login
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/dashboard'}
    }
];

export  default routes;