<script setup lang="ts">
import Menu from "@/components/Menu.vue";
import { provideCalculationsContext } from "@/context/calculationsContext.ts";


/**
 * App.vue jest dobrym miejscem na provide(), bo obejmuje RouterView.
 * Dzieki temu ProfilePage i CalculationsPage sa w tym samym kontekscie, mimo
 * ze sa osobnymi podstronami routera.
 */
provideCalculationsContext();
</script>

<template>
  <main>
    <Menu/>
    <div class="page-container">
      <RouterView />
    </div>

  </main>
</template>

<style scoped>
  .page-container{
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.5rem 1rem;
  }
</style>
