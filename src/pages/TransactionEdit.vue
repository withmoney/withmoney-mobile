<template>
  <div>
    <md-toolbar>
      <router-link to="/">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Transaction: {{name}}</h3>
    </md-toolbar>
    <transaction-form
      v-if="transaction"
      :name="name"
      :value="value"
      :AccountId="AccountId"
      :type="type"
      :isPaid="isPaid"
      :transactionDate="transactionDate"
      :onSave="onSave"
    />
  </div>
</template>

<script>
import Transaction from '../services/transactions';
import TransactionForm from '../components/forms/Transaction';

export default {
  components: {
    TransactionForm,
  },
  data() {
    return {
      name: '',
      value: '',
      AccountId: 0,
      type: 'out',
      isPaid: false,
      transactionDate: '',
      accounts: [],
      transaction: null,
      isLoading: false,
    };
  },
  methods: {
    async onSave(data) {
      const transaction = await Transaction.update(this.$route.params.id, data);

      if (transaction.id) {
        this.$store.dispatch('showFlashMessage', 'Transanção salva com sucesso!');
      }

      this.$router.push('/');
    },
    async getTransaction() {
      const data = await Transaction.getTransaction(this.$route.params.id);

      this.name = data.name;
      this.value = data.value;
      this.isPaid = data.isPaid;
      this.transactionDate = data.transactionDate;
      this.type = data.type;
      this.AccountId = data.AccountId;

      this.transaction = data;
    },
  },
  created() {
    this.getTransaction();
  },
};
</script>
