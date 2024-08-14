import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true
    }
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: 'Main Page'
        },
        {
          path: '/order',
          component: './order/index',
          title: 'Order',
          auth: true
        },
        {
          path: '/user',
          component: './user/index',
          title: 'My page',
          auth: true
        },
        {
          path: '/user/edit',
          component: './user/edit',
          title: 'Settings'
        },
        {
          path: '/search',
          component: './search/index',
          title: 'Search'
        },
        {
          path: '/observer',
          component: './observer',
          title: 'observer'
        },
        {
          path: '/house',
          component: './house',
          title: 'Details'
        },
        {
          path: '/login',
          component: './login',
          title: 'Login'
        },
        {
          path: '/register',
          component: './register',
          title: 'Register'
        },
      ]
    }
  ],
});
