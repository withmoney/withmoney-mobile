<template>
  <form>
    <md-card>
      <md-card-content>
        <md-field>
          <label for="name">Name</label>
          <md-input v-model="nameMutable" id="name" />
        </md-field>
        <md-field>
          <input type="text" id="value" v-model="valueMutable" class="md-input" />
          <md-icon>attach_money</md-icon>
        </md-field>
        <md-datepicker v-model="transactionDateMutable" id="transactionDate">
          <label>Transaction Day</label>
        </md-datepicker>
        <md-field>
          <label for="type">Type</label>
          <md-select v-model="typeMutable" name="type" id="type">
            <md-option value="in" id="type-in">In</md-option>
            <md-option value="out" id="type-out">Out</md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="AccountId">Account</label>
          <md-select v-model="AccountIdMutable" name="AccountId" id="account">
            <md-option
            v-for="account in accounts"
            :key="account.id"
            :value="account.id"
            :id="`account-${account.id}`"
            >
              {{account.name}}
            </md-option>
          </md-select>
        </md-field>
        <md-field>
          <label for="CategoryId">Category</label>
          <md-select v-model="CategoryIdMutable" name="CategoryId" id="category">
            <md-option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
            :id="`category-${category.id}`"
            >
              {{category.name}}
            </md-option>
          </md-select>
        </md-field>
        <div>
          <md-switch v-model="isPaidMutable" class="md-primary" id="isPaid">IsPaid?</md-switch>
        </div>
      </md-card-content>
      <md-card-actions>
        <md-button
        class="md-primary"
        @click="save"
        :disabled="isLoading"
        id="save"
      >Save</md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import Accounts from '../../services/accounts';
import Categories from '../../services/categories';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    AccountId: {
      type: Number,
      default: 0,
    },
    CategoryId: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: 'out',
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    transactionDate: {
      type: [String, Date],
      default: () => new Date(),
    },
    onSave: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      accounts: [],
      categories: [],
      isLoading: false,
      nameMutable: this.name,
      valueMutable: this.value,
      transactionDateMutable: this.transactionDate,
      typeMutable: this.type,
      isPaidMutable: this.isPaid,
      AccountIdMutable: this.AccountId,
      CategoryIdMutable: this.CategoryId,
    };
  },
  methods: {
    async save() {
      this.isLoading = true;

      await this.onSave({
        name: this.nameMutable,
        value: this.valueMutable,
        AccountId: this.AccountIdMutable,
        CategoryId: this.CategoryIdMutable,
        type: this.typeMutable,
        isPaid: this.isPaidMutable,
        transactionDate: this.transactionDateMutable,
      });

      this.isLoading = false;
    },

    async getAccounts() {
      const { data } = await Accounts.list();
      this.accounts = data;
    },
    async getCategories() {
      const { data } = await Categories.list({
        type: this.typeMutable,
      });

      this.categories = data;
    },
  },
  async created() {
    await this.getAccounts();
    await this.getCategories();
  },
};
</script>
