<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <div class="form">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private title!: string;
}
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  padding: 1em;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;

  &.description .form {
    height: 90%;
    padding: 0;
  }
}

.form {
  padding: 0 2em;
  position: relative;
  height: 100%;
}
</style>
