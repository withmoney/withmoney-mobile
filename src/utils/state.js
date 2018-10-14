import Moment from 'moment';

export const updateStatesMont = (state) => {
  state.state_month_str = state.state_month.format('MMM YY');
  state.next_month_str = Moment(state.state_month).add(1, 'month').format('MMM YY');
  state.previous_month_str = Moment(state.state_month).subtract(1, 'month').format('MMM YY');
};

export default updateStatesMont;
