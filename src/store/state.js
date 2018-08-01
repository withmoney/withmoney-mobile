import Moment from 'moment';

export default {
  user: null,
  current_month: Moment(),
  state_month: Moment(),
  state_month_str: Moment().format('MMMM YY'),
  next_month_str: Moment().add(1, 'month').format('MMMM YY'),
  previous_month_str: Moment().subtract(1, 'month').format('MMMM YY'),
  flash_message: '',
};
