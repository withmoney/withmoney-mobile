<template>
  <md-icon>{{value ? 'check_circle' : 'lens'}}</md-icon>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>
