<script setup lang="ts">
import { useUserStore } from '@/stores/userStore.ts';

/**
 * Pobieramy ten sam store, ktory jest aktualizowany w ProfilePage.
 * Nie trzeba propsow ani provide/inject, bo Pinia trzyma wspolny stan aplikacji.
 */
const userStore = useUserStore();
</script>

<template>
  <h1>Hello {{ userStore.userName }}</h1>
  <p>this is home page - introduction to fitcalc web app</p>
</template>

<style scoped>

</style>
