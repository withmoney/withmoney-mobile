<template>
  <div>
    <md-toolbar>
      <router-link to="/">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title" style="flex: 1">Transaction: {{name}}</h3>
      <md-button id="delete" class="md-icon-button" @click="showConfirmDelete = true">
        <md-icon>delete</md-icon>
      </md-button>
    </md-toolbar>
    <transaction-form
      v-if="transaction"
      :name="name"
      :value="value"
      :AccountId="AccountId"
      :CategoryId="CategoryId"
      :type="type"
      :isPaid="isPaid"
      :transactionDate="transactionDate"
      :onSave="onSave"
    />
    <md-dialog-confirm
      :md-active.sync="showConfirmDelete"
      md-title="Deseja mesmo excluir essa transação?"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="showConfirmDelete = false"
      @md-confirm="onConfirm" />
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
      CategoryId: 0,
      type: 'out',
      isPaid: false,
      transactionDate: '',
      accounts: [],
      transaction: null,
      isLoading: false,
      showConfirmDelete: false,
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
      this.CategoryId = data.CategoryId;

      this.transaction = data;
    },
    async onConfirm() {
      try {
        await Transaction.destroy(this.$route.params.id);

        this.$store.dispatch('showFlashMessage', 'Transação excluida com sucesso');

        this.$router.push('/');
      } catch (e) {
        this.$store.dispatch('showFlashMessage', e.message);
      }
    },
  },
  created() {
    this.getTransaction();
  },
};
</script>
