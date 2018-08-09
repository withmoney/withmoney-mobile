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

export default {
  components: {
    TransactionForm,
  },
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
};
</script>
