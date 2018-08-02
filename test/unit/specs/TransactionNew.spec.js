import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import TransactionNew from '../../../src/pages/TransactionNew';
import store from '../../../src/store';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

describe('TransactionNew Component', () => {
  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(TransactionNew, { store, localVue });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
