import Moment from 'moment';

export const updateStatesMont = (state) => {
  state.state_month_str = state.state_month.format('MMMM YY');
  state.next_month_str = Moment(state.state_month).add(1, 'month').format('MMMM YY');
  state.previous_month_str = Moment(state.state_month).subtract(1, 'month').format('MMMM YY');
};

export default updateStatesMont;
