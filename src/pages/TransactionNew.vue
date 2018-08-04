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
    <transaction-form
      :transactionDate="state_month.format()"
      :onSave="onSave"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TransactionForm from '../components/forms/Transaction';
import Transaction from '../services/transactions';
// import Accounts from '../services/accounts';

export default {
  components: {
    TransactionForm,
  },
  // data() {
  //   return {
  //     // name: '',
  //     // value: '',
  //     // AccountId: 0,
  //     // type: 'out',
  //     // isPaid: false,
  //     // transactionDate: new Date(),
  //     // accounts: [],
  //   };
  // },
  computed: {
    ...mapGetters(['state_month']),
  },
  methods: {
    async onSave(data) {
      const transaction = await Transaction.create(data);

      if (transaction.id) {
        this.$store.dispatch('showFlashMessage', 'Transanção salva com sucesso!');
      }

      this.$router.push('/');
    },
  },
  mounted() {
    // this.transactionDate = this.state_month.format();
  },
};
</script>
