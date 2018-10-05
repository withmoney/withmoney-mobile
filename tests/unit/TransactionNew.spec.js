import { createLocalVue, shallowMount } from '@vue/test-utils';
import VueMaterial from 'vue-material';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Moment from 'moment';
import TransactionNew from '../../src/pages/TransactionNew';
import actions from '../../src/store/actions';
import getters from '../../src/store/getters';
import router from '../../src/router';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueMaterial);
localVue.use(VueRouter);

describe('TransactionNew Component', () => {
  let store;
  let nowMock;
  let getTimezoneOffsetMock;

  beforeAll(() => {
    nowMock = Date.now;
    Date.now = () => 1537747200000;
    getTimezoneOffsetMock = global.Date.prototype.getTimezoneOffset;
    global.Date.prototype.getTimezoneOffset = function () {
        return 160;
    }
    store = new Vuex.Store({
      state: {
        state_month: {
          format: jest.fn().mockReturnValue(new Date(Date.now()).toISOString()),
        },
      },
      getters,
      actions,
    });

    global.localStorage = {
      getItem: jest.fn().mockReturnValue(JSON.stringify({
        id: '1',
        name: 'name',
      })),
    };
  });

  afterAll(() => {
    Date.now = nowMock;
    global.Date.prototype.getTimezoneOffset = getTimezoneOffsetMock;
  });

  describe('Render', () => {
    it('default', () => {
      const wrapper = shallowMount(TransactionNew, { store, localVue, router });

      expect(wrapper.isVueInstance).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
