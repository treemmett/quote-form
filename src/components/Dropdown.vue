<template>
  <label class="dropdown">
    <div class="label">{{ label }}</div>
    <select class="select" :value="value" @input="inputHandler">
      <slot />
    </select>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Dropdown extends Vue {
  @Prop() private label!: string;

  @Prop() private value!: string;

  inputHandler(e: Event) {
    this.$emit('input', (e.target as HTMLInputElement).value);
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  display: block;
  position: relative;
  margin-top: 1em;
}

.label {
  text-align: left;
}

.select {
  appearance: none;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  padding: 5px 8px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;

  &:active,
  &:focus {
    border-color: #7f7eff;
    box-shadow: 0 0 2px #7f7eff;
  }
}
</style>
