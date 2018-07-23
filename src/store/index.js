import Vue from 'vue';
import Vuex from 'vuex';
import Moment from 'moment';

const ADD_USER = 'ADD_USER';
const TO_CURRENT_MONTH = 'TO_CURRENT_MONTH';
const TO_PREVIUS_MONTH = 'TO_PREVIUS_MONTH';
const TO_NEXT_MONTH = 'TO_NEXT_MONTH';

Vue.use(Vuex);

const updateStatesMont = (state) => {
  state.state_month_str = state.state_month.format('MMMM YY');
  state.next_month_str = Moment(state.state_month).add(1, 'month').format('MMMM YY');
  state.previous_month_str = Moment(state.state_month).subtract(1, 'month').format('MMMM YY');
};

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
  mutations: {
    [ADD_USER](state, payload) {
      state.user = payload;
    },
    [TO_CURRENT_MONTH](state) {
      state.state_month = state.current_month;
      updateStatesMont(state);
    },
    [TO_PREVIUS_MONTH](state) {
      state.state_month = Moment(state.state_month).subtract(1, 'month');
      updateStatesMont(state);
    },
    [TO_NEXT_MONTH](state) {
      state.state_month = Moment(state.state_month).add(1, 'month');
      updateStatesMont(state);
    },
  },
  actions: {
    addUser({ commit }, payload) {
      commit(ADD_USER, payload);
    },
    toNextMonth({ commit }) {
      commit(TO_NEXT_MONTH);
    },
    toCurrentMonth({ commit }) {
      commit(TO_CURRENT_MONTH);
    },
    toPreviousMonth({ commit }) {
      commit(TO_PREVIUS_MONTH);
    },
  },
});
