<script setup lang="ts">
import Calculations from "@/utils/calculations/Calculations.ts";
import CalculationCard from "@/components/CalculationCard.vue";


const calculationsList = new Calculations();

const list = calculationsList.getResultsList();


</script>

<template>
  <h1>Calculations page</h1>
  <p>this is home calculations page - user calculations result cards list</p>
  <div class="calculations-list">

    <CalculationCard v-for="item in list" :card-item="item"/>
  </div>

</template>

<style scoped>
.calculations-list{
  display: flex;
  gap: 0.5rem;
  width: 100%;
  /* background-color: gray; */
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;
}



</style>
