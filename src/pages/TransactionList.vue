<template>
  <div id="transaction-list" class="full-height">
    <toolbar v-on:update:stateMonth="getTransactions" />
    <div class="content-scroll">
      <md-tabs id="tabs-type" :md-active-tab="`tab-${type}`">
        <md-tab md-label="Entradas" id="tab-in" @click="onChangeTab('in')"></md-tab>
        <md-tab md-label="Saidas" id="tab-out" @click="onChangeTab('out')"></md-tab>
      </md-tabs>
      <md-table md-card>
        <md-table-row>
          <md-table-head>Data</md-table-head>
          <md-table-head>Nome</md-table-head>
          <md-table-head>Valor</md-table-head>
          <md-table-head>Categoria</md-table-head>
          <md-table-head style="width: 75px">Pago?</md-table-head>
        </md-table-row>
        <md-table-row
          v-for="transaction in onlyBy(transactions, type)"
          :key="transaction.id"
          :id="`transaction-${transaction.id}`"
            @click="onSelectTransaction(transaction)"
        >
          <md-table-cell>{{decorateDate(transaction.transactionDate)}}</md-table-cell>
          <md-table-cell>{{transaction.name}}</md-table-cell>
          <md-table-cell>{{transaction.value}}</md-table-cell>
          <md-table-cell>{{transaction.Category.name}}</md-table-cell>
          <md-table-cell class="md-table-cell-center">
            <is-paid :value="transaction.isPaid" />
          </md-table-cell>
        </md-table-row>
      </md-table>

      <md-card class="calcs">
        <md-card-content>
          <div  class="md-layout">
            <div class="md-layout-item">Total Entradas</div>
            <div class="md-layout-item text-green">{{floatToReal(calcTotalIn)}}</div>
          </div>
          <div  class="md-layout">
            <div class="md-layout-item">Total Saídas</div>
            <div class="md-layout-item text-red">{{floatToReal(calcTotalOut)}}</div>
          </div>
          <div class="md-layout">
            <div class="md-layout-item">Total</div>
            <div class="md-layout-item">{{floatToReal(calcTotalInAndOut)}}</div>
          </div>
        </md-card-content>
      </md-card>

      <md-card class="calcs">
        <md-card-content>
          <progress-bar-transaction
            title="Entradas"
            type="in"
            :amount="amountInPaid"
            :total.sync="calcTotalInPaid"
            :partial.sync="calcTotalIn"
          />
          <progress-bar-transaction
            title="Saídas"
            type="out"
            :amount="amountOutPaid"
            :total.sync="calcTotalOutPaid"
            :partial.sync="calcTotalOut"
          />
        </md-card-content>
      </md-card>
    </div>
    <md-button
      class="md-fab md-primary menu-speed"
      :to="{ path: '/transaction-new', query: { type } }"
    >
      <md-icon>note_add</md-icon>
    </md-button>
  </div>
</template>

<script>
import Moment from 'moment';
import { mapGetters } from 'vuex';
import Transaction from '../services/transactions';
import Toolbar from '../components/Toolbar';
import ProgressBarTransaction from '../components/ProgressBarTransaction';
import IsPaid from '../components/IsPaid';
import { decorateDate } from '../utils/date';
import { onlyBy } from '../utils/filters';
import { floatToReal } from '../utils/money';
import {
  amountOutPaid,
  amountInPaid,
  calcTotalIn,
  calcTotalOut,
  calcTotalInPaid,
  calcTotalInUnpaid,
  calcTotalOutUnpaid,
  calcTotalOutPaid,
  calcTotalInAndOut,
} from '../utils/transactionCalcs';

export default {
  components: { Toolbar, IsPaid, ProgressBarTransaction },
  data() {
    return {
      type: typeof this.$route.query.type !== 'undefined' ? this.$route.query.type : 'out',
      transactions: [],
    };
  },
  computed: {
    ...mapGetters(['state_month']),
    amountInPaid() {
      return amountInPaid(calcTotalIn(this.transactions), this.calcTotalInPaid);
    },
    amountOutPaid() {
      return amountOutPaid(calcTotalOut(this.transactions), this.calcTotalOutPaid);
    },
    calcTotalIn() {
      return calcTotalIn(this.transactions);
    },
    calcTotalOut() {
      return calcTotalOut(this.transactions);
    },
    calcTotalInPaid() {
      return calcTotalInPaid(this.transactions);
    },
    calcTotalInUnpaid() {
      return calcTotalInUnpaid(this.transactions);
    },
    calcTotalOutUnpaid() {
      return calcTotalOutUnpaid(this.transactions);
    },
    calcTotalOutPaid() {
      return calcTotalOutPaid(this.transactions);
    },
    calcTotalInAndOut() {
      return calcTotalInAndOut(this.transactions);
    },
  },
  methods: {
    decorateDate,
    onlyBy,
    floatToReal,
    onSelectTransaction({ id }) {
      this.$router.push(`/transactions/${id}`);
    },
    onChangeTab(type) {
      this.type = type;

      this.$router.replace({ query: { type } });
    },
    async getTransactions() {
      const start = Moment(this.state_month).startOf('month').toISOString();
      const end = Moment(this.state_month).endOf('month').toISOString();
      const { data } = await Transaction.getTransactions({
        batch: 'Categories',
        order: 'transactionDate.asc',
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
  watch: {
    '$route.query.type': 'getTransactions',
  },
};
</script>

<style>
.calcs {
  margin-top: 20px;
}
#transaction-list .md-layout-item {
  height: 34px;
  display: flex;
  align-items: center;
}
#transaction-list .md-layout-item:last-child {
  justify-content: flex-end;
}
</style>
