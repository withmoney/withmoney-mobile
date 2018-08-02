<template>
  <div>
    <md-toolbar>
      <router-link to="/">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Add new Transaction</h3>
    </md-toolbar>
    <form>
      <md-card>
        <md-card-content>
          <md-field>
            <label for="name">Name</label>
            <md-input v-model="name"  id="name" />
          </md-field>
          <md-field>
            <input type="text" id="value" v-model="value" class="md-input" />
            <md-icon>attach_money</md-icon>
          </md-field>
          <md-datepicker v-model="transactionDate">
            <label>Transaction Day</label>
          </md-datepicker>
          <md-field>
            <label for="type">Type</label>
            <md-select v-model="type" name="type" id="type">
              <md-option value="in">In</md-option>
              <md-option value="out">Out</md-option>
            </md-select>
          </md-field>
          <md-field>
            <label for="AccountId">Account</label>
            <md-select v-model="AccountId" name="AccountId" id="AccountId">
              <md-option v-for="account in accounts" :key="account.id" :value="account.id">
                {{account.name}}
              </md-option>
            </md-select>
          </md-field>
          <div>
            <md-switch v-model="isPaid" class="md-primary">IsPaid?</md-switch>
          </div>
        </md-card-content>
        <md-card-actions>
          <md-button class="md-primary" @click="save" :disabled="isLoading">Save</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Transaction from '../services/transactions';
import Accounts from '../services/accounts';

export default {
  data() {
    return {
      name: '',
      value: '',
      AccountId: 0,
      type: 'out',
      isPaid: false,
      transactionDate: new Date(),
      accounts: [],
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['state_month']),
  },
  methods: {
    async save() {
      this.isLoading = true;

      const transaction = await Transaction.create({
        name: this.name,
        value: this.value,
        isPaid: this.isPaid,
        type: this.type,
        transactionDate: this.transactionDate,
      });

      if (transaction.id) {
        this.$store.dispatch('showFlashMessage', 'Transanção salva com sucesso!');
      }

      this.$router.push('/');
    },
    async getAccounts() {
      const { data } = await Accounts.get();
      this.accounts = data;
    },
  },
  mounted() {
    this.transactionDate = this.state_month.format();
  },
  created() {
    this.getAccounts();
  },
};
</script>
