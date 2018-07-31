import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.MYMONEY_API}api/v1/`,
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${localStorage.getItem('token')}`;
      },
    },
  },
});

