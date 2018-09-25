import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import Category from '../../../../src/components/forms/Category';

const localVue = createLocalVue();

localVue.use(VueMaterial);

describe('Category Component', () => {
  describe('Render', () => {
    it('default', () => {
      const onSave = jest.fn();
      const wrapper = shallowMount(Category, {
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
      const wrapper = mount(Category, {
        localVue,
        propsData: {
          onSave,
        },
        sync: false,
      });

      wrapper.find('#save').trigger('click');

      expect(onSave.mock.calls[0][0]).toHaveProperty('name');
      expect(onSave.mock.calls[0][0]).toHaveProperty('type');

      expect(onSave.mock.calls[0][0].name).toBe('');
      expect(onSave.mock.calls[0][0].type).toBe('out');
    });
  });
});
