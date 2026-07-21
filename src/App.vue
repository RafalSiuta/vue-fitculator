<script setup lang="ts">
import Menu from '@/components/Menu.vue';
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
