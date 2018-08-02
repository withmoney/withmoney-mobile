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

export const catchInvalidToken = fetch => fetch.catch((err) => {
  if (err.response.data.message === 'Invalid auth token provided.') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.reload();
  }
  return err;
});

export default parseMultDate;
