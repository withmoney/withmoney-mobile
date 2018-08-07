import Moment from 'moment';

export const decorateDate = date => Moment(date).format('MM/DD');

export default decorateDate;
