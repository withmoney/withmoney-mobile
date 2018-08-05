<template>
  <div class="full-height">
    <toolbar v-on:update:stateMonth="getTransactions" />
    <md-tabs>
      <md-tab md-label="Fixas"></md-tab>
      <md-tab md-label="Variáveis"></md-tab>
    </md-tabs>
    <md-table md-card>
      <md-table-row>
        <md-table-head>Nome</md-table-head>
        <md-table-head>Valor</md-table-head>
        <md-table-head>Data</md-table-head>
        <md-table-head style="width: 75px">Pago?</md-table-head>
        <md-table-head style="width: 60px" />
      </md-table-row>
      <md-table-row
        v-for="transaction in transactions"
        :key="transaction.id"
        :id="`transaction-${transaction.id}`"
      >
        <md-table-cell>{{transaction.name}}</md-table-cell>
        <md-table-cell>{{transaction.value}}</md-table-cell>
        <md-table-cell>{{transaction.transactionDate}}</md-table-cell>
        <md-table-cell class="md-table-cell-center">
          <is-paid :value="transaction.isPaid" />
        </md-table-cell>
        <md-table-cell>
          <md-button class="md-icon-button" @click="onSelectTransaction(transaction)">
            <md-icon>chevron_right</md-icon>
          </md-button>
        </md-table-cell>
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
import IsPaid from '../components/IsPaid';

export default {
  components: { Toolbar, IsPaid },
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
      this.$router.push(`/transactions/${id}`);
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
    },
  },
  created() {
    this.getTransactions();
  },
};
</script>

<style>
.md-table-head-label {
  padding-right: 20px;
  padding-left: 20px;
}
.md-table-cell-container{
  padding: 6px 6px 6px 6px;
}
.md-table-cell:last-child .md-table-cell-container {
  padding-right: 0;
}
.md-table-cell-center {
  text-align: center;
}
</style>
