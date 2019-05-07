<template>
  <div class="wrapper" @click.self="$emit('close')">
    <div class="modal">
      <div v-for="item in savedItems" :key="item.id" class="item">
        <div class="name" :title="item.name">{{ item.name }}</div>
        <button class="button red">Delete</button>
        <button class="button outline">Load</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TextField extends Vue {
  private savedItems: Array<App.Quote> = [];

  beforeMount() {
    // retrieve quotes from storage
    if (!localStorage.getItem('savedQuotes')) return;

    this.savedItems = JSON.parse(localStorage.getItem('savedQuotes') as string);
  }
}
</script>

<style lang="scss" scoped>
.modal {
  display: inline-block;
  width: 100%;
  max-width: 40em;
  padding: 1em;
  box-sizing: border-box;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 5px 20px 5px rgba(#000, 0.15);
  border-radius: 6px;
}

.item {
  display: flex;
  border: 1px solid #ccc;
  padding: 0.5em 1em;
  border-radius: 4px;
  justify-content: flex-end;
  align-items: center;

  & + & {
    margin-top: 0.5em;
  }
}

.name {
  margin-right: auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.wrapper {
  position: fixed;
  z-index: 1;
  height: 100vh;
  width: 100vw;
  padding: 4em;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-color: rgba(#000, 0.3);
  overflow: auto;
}
</style>
