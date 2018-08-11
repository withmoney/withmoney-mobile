import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import Account from '../../../../../src/components/forms/Account';

const localVue = createLocalVue();

localVue.use(VueMaterial);

describe('Account Component', () => {
  describe('Render', () => {
    it('default', () => {
      const onSave = jest.fn();
      const wrapper = shallowMount(Account, {
        localVue,
        propsData: { onSave },
      });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('onSave', () => {
      const onSave = jest.fn();
      const wrapper = mount(Account, {
        localVue,
        propsData: {
          onSave,
        },
        sync: false,
      });

      wrapper.find('#save').trigger('click');

      expect(onSave.mock.calls[0][0]).toHaveProperty('name');
      expect(onSave.mock.calls[0][0]).toHaveProperty('initalValue');
      expect(onSave.mock.calls[0][0]).toHaveProperty('type');

      expect(onSave.mock.calls[0][0].name).toBe('');
      expect(onSave.mock.calls[0][0].initalValue).toBe('');
      expect(onSave.mock.calls[0][0].type).toBe('checking_account');
    });
  });
});
