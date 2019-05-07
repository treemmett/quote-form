<template>
  <div class="view">
    <saved-list v-if="loadingListOpen" @close="loadingListOpen = false" @load="load" />
    <div class="nav">
      <button class="button" type="button" @click="loadingListOpen = true">Load</button>
      <button class="button" type="button">Save</button>
    </div>
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

      <form class="save" @submit.prevent="save">
        <input class="input" placeholder="Save Name" name="saveName" />
        <button>Save</button>
      </form>
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
import SavedList from '@/components/SavedList.vue';
import TextField from '@/components/TextField.vue';

@Component({
  components: {
    Card,
    Checkbox,
    Dropdown,
    Result,
    SavedList,
    TextField
  }
})
export default class Home extends Vue {
  [key: string]: any;

  loadingListOpen: boolean = true;

  employees11: number = 0;

  employees12: number = 0;

  hours: number = 0;

  distance: number = 0;

  insurance: number = 110;

  initial: boolean = false;

  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly' = 'once';

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

  save(e: Event) {
    const form = e.target as HTMLFormElement;
    const saveName = (form.elements[0] as HTMLInputElement).value as string;

    const id = btoa(Date.now().toString()).replace(/=/g, '');

    const saveData: App.Quote = {
      id,
      name: saveName,
      data: {
        employees11: this.employees11,
        employees12: this.employees12,
        hours: this.hours,
        distance: this.distance,
        insurance: this.insurance,
        initial: this.initial,
        frequency: this.frequency
      }
    };

    // check if we already have a saved quotes array
    const savedQuotes: Array<App.Quote> = localStorage.getItem('savedQuotes')
      ? JSON.parse(localStorage.getItem('savedQuotes') as string)
      : [];

    savedQuotes.push(saveData);

    localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));

    // reset site data
    this.employees11 = 0;
    this.employees12 = 0;
    this.hours = 0;
    this.distance = 0;
    this.insurance = 0;
    this.initial = false;
    this.frequency = 'once';
    (document.querySelector('input[name=saveName]') as HTMLInputElement).value = '';
  }

  load(id: string) {
    // find data by id
    const savedItems: Array<App.Quote> = JSON.parse(localStorage.getItem('savedQuotes') as string);

    const loadedItem = savedItems.find(q => q.id === id);

    if (!loadedItem) {
      throw new Error(`Cannot find quote ID ${id}`);
    }

    Object.keys(loadedItem.data).forEach(key => (this[key] = loadedItem.data[key]));

    this.loadingListOpen = false;
  }
}
</script>

<style lang="scss" scoped>
.view {
  display: grid;
  grid-template-columns: 40em 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas: 'nav nav' 'form report';
  max-height: 100vh;
  overflow: hidden;
}

.nav {
  grid-area: nav;
  text-align: right;
  border-bottom: 1px solid #ccc;
  padding: 0.5em 1em;
}

.form {
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1min-content 1min-content 1min-content 1min-content;
  grid-template-areas: 'employees hours' 'employees frequency' 'distance frequency' 'insurance action';
  padding: 1em;
  row-gap: 1em;
  column-gap: 1em;
  overflow: auto;

  &::after {
    content: '';
    display: block;
    height: 0.5em;
  }

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
  padding: 1em;
  padding-right: 2em;
  overflow: auto;
}

.save {
  grid-area: action;
  display: flex;
  align-items: flex-end;

  input {
    padding: 0.75em 0.5em;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;

    &:active,
    &:focus {
      border-color: #7f7eff;
      box-shadow: 0 0 2px #7f7eff;
    }
  }

  button {
    padding: 0.75em 1em;
    font-size: 16px;
    border-radius: 5px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    appearance: none;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 880px) {
  .view {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas: 'nav' 'form';
  }

  .form {
    overflow: auto;
  }

  .report {
    display: none;
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 650px) {
  .form {
    display: block;
  }

  .card {
    display: block;

    & + & {
      margin-top: 1em;
    }
  }
}
</style>
