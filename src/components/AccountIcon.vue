<template>
  <md-icon>{{icon}}</md-icon>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      switch (this.value) {
        case 'investing':
          return 'trending_up';
        case 'wallet':
          return 'account_balance_wallet';
        case 'checking_account':
        default:
          return 'account_balance';
      }
    },
  },
};
</script>
