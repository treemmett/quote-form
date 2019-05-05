<template>
  <label class="text">
    <div class="label">{{ label }}</div>
    <input type="text" class="input" />
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextField extends Vue {
  @Prop() private label!: string;
}
</script>

<style lang="scss" scoped>
.text {
  display: block;
  position: relative;
  margin-top: 1em;
}

.label {
  text-align: left;
}

.input {
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
