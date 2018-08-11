<template>
  <div class="full-height">
    <md-toolbar>
      <router-link to="/settings">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title">Contas</h3>
    </md-toolbar>
    <md-content>
      <md-list v-for="account in accounts" :key="account.id">
        <md-list-item :to="`/settings/accounts/edit/${account.id}`">
          <span>{{account.name}}</span>
          <account-icon :value="account.type" />
        </md-list-item>
      </md-list>
    </md-content>

    <md-button
      class="md-fab md-primary menu-speed"
      to="/settings/accounts/new"
    >
      <md-icon>note_add</md-icon>
    </md-button>
  </div>
</template>

<script>
import Accounts from '../../services/accounts';
import AccountIcon from '../../components/AccountIcon';

export default {
  data() {
    return {
      accounts: [],
    };
  },
  components: { AccountIcon },
  methods: {
    async getAccounts() {
      const { data } = await Accounts.list();

      this.accounts = data;
    },
  },
  created() {
    this.getAccounts();
  },
};
</script>
