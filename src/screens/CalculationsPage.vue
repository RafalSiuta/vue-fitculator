<script setup lang="ts">
import CalculationCard from '@/components/CalculationCard.vue';
import { useCalculationsStore } from '@/stores/calculationsStore.ts';

/**
 * CalculationsPage czyta wyniki z Pinia. Store kalkulacji sam pobiera aktualne
 * dane usera z userStore, wiec ta strona tylko renderuje gotowa liste kart.
 */
const calculationsStore = useCalculationsStore();

</script>

<template>
  <h1>Calculations page</h1>
  <p>this is home calculations page - user calculations result cards list</p>
  <div class="calculations-list">

    <CalculationCard v-for="item in calculationsStore.resultsList" :key="item.title" :card-item="item"/>
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
