<template>
  <label class="checkbox">
    <div class="label">{{ label }}</div>
    <input type="checkbox" class="input" :checked="value" @input="inputHandler" />
    <div class="display" />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextField extends Vue {
  @Prop() private label!: string;

  @Prop() private value!: boolean;

  inputHandler(e: Event) {
    this.$emit('input', (e.target as HTMLInputElement).checked);
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  display: block;
  position: relative;
  margin-top: 1em;
}

.label {
  text-align: left;
}

.input {
  position: fixed;
  opacity: 0;
  left: -9999vw;
  top: -9999vh;

  &:active,
  &:focus {
    & + .display {
      border-color: #7f7eff !important;
      box-shadow: 0 0 2px #7f7eff;
    }
  }

  &:checked + .display {
    background-color: #7ce577;
    border-color: transparent;

    &::after {
      background-color: #fff;
      transform: translateX(100%);
    }
  }
}

.display {
  width: 40px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 100vh;
  padding: 2px;
  transition: 0.2s ease-in-out;
  transition-property: background-color, border-color;

  &::after {
    content: '';
    position: relative;
    display: block;
    border-radius: 100vh;
    background-color: #ddd;
    height: 20px;
    width: 20px;
    transition: 0.2s ease-in-out;
    transition-property: background-color, transform;
  }
}
</style>
