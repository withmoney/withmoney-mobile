<template>
  <div>
    <md-toolbar>
      <router-link to="/settings/accounts">
        <md-button class="md-icon-button">
          <md-icon>keyboard_backspace</md-icon>
        </md-button>
      </router-link>
      <h3 class="md-title" style="flex: 1">Conta: {{name}}</h3>
      <md-button id="delete" class="md-icon-button" @click="showConfirmDelete = true">
        <md-icon>delete</md-icon>
      </md-button>
    </md-toolbar>
    <account-form
      v-if="account"
      :name="name"
      :initalValue="initalValue"
      :type="type"
      :onSave="onSave"
    />
    <md-dialog-confirm
      :md-active.sync="showConfirmDelete"
      md-title="Deseja mesmo excluir essa transação?"
      md-confirm-text="Sim"
      md-cancel-text="Não"
      @md-cancel="showConfirmDelete = false"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
import AccountForm from '../../components/forms/Account';
import Accounts from '../../services/accounts';

export default {
  components: {
    AccountForm,
  },
  data() {
    return {
      account: null,
      name: '',
      initalValue: '',
      type: 'out',
      showConfirmDelete: false,
    };
  },
  methods: {
    async onSave(data) {
      const account = await Accounts.update(this.$route.params.id, data);

      if (account.id) {
        this.$store.dispatch('showFlashMessage', 'Conta salva com sucesso!');
      }

      this.$router.push({
        path: '/settings/accounts',
      });
    },
    async getAccount() {
      const data = await Accounts.get(this.$route.params.id);

      this.name = data.name;
      this.initalValue = data.initalValue;
      this.type = data.type;

      this.account = data;
    },
    async onConfirm() {
      await Accounts.destroy(this.$route.params.id);

      this.$store.dispatch('showFlashMessage', 'Conta excluida com sucesso');

      this.$router.push({
        path: '/settings/accounts',
      });
    },
  },
  created() {
    this.getAccount();
  },
};
</script>
