<script setup lang="ts">
import CalculationCard from "@/components/CalculationCard.vue";
import { useCalculationsContext } from "@/context/calculationsContext.ts";

/**
 * CalculationsPage jest teraz konsumentem wspolnego kontekstu.
 * Nie tworzymy tutaj new Calculations(), bo to daloby osobny, niezalezny stan.
 * Bierzemy resultsList z providera, ktory jest aktualizowany przez ProfilePage.
 */
const { resultsList } = useCalculationsContext();

</script>

<template>
  <h1>Calculations page</h1>
  <p>this is home calculations page - user calculations result cards list</p>
  <div class="calculations-list">

    <CalculationCard v-for="item in resultsList" :key="item.title" :card-item="item"/>
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
