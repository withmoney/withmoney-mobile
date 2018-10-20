<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">Relátorios</h3>
    </md-toolbar>
    <md-content>
      <toolbar v-on:update:stateMonth="getTransactions" :fixed="false" />
      <div id="graphs">
        <apexcharts width="500" type="pie" :options="chart" :series="series"></apexcharts>
      </div>
    </md-content>
  </div>
</template>

<script>
import Moment from 'moment';
import VueApexCharts from 'vue-apexcharts'
import { mapGetters } from 'vuex';
import Toolbar from '../components/Toolbar';
import Transaction from '../services/transactions';

export default {
  components: {
    apexcharts: VueApexCharts,
    Toolbar,
  },
  data: function() {
    return {
      year: 2018,
      transactions: [],
      chart: {
        labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],

        dataLabels: {
          style: {
            // colors: ['#F44336', '#E91E63', '#9C27B0']
          }
        },
        markers: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      series: [44, 55, 13, 43, 22]
    }
  },
  computed: {
    ...mapGetters(['state_month']),
  },
  methods: {
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
};
</script>

<style>
  #graphs {
    display: flex;
    justify-content: center;
    color: white;
  }
</style>

