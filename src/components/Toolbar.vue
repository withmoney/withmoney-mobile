<template>
  <md-toolbar class="toolbar">
    <md-button id="btn-previus-month" @click="toPreviousMonth">
      <md-icon>chevron_left</md-icon> {{previous_month_str}}
    </md-button>
    <h3 class="md-title"
        style="flex: 1; text-align: center; text-transform: uppercase;">
        {{state_month_str}}
    </h3>
    <md-button id="btn-next-month" @click="toNextMonth">
      <md-icon>chevron_right</md-icon> {{next_month_str}}
    </md-button>
  </md-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'state_month_str',
      'next_month_str',
      'previous_month_str',
    ]),
  },
  methods: {
    toPreviousMonth() {
      this.$store.dispatch('toPreviousMonth');
      this.$emit('update:stateMonth');
    },
    toNextMonth() {
      this.$store.dispatch('toNextMonth');
      this.$emit('update:stateMonth');
    },
  },
};
</script>

<style>
.toolbar {
  position: fixed !important;
  top: 0;
  z-index: 100;
  width: 100%;
}
</style>
