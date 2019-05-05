<template>
  <div class="result">
    <div class="key">{{ property }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Result extends Vue {
  @Prop() private property!: string;

  @Prop() private value!: string;
}
</script>

<style lang="scss" scoped>
.result {
  display: flex;
}

.key {
  font-weight: 600;
}

.value {
  margin-left: auto;
}
</style>
