import {
  catchInvalidToken,
  mountQuery,
  renameFields,
  parseMultDate,
} from '../../src/utils/parse';

describe('parse utils', () => {
  describe('renameFields', () => {
    it('should replace fields', () => {
      const data = {
        name: 'David',
        idade: 18,
      };
      const scheme = {
        idade: 'age',
      };
      expect(renameFields(data, scheme)).toEqual({
        name: 'David',
        age: 18,
      });
    });
  });

  describe('parseMultDate should replace when is', () => {
    it('object', async () => {
      const data = {
        name: 'David',
        idade: 18,
      };
      const scheme = {
        idade: 'age',
      };
      const result = await parseMultDate(Promise.resolve({ data }), scheme);

      expect(result).toEqual({
        name: 'David',
        age: 18,
      });
    });

    it('array', async () => {
      const data = {
        name: 'David',
        idade: 18,
      };
      const scheme = {
        idade: 'age',
      };
      const result = await parseMultDate(Promise.resolve({ data: { data: [data] } }), scheme);

      expect(result).toEqual({
        data: [
          {
            name: 'David',
            age: 18,
          },
        ],
      });
    });
  });

  describe('catchInvalidToken', () => {
    let fetch;
    let localStorageLocal;
    let reloadLocal;

    beforeEach(() => {
      localStorageLocal = global.localStorage;
      reloadLocal = global.location.reload;

      fetch = jest.fn();
      global.localStorage = {
        getItem: jest.fn().mockReturnValue('abc'),
        removeItem: jest.fn(),
      };
      global.location.reload = jest.fn();
    });

    afterEach(() => {
      global.localStorage = localStorageLocal;
      global.location.reload = reloadLocal;
    });

    it('get catch error', async () => {
      fetch.mockRejectedValue({
        response: {
          data: {
            message: 'Invalid auth token provided.',
          },
        },
      });

      try {
        await catchInvalidToken(fetch());
      } catch (e) {
        expect(e.response.data.message).toBe('Invalid auth token provided.');
      }

      expect(global.location.reload).toBeCalled();
    });

    it('get error on network', async () => {
      fetch.mockRejectedValue(new Error('Network'));

      try {
        await catchInvalidToken(fetch());
      } catch (e) {
        expect(e.message).toBe('Network');
      }
    });
  });

  describe('mountQuery parse url ', () => {
    let url;

    beforeAll(() => {
      url = 'http://domain.com/test';
    });

    it('with query', () => {
      const query = {
        page: 1,
        limit: 20,
      };

      expect(mountQuery(url, query)).toBe('http://domain.com/test?page=1&limit=20');
    });

    it('without query', () => {
      expect(mountQuery(url)).toBe('http://domain.com/test');
    });
  });
});
