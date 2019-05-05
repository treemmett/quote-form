<template>
  <div class="view">
    <div class="form">
      <card title="How many employees do you need?" class="employees">
        <text-field label="$11.00" />
        <text-field label="$12.00" />
      </card>

      <card title="How many hours of cleaning?" class="hours">
        <text-field />
      </card>

      <card title="How far is the job?" class="distance">
        <text-field label="Distance in hours" />
      </card>

      <card title="Cleaning Frequency" class="frequency">
        <checkbox label="Initial cleaning?" />
        <dropdown label="How often is the cleaning?">
          <option>One Time</option>
          <option>Weekly</option>
          <option>Biweekly</option>
          <option>Monthly</option>
        </dropdown>
      </card>

      <card title="Insurance Cost" class="insurance">
        <text-field value="100" />
      </card>
    </div>
    <div class="report">
      <result property="Employee Time" value="5 Hours" />
      <result property="Employee Pay" value="$24" />
      <br />
      <result property="Travel Time" value="1 Hour" />
      <result property="Travel Pay" value="$10" />
      <br />
      <result property="Insurance" value="$5.50" />
      <result property="OPEX" value="$0" />
      <br />
      <result property="Profit" value="$39" />
      <result property="Initial" value="$52" />
      <br />
      <result style="font-size: 20px" property="Total" value="$226.50" />
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
export default class Home extends Vue {}
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
