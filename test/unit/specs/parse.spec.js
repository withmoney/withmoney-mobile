import { catchInvalidToken, mountQuery } from '../../../src/utils/parse';

describe('parse utils', () => {
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

      expect(global.localStorage.getItem).toBeCalled();
      expect(global.localStorage.removeItem).toBeCalled();
      expect(global.location.reload).toBeCalled();

      expect(global.localStorage.getItem.mock.calls[0][0]).toBe('token');

      expect(global.localStorage.removeItem.mock.calls[0][0]).toBe('token');
      expect(global.localStorage.removeItem.mock.calls[1][0]).toBe('user');
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
