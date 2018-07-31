<template>
  <div>
    <form v-on:submit.prevent="onSubmit" id="login">
      <md-card>
        <md-card-content>
          <md-field>
            <label for="email">Email</label>
            <md-input type="email" id="email" v-model="email" />
          </md-field>
          <md-field>
            <label for="password">Password</label>
            <md-input type="password" id="password" v-model="password" />
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Login</md-button>
        </md-card-actions>
      </md-card>
      <md-snackbar :md-active.sync="showError">
        <span>{{error}}</span>
        <md-button  class="md-primary" @click="showError = false" md-persistent>Retry</md-button>
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import Users from '../services/users';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      showError: false,
    };
  },
  methods: {
    async onSubmit() {
      if (this.email && this.password) {
        try {
          const { data } = await Users.login({
            email: this.email,
            password: this.password,
          });

          if (data.success) {
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('user', JSON.stringify(data.payload));

            this.$store.dispatch('addUser', data.payload);

            this.$router.push('/');
          } else {
            this.showError = true;
            this.error = 'Usuário não encontrado.';
          }
        } catch (e) {
          this.showError = true;
          this.error = e.response.data.message;
        }
      } else {
        this.showError = true;
        this.error = 'Por favor preencha os campos corretamente';
      }
    },
  },
};

</script>


<style>
  #login {
    margin: 16px;
  }
</style>
