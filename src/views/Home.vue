<template>
  <div class="view">
    <div class="form">
      <card title="How many employees do you need?" class="employees">
        <text-field v-model="employees11" label="$11.00" />
        <text-field v-model="employees12" label="$12.00" />
      </card>

      <card title="How many hours of cleaning?" class="hours">
        <text-field v-model="hours" />
      </card>

      <card title="How far is the job?" class="distance">
        <text-field v-model="distance" label="Distance in hours" />
      </card>

      <card title="Cleaning Frequency" class="frequency">
        <checkbox v-model="initial" label="Initial cleaning?" />
        <dropdown v-model="frequency" label="How often is the cleaning?">
          <option value="once">One Time</option>
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="monthly">Monthly</option>
        </dropdown>
      </card>

      <card title="Insurance Cost" class="insurance">
        <text-field v-model="insurance" />
      </card>
    </div>
    <div class="report">
      <result property="Employee Time" :value="employeeHours" />
      <result property="Employee Pay" :value="`$${employeePay.toFixed(2)}`" />
      <br />
      <result property="Travel Time" :value="travelTime" />
      <result property="Travel Pay" :value="`$${travelCost.toFixed(2)}`" />
      <br />
      <result property="Insurance" :value="`$${insuranceCost.toFixed(2)}`" />
      <result property="OPEX" :value="`${opex}%`" />
      <result property="OPEX Cost" :value="`$${opexCost.toFixed(2)}`" />
      <br />
      <result property="Profit" :value="`$${profit.toFixed(2)}`" />
      <result property="Initial" :value="`$${initialCost.toFixed(2)}`" />
      <br />
      <result style="font-size: 20px" property="Total" :value="`$${total.toFixed(2)}`" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Card from '@/components/Card.vue';
import Checkbox from '@/components/Checkbox.vue';
import Dropdown from '@/components/Dropdown.vue';
import Result from '@/components/Result.vue';
import TextField from '@/components/TextField.vue';

@Component({
  components: {
    Card,
    Checkbox,
    Dropdown,
    Result,
    TextField
  }
})
export default class Home extends Vue {
  employees11: number = 0;

  employees12: number = 0;

  hours: number = 0;

  distance: number = 0;

  insurance: number = 110;

  initial: boolean = false;

  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly' = 'biweekly';

  get employeePay(): number {
    return this.employees11 * this.hours * 11 + this.employees12 * this.hours * 12;
  }

  get employeeHours(): string {
    const v = (this.employees11 + this.employees12) * this.hours;
    return v === 1 ? `${v} Hour` : `${v} Hours`;
  }

  get travelTime(): string {
    return this.distance === 1 ? `${this.distance} Hour` : `${this.distance} Hours`;
  }

  get travelCost(): number {
    return this.distance * 10;
  }

  get insuranceCost(): number {
    return this.insurance * 0.05;
  }

  get opex(): number {
    switch (this.frequency) {
      case 'monthly':
        return 60;

      case 'biweekly':
        return 45;

      case 'weekly':
        return 30;

      default:
        return 0;
    }
  }

  get opexCost(): number {
    const perc = this.opex / 100;
    return Math.floor((this.travelCost + this.employeePay) * perc);
  }

  get profit(): number {
    return (this.employeePay + this.travelCost) * 0.3;
  }

  get initialCost(): number {
    return this.initial ? (this.employeePay + this.travelCost) * 0.4 : 0;
  }

  get total(): number {
    return (
      this.employeePay +
      this.travelCost +
      this.insuranceCost +
      this.opexCost +
      this.profit +
      this.initialCost
    );
  }
}
</script>

<style lang="scss" scoped>
.view {
  display: grid;
  grid-template-columns: 40em 1fr;
  grid-template-areas: 'form report';
}

.form {
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1min-content 1min-content 1min-content 1min-content;
  grid-template-areas: 'employees hours' 'employees frequency' 'distance frequency' 'insurance .';
  row-gap: 1em;
  column-gap: 1em;

  .employees {
    grid-area: employees;
  }

  .hours {
    grid-area: hours;
  }

  .frequency {
    grid-area: frequency;
  }

  .distance {
    grid-area: distance;
  }

  .insurance {
    grid-area: insurance;
  }
}

.report {
  padding: 0 2em;
}
</style>
