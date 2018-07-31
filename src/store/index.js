import Vue from 'vue';
import Vuex from 'vuex';
import Moment from 'moment';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    current_month: Moment(),
    state_month: Moment(),
    state_month_str: Moment().format('MMMM YY'),
    next_month_str: Moment().add(1, 'month').format('MMMM YY'),
    previous_month_str: Moment().subtract(1, 'month').format('MMMM YY'),
  },
  getters: {
    user(state) {
      return state.user;
    },
    current_month(state) {
      return state.current_month;
    },
    state_month(state) {
      return state.state_month;
    },
    state_month_str(state) {
      return state.state_month_str;
    },
    next_month_str(state) {
      return state.next_month_str;
    },
    previous_month_str(state) {
      return state.previous_month_str;
    },
  },
  mutations,
  actions,
});
