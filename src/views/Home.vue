<template>
  <div class="view">
    <saved-list v-if="loadingListOpen" @close="loadingListOpen = false" @load="load" />
    <div class="nav">
      <div class="logo" />
      <button class="button" type="button" @click="loadingListOpen = true">Load</button>
      <button class="button" type="button" @click="save">Save</button>
    </div>
    <div class="form">
      <input
        ref="nameInput"
        v-model="name"
        class="title"
        placeholder="Untitled Quote"
        @input="$event.target.setCustomValidity('')"
      />
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

      <card title="Description" class="description">
        <textarea v-model="description" placeholder="Description" />
      </card>

      <card title="Insurance Cost" class="insurance">
        <text-field v-model="insurance" />
      </card>

      <div class="summary">
        <button class="button" type="button" @click="reportOpen = !reportOpen">
          <result style="font-size: 20px" property="Total" :value="`$${total.toFixed(2)}`" />
        </button>
      </div>
    </div>
    <div class="report-wrapper" :class="{ open: reportOpen }" @click.self="reportOpen = false">
      <div class="report">
        <div class="title">{{ name }}</div>
        <p class="report-description">{{ description }}</p>
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

  name: string = '';

  description: string = '';

  loadingListOpen: boolean = false;

  employees11: number = 0;

  employees12: number = 0;

  hours: number = 0;

  distance: number = 0;

  insurance: number = 110;

  initial: boolean = false;

  frequency: 'once' | 'weekly' | 'biweekly' | 'monthly' = 'once';

  reportOpen: boolean = false;

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

  save() {
    // check if quote name is filled out
    const input = this.$refs.nameInput as HTMLInputElement;
    input.setCustomValidity(this.name ? '' : 'Please proivde a quote name.');

    if (!input.reportValidity()) {
      return;
    }

    const saveData: App.Quote = {
      id: btoa(Date.now().toString()).replace(/=/g, ''),
      data: {
        name: this.name,
        description: this.description,
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
    this.name = '';
    this.description = '';
    this.employees11 = 0;
    this.employees12 = 0;
    this.hours = 0;
    this.distance = 0;
    this.insurance = 0;
    this.initial = false;
    this.frequency = 'once';
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
  display: flex;
  position: relative;
  grid-area: nav;
  text-align: right;
  border-bottom: 1px solid #ccc;
  padding: 0.5em 1em;
  height: 3em;
  align-items: center;

  .logo {
    width: 100px;
    height: 100%;
    background: url('/logo.png');
    background-size: contain;
    background-position: 1em center;
    background-repeat: no-repeat;
    margin-right: auto;
  }
}

.form {
  display: grid;
  grid-area: form;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1min-content 1min-content 1min-content 1min-content;
  grid-template-areas: 'title title' 'description hours' 'description frequency' 'employees frequency' 'employees distance' 'insurance summary';
  padding: 1em;
  row-gap: 1em;
  column-gap: 1em;
  overflow: auto;

  & > *:nth-last-child(2) {
    margin-bottom: 1em;
  }

  .title {
    grid-area: title;
    outline: none;
    background: transparent;
    border: none;
    font-size: 18px;

    &::placeholder {
      color: #727272;
    }
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

  .description {
    grid-area: description;

    textarea {
      resize: none;
      margin: 0;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      font-family: inherit;
      font-size: 16px;
      border: none;
      min-height: 100px;
    }
  }

  .summary {
    display: none;
  }
}

.report {
  padding: 1em;
  padding-right: 2em;
  overflow: auto;

  .title,
  .report-description {
    display: none;
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

    & > *:last-child {
      margin-bottom: 1em;
    }
  }

  .report-wrapper {
    position: fixed;
    background-color: rgba(#000, 0);
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 4em;
    padding-top: 5em;
    pointer-events: none;

    .report {
      background-color: #fff;
      box-shadow: 0 5px 20px 5px rgba(#000, 0.15);
      border-radius: 6px;
      max-width: 20em;
      margin: 0 auto;
      transform: translateY(3em);
      opacity: 0;
      transition: 0.15s ease-out;
      transition-property: opacity transform;
    }

    &.open {
      background-color: rgba(#000, 0.3);
      pointer-events: auto;

      .report {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }

  .summary {
    display: block !important;

    .button {
      margin: 0;
      display: block;
      height: 4em;
      width: 100%;
    }
  }
}
</style>

<style lang="scss" scoped>
@media screen and (max-width: 650px) {
  .form {
    grid-template-columns: 1fr;
    grid-template-areas: 'title' 'description' 'employees' 'hours' 'frequency' 'distance' 'insurance';

    & > *:nth-last-child(2) {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss" scoped>
@media print {
  @page {
    size: auto;
    margin: 0;
  }

  .logo {
    position: fixed;
    top: 3em;
    left: 5em;
    z-index: 5;
    height: 70px !important;
    width: 200px !important;
    -webkit-print-color-adjust: exact;
  }

  .report-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 5em;
    box-sizing: border-box;
    background-color: #fff;
  }

  .report {
    margin: 3em 0;

    .title {
      display: block;
      position: fixed;
      top: 3em;
      height: 70px;
      left: 50%;
      transform: translateX(-50%);
      line-height: 50px;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 2em;
    }

    .report-description {
      display: block;
      text-align: left;
    }
  }
}
</style>
