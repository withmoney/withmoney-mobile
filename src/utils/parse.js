import qs from 'querystring';

const renameFields = (data, scheme) => {
  const renamed = {
    ...data,
  };
  Object.keys(scheme).forEach((field) => {
    delete renamed[field];
    renamed[scheme[field]] = data[field];
  });

  return renamed;
};

const parseDate = (data, scheme) => renameFields(data, scheme);

export const parseMultDate = (pro, scheme) => pro.then(({ data }) => {
  if (typeof data.data !== 'undefined' && Array.isArray(data.data)) {
    data.data.map(item => parseDate(item, scheme));

    Promise.resolve(data);
  }

  return Promise.resolve(parseDate(data, scheme));
});

export const mountQuery = (url, query = {}) => {
  if (Object.keys(query).length) {
    return `${url}?${qs.stringify(query)}`;
  }

  return url;
};

const logout = () => {
  if (localStorage.getItem('token') || localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.reload();
  }
};

export const catchInvalidToken = fetch => fetch.catch((err) => {
  if (typeof err.response && err.response.data.message === 'Invalid auth token provided.') {
    logout();
  }

  throw err;
});

export default parseMultDate;
