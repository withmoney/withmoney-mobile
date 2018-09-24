<template>
  <div class="full-height">
    <md-toolbar class="toolbar">
      <router-link :to="{ path: '/', query: { type } }">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Add new Transaction</h3>
    </md-toolbar>
    <div class="content-scroll">
      <transaction-form
        :transactionDate="state_month.format()"
        :type="type"
        :onSave="onSave"
      />
    </div>
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
  data() {
    return {
      type: typeof this.$route.query.type !== 'undefined' ? this.$route.query.type : 'in',
    };
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

      this.$router.push({
        path: '/',
        query: { type: this.type },
      });
    },
  },
};
</script>
