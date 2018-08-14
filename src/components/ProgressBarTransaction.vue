<template>
  <div class="progress-bar-transaction">
    <div class="progress-bar-transaction-title">{{title}}</div>
    <md-progress-bar
      :class="{'md-accent': type === 'out'}"
      md-mode="determinate"
      :md-value="amount"
    />
    <div class="md-layout">
      <div class="md-layout-item">
        <span>Realizado: </span>
        <span :class="`text-${type}`">{{totalMutable}}</span>
      </div>
      <div class="md-layout-item">
        <span>Previsto: </span>
        <span class="text-partial">{{(partialMutable)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { floatToReal } from '../utils/money';

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    partial: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalMutable() {
      return floatToReal(this.total);
    },
    partialMutable() {
      return floatToReal(this.partial);
    },
  },
};
</script>

<style scoped>
.md-progress-bar {
  width: 100%;
}
.md-layout-item {
  height: 34px;
  display: flex;
  align-items: center;
}
.md-layout-item:last-child {
  justify-content: flex-end;
}
.progress-bar-transaction-title {
  margin-bottom: 10px;
  font-size: 18px;
}
.progress-bar-transaction+.progress-bar-transaction {
  margin-top: 15px;
}
span+span {
  margin-left: 5px;
}
.text-in {
  color: #43A047;
}
.text-out {
  color: #FF7043;
}
.text-partial {
  font-weight: bold;
}
</style>
