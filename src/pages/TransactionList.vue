<template>
  <div>
    <md-toolbar>
      <md-button>
        <md-icon>chevron_left</md-icon> Abril
      </md-button>
      <h3 class="md-title" style="flex: 1; text-align: center;">Junho</h3>
      <md-button>
        <md-icon>chevron_right</md-icon> Julho
      </md-button>
    </md-toolbar>
    <md-tabs>
      <md-tab md-label="Fixas"></md-tab>
      <md-tab md-label="Variáveis"></md-tab>
    </md-tabs>
    <md-table>
      <md-table-row>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Valor</md-table-head>
        <md-table-head>Pago?</md-table-head>
        <md-table-head>Data</md-table-head>
      </md-table-row>
      <md-table-row
        v-for="transaction in transactions"
        :key="transaction.id"
        @click="onSelectTransaction(transaction)"
      >
        <md-table-cell>{{transaction.name}}</md-table-cell>
        <md-table-cell>{{transaction.value}}</md-table-cell>
        <md-table-cell>{{transaction.transationDate}}</md-table-cell>
        <md-table-cell>{{transaction.isPaid ? 'Paid' : 'Not Paid'}}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import Transaction from '../services/transactions';

export default {
  name: 'App',
  data() {
    return {
      transactions: [],
    };
  },
  methods: {
    onSelectTransaction({ id }) {
      this.$router.push(`/transaction/${id}`);
    },
  },
  async created() {
    const { data } = await Transaction.getTransactions();

    this.transactions = data;
  },
};
</script>

<style>
  .md-content {
    padding: 16px;
  }
</style>
