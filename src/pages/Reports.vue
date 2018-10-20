<template>
  <div>
    <md-toolbar>
      <h3 class="md-title">Relátorio</h3>
    </md-toolbar>
    <md-content>
      <div id="graphs">
        <apexcharts width="500" type="pie" :options="chart" :series="series"></apexcharts>
      </div>
    </md-content>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  components: {
    apexcharts: VueApexCharts,
  },
  data: function() {
    return {
      chart: {
        labels: ["Apple", "Mango", "Banana", "Papaya", "Orange"],
        theme: {
          palette: 'palette5' // upto palette10
        },
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
};
</script>

<style>
  #graphs {
    display: flex;
    justify-content: center;
    color: white;
  }
</style>

