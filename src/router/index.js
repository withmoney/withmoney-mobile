import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/pages/Login';
import TransactionNew from '@/pages/TransactionNew';
import TransactionEdit from '@/pages/TransactionEdit';
import TransactionList from '@/pages/TransactionList';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Accounts from '@/pages/settings/Accounts';
import AccountNew from '@/pages/settings/AccountNew';
import AccountEdit from '@/pages/settings/AccountEdit';
import Categories from '@/pages/settings/Categories';
import CategoryNew from '@/pages/settings/CategoryNew';
import CategoryEdit from '@/pages/settings/CategoryEdit';
import store from '../store';

Vue.use(Router);

const insecure = (to, from, next) => {
  const token = localStorage.getItem('token');

  if (!store.getters.user && !token) {
    next();
    return;
  }

  next('/');
};

const secure = (to, from, next) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

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
      path: '/transactions/:id',
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
    {
      path: '/settings/accounts',
      name: 'Accounts',
      component: Accounts,
      beforeEnter: secure,
    },
    {
      path: '/settings/accounts/new',
      name: 'AccountNew',
      component: AccountNew,
      beforeEnter: secure,
    },
    {
      path: '/settings/accounts/edit/:id',
      name: 'AccountEdit',
      component: AccountEdit,
      beforeEnter: secure,
    },
    {
      path: '/settings/categories',
      name: 'Categories',
      component: Categories,
      beforeEnter: secure,
    },
    {
      path: '/settings/categories/new',
      name: 'CategoryNew',
      component: CategoryNew,
      beforeEnter: secure,
    },
    {
      path: '/settings/categories/edit/:id',
      name: 'CategoryEdit',
      component: CategoryEdit,
      beforeEnter: secure,
    },
  ],
});
