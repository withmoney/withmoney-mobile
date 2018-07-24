import Moment from 'moment';
import 'moment/locale/pt-br';
import mutations from '../../../../src/store/mutations';
import actions from '../../../../src/store/actions';
import * as types from '../../../../src/store/types';

const {
  ADD_USER,
  TO_CURRENT_MONTH,
  TO_PREVIUS_MONTH,
  TO_NEXT_MONTH,
} = mutations;
const {
  addUser,
  toNextMonth,
  toCurrentMonth,
  toPreviousMonth,
} = actions;

describe('store', () => {
  let state;

  beforeEach(() => {
    Date.now = () => 1532473578215;

    state = {
      user: null,
      current_month: Moment(),
      state_month: Moment(),
      state_month_str: Moment().format('MMMM YY'),
      next_month_str: Moment().add(1, 'month').format('MMMM YY'),
      previous_month_str: Moment().subtract(1, 'month').format('MMMM YY'),
    };
  });

  describe('actions', () => {
    let commit;

    beforeEach(() => {
      commit = jest.fn();
    });

    it('toNextMonth', () => {
      toNextMonth({ commit });

      expect(commit).toBeCalled();
      expect(commit.mock.calls[0][0]).toBe(types.TO_NEXT_MONTH);
    });

    it('toCurrentMonth', () => {
      toCurrentMonth({ commit });

      expect(commit).toBeCalled();
      expect(commit.mock.calls[0][0]).toBe(types.TO_CURRENT_MONTH);
    });

    it('toPreviousMonth', () => {
      toPreviousMonth({ commit });

      expect(commit).toBeCalled();
      expect(commit.mock.calls[0][0]).toBe(types.TO_PREVIUS_MONTH);
    });

    it('addUser', () => {
      const user = {
        name: 'david',
      };

      addUser({ commit }, user);

      expect(commit).toBeCalled();
      expect(commit.mock.calls[0][0]).toBe(types.ADD_USER);
      expect(commit.mock.calls[0][1]).toEqual(user);
    });
  });

  describe('mutations', () => {
    it('ADD_USER', () => {
      ADD_USER(state, {
        name: 'david',
      });

      expect(state.user).toEqual({
        name: 'david',
      });
    });

    it('TO_CURRENT_MONTH', () => {
      TO_CURRENT_MONTH(state);

      expect(state.state_month.toISOString()).toEqual('2018-07-24T23:06:18.215Z');
      expect(state.state_month_str).toEqual('julho 18');
      expect(state.next_month_str).toEqual('agosto 18');
      expect(state.previous_month_str).toEqual('junho 18');
    });

    it('TO_PREVIUS_MONTH', () => {
      expect(state.state_month.toISOString()).toEqual('2018-07-24T23:06:18.215Z');
      expect(state.state_month_str).toEqual('julho 18');
      expect(state.next_month_str).toEqual('agosto 18');
      expect(state.previous_month_str).toEqual('junho 18');

      TO_PREVIUS_MONTH(state);

      expect(state.state_month.toISOString()).toEqual('2018-06-24T23:06:18.215Z');
      expect(state.state_month_str).toEqual('junho 18');
      expect(state.next_month_str).toEqual('julho 18');
      expect(state.previous_month_str).toEqual('maio 18');
    });

    it('TO_NEXT_MONTH', () => {
      expect(state.state_month.toISOString()).toEqual('2018-07-24T23:06:18.215Z');
      expect(state.state_month_str).toEqual('julho 18');
      expect(state.next_month_str).toEqual('agosto 18');
      expect(state.previous_month_str).toEqual('junho 18');

      TO_NEXT_MONTH(state);

      expect(state.state_month.toISOString()).toEqual('2018-08-24T23:06:18.215Z');
      expect(state.state_month_str).toEqual('agosto 18');
      expect(state.next_month_str).toEqual('setembro 18');
      expect(state.previous_month_str).toEqual('julho 18');
    });
  });
});
