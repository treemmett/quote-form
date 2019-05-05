<template>
  <div class="home">
    <card title="How many employees do you need?">
      <text-field label="$11.00" />
      <text-field label="$12.00" />
    </card>

    <card title="How many hours of cleaning?">
      <text-field />
    </card>

    <card title="How far is the job?">
      <text-field label="Distance in hours" />
    </card>

    <card title="Cleaning Frequency">
      <checkbox label="Initial cleaning?" />
      <text-field label="How often is the cleaning?" />
      <dropdown label="How often is the cleaning?">
        <option>One Time</option>
        <option>Weekly</option>
        <option>Biweekly</option>
        <option>Monthly</option>
      </dropdown>
    </card>

    <card title="Insurance Cost">
      <text-field value="100" />
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Checkbox from '@/components/Checkbox.vue';
import Dropdown from '@/components/Dropdown.vue';
import TextField from '@/components/TextField.vue';

@Component({
  components: {
    Card,
    Checkbox,
    Dropdown,
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
