import { createLocalVue, shallowMount, mount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import Vuex from 'vuex';
import FlashMessage from '../../../src/components/FlashMessage';
import getters from '../../../src/store/getters';
import actions from '../../../src/store/actions';
import mutations from '../../../src/store/mutations';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);

describe('FlashMessage Component', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        flash_message: '',
      },
      getters,
      actions,
      mutations,
    });
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(FlashMessage, { store, localVue });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Beravior should be', () => {
    it('hidden', () => {
      const wrapper = mount(FlashMessage, { store, localVue });

      expect(wrapper.vm.flash_message).toEqual('');
      expect(wrapper.vm.show_flash_message).toEqual(false);
    });

    it('show', async () => {
      const wrapper = shallowMount(FlashMessage, { store, localVue });

      await wrapper.vm.$store.dispatch('showFlashMessage', 'this is the message');

      expect(wrapper.vm.flash_message).toEqual('this is the message');
      expect(wrapper.vm.show_flash_message).toEqual(true);

      expect(wrapper.element).toMatchSnapshot();
    });

    it('hide the flash message', async () => {
      const wrapper = shallowMount(FlashMessage, { store, localVue });

      await wrapper.vm.$store.dispatch('showFlashMessage', 'this is the message');

      expect(wrapper.vm.flash_message).toEqual('this is the message');
      expect(wrapper.vm.show_flash_message).toEqual(true);

      wrapper.vm.hide();

      expect(wrapper.vm.flash_message).toEqual('');
      expect(wrapper.vm.show_flash_message).toEqual(false);
    });
  });
});
