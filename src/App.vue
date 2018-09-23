<template>
  <div id="app">
    <div id="main">
      <router-view  />
      <flash-message />
    </div>
    <md-tabs class="tabs" v-if="user" md-alignment="centered">
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  #main {
    flex: 1;
    padding-bottom: 72px;
  }
  .content-scroll {
    overflow-y: scroll;
    padding-bottom: 190px;
    height: calc(100vh - 56px);
  }
  .tabs {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;
  }
  .full-height {
    min-height: calc(100vh - 56px - 72px);
    margin-top: 56px;
  }
  .menu-speed {
    position: absolute !important;
    right: 20px;
    z-index: 101 !important;
    bottom: 100px !important;
  }

  input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
    background-color: rgb(250, 255, 189) !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
    -webkit-text-fill-color: #000 !important;
  }
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
