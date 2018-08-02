<template>
  <div class="full-height">
    <toolbar v-on:update:stateMonth="getTransactions" />
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
    <md-button class="md-fab md-primary menu-speed" to="/transaction-new">
      <md-icon>note_add</md-icon>
    </md-button>
  </div>
</template>

<script>
import Moment from 'moment';
import { mapGetters } from 'vuex';
import Transaction from '../services/transactions';
import Toolbar from '../components/Toolbar';

export default {
  components: { Toolbar },
  data() {
    return {
      transactions: [],
    };
  },
  computed: {
    ...mapGetters(['state_month']),
  },
  methods: {
    onSelectTransaction({ id }) {
      this.$router.push(`/transaction/${id}`);
    },
    async getTransactions() {
      const start = Moment(this.state_month).startOf('month').toISOString();
      const end = Moment(this.state_month).endOf('month').toISOString();
      const { data } = await Transaction.getTransactions({
        createdAt: [
          start,
          end,
        ].join(','),
      });

      this.transactions = data;
    }
  },
  created() {
    this.getTransactions();
  },
};
</script>

<style>
  .md-content {
    padding: 16px;
  }
  .menu-speed {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
