<script setup lang="ts">
import type {NavModel} from "@/types/nav/NavModel.ts";
import {ref} from "vue";

// const props = defineProps<{
//   menuItems: NavModel[]
// }>();

const menuItemsList = ref<NavModel[]>([
  {
    id:1,
    title:"home",
    isSelected: true,
    link:"/"
  },
  {
    id:2,
    title:"calculations",
    isSelected: false,
    link:"/calc"
  },
  {
    id:3,
    title:"profile",
    isSelected: false,
    link:"/profile"
  },
  {
    id:4,
    title:"settings",
    isSelected: false,
    link:"/settings"
  },
]);
</script>

<template>
  <nav class="menu">
    <div class="logo">logo</div>
    <ul >
      <RouterLink activeClass="active" class="link" :active="menuItem.isSelected" :to="menuItem.link" v-for="menuItem in menuItemsList" :key="menuItem.id" >{{menuItem.title}}</RouterLink>
    </ul>
  </nav>

</template>

<style scoped>
  .menu{
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
  }
  .logo{
    height: 24px;
    display: block;
    color: white;
  }
  ul{
    display: flex;
    justify-content: center;
    gap:1rem;
    list-style: none;
    padding: 0 1rem;
  }
  .link{
    text-decoration: none;
    color: #474747;
    background: transparent;
  }
  .active{
    color: aqua;
    background: transparent;
  }
</style>