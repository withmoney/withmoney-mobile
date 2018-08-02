import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import TransactionNew from '@/pages/TransactionNew';
import TransactionEdit from '@/pages/TransactionEdit';
import TransactionList from '@/pages/TransactionList';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import store from '../store';

Vue.use(Router);

const insecure = (to, from, next) => {
  const token = window.localStorage.getItem('token');

  if (!store.getters.user && !token) {
    next();
    return;
  }

  next('/');
};

const secure = (to, from, next) => {
  const token = window.localStorage.getItem('token');
  const user = window.localStorage.getItem('user');

  store.dispatch('addUser', JSON.parse(user));

  if (store.getters.user || token) {
    next();
    return;
  }

  next('/login');
};

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: insecure,
    },
    {
      path: '/',
      name: 'TransactionList',
      component: TransactionList,
      beforeEnter: secure,
    },
    {
      path: '/transaction/:id',
      name: 'TransactionEdit',
      component: TransactionEdit,
      beforeEnter: secure,
    },
    {
      path: '/transaction-new',
      name: 'TransactionNew',
      component: TransactionNew,
      beforeEnter: secure,
    },
    {
      path: '/reports',
      name: 'Reports',
      component: Reports,
      beforeEnter: secure,
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      beforeEnter: secure,
    },
  ],
});
