<template>
  <md-snackbar :md-active.sync="show_flash_message">
    <span>{{flash_message}}</span>
    <md-button class="md-primary" @click="hide" md-persistent>Close</md-button>
  </md-snackbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'flash_message',
      'show_flash_message',
    ]),
  },
  methods: {
    hide() {
      this.$store.dispatch('hideFlashMessage');
    },
  },
};
</script>
