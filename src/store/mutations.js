import Moment from 'moment';
import * as types from './types';
import { updateStatesMont } from '../utils/state';

export default {
  [types.ADD_USER](state, payload) {
    state.user = payload;
  },
  [types.TO_CURRENT_MONTH](state) {
    state.state_month = state.current_month;
    updateStatesMont(state);
  },
  [types.TO_PREVIUS_MONTH](state) {
    state.state_month = Moment(state.state_month).subtract(1, 'month');
    updateStatesMont(state);
  },
  [types.TO_NEXT_MONTH](state) {
    state.state_month = Moment(state.state_month).add(1, 'month');
    updateStatesMont(state);
  },
  [types.FLASH_MESSAGE_SHOW](state, payload) {
    state.flash_message = payload;
  },
  [types.FLASH_MESSAGE_HIDE](state) {
    state.flash_message = '';
  },
};
