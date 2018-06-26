<template>
  <div id="app">
    <router-view id="main" />
    <md-tabs md-alignment="centered">
      <md-tab id="tab-home" md-label="Transações" md-icon="attach_money" to="/"></md-tab>
      <md-tab id="tab-reports" md-label="Relatórios" md-icon="insert_chart" to="/reports"></md-tab>
      <md-tab id="tab-settings" md-label="Configurações" md-icon="settings" to="/settings"></md-tab>
    </md-tabs>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {
  },
  created() {

  },
};
</script>

<style>
  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  #main {
    flex: 1;
  }
  .md-content {
    padding: 16px;
  }
</style>
