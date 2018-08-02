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

export const catchInvalidToken = fetch => fetch.catch((err) => {
  if (err.response.data.message === 'Invalid auth token provided.') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    location.reload();
  }
  return Promise.reject(err);
});

export default parseMultDate;
