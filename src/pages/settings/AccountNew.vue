<template>
  <div class="full-height">
    <md-toolbar class="toolbar">
      <router-link to="/settings/categories">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Nova Conta</h3>
    </md-toolbar>
    <div class="content-scroll">
      <account-form :onSave="onSave"/>
    </div>
  </div>
</template>

<script>
import AccountForm from '../../components/forms/Account';
import Accounts from '../../services/accounts';

export default {
  components: {
    AccountForm,
  },
  methods: {
    async onSave(data) {
      const account = await Accounts.create(data);

      if (account.id) {
        this.$store.dispatch('showFlashMessage', 'Conta salva com sucesso!');
      }

      this.$router.push({
        path: '/settings/accounts',
      });
    },
  },
};
</script>
