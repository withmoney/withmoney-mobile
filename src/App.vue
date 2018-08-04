<template>
  <div id="app">
    <div id="main">
      <router-view  />
      <flash-message />
    </div>
    <md-tabs v-if="user" md-alignment="centered">
      <md-tab id="tab-home" md-label="Transações" md-icon="attach_money" to="/"></md-tab>
      <md-tab id="tab-reports" md-label="Relatórios" md-icon="insert_chart" to="/reports"></md-tab>
      <md-tab id="tab-settings" md-label="Configurações" md-icon="settings" to="/settings"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import FlashMessage from './components/FlashMessage';

export default {
  name: 'App',
  components: { FlashMessage },
  computed: {
    user() {
      return this.$store.state.user;
    },
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
    position: relative;
  }
  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
    -webkit-text-fill-color: #000 !important;
  }

  .menu-speed {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
