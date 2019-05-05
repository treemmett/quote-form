<template>
  <div class="home">
    <card title="How many employees do you need?">
      <text-field label="$11.00" />
      <text-field label="$12.00" />
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import TextField from '@/components/TextField.vue';

@Component({
  components: {
    Card,
    TextField
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.card {
  display: inline-block;
  padding: 1em;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
