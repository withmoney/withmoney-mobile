import { mount } from 'vue-test-utils';
import Login from '../../src/pages/Login';

describe('Login Page', () => {
  describe('Render', () => {
    it('default', () => {
      const wrapper = mount(Login);

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
