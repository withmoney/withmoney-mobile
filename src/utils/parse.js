import qs from 'querystring';
import localStorage from 'localStorage';

export const renameFields = (data, scheme) => {
  const renamed = {
    ...data,
  };
  Object.keys(scheme).forEach((field) => {
    delete renamed[field];
    renamed[scheme[field]] = data[field];
  });

  return renamed;
};

const parseDate = scheme => data => renameFields(data, scheme);

export const parseMultDate = (pro, scheme = {}) => pro.then(({ data }) => {
  if (Array.isArray(data.data)) {
    const newData = data.data.map(parseDate(scheme));
    return Promise.resolve({
      data: newData,
    });
  }

  return Promise.resolve(renameFields(data, scheme));
});

export const parseItem = parser => data => parser(data);

export const parseData = (parser, data) => (
  Array.isArray(data) ? data.map(parseItem(parser)) : parseItem(parser)(data)
);

export const mountQuery = (url, query = {}) => {
  if (Object.keys(query).length) {
    return `${url}?${qs.stringify(query)}`;
  }

  return url;
};

const logout = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.reload();
  }
};

export const catchInvalidToken = fetch => fetch.catch((err) => {
  if (typeof err.response !== 'undefined') {
    if (err.response.data.message === 'Invalid auth token provided.') {
      logout();
    }
  }

  throw err;
});

export default parseMultDate;
