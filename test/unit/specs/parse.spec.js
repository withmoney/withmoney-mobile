import { catchInvalidToken } from '../../../src/utils/parse';

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
        expect(e.message).toBe('asd');
      }

      expect(global.localStorage.removeItem).toBeCalled();
      expect(global.location.reload).toBeCalled();

      expect(global.localStorage.removeItem.mock.calls[0][0]).toBe('token');
      expect(global.localStorage.removeItem.mock.calls[1][0]).toBe('user');
    });
  });
});
