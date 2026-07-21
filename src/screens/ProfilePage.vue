<script setup lang="ts">
import Slider from '@/components/Slider.vue';
import { useUserStore } from '@/stores/userStore.ts';
import { useSliderItemsStore } from '@/stores/sliderStore.ts';
import { onMounted } from 'vue';

const userStore = useUserStore();
const sliderItemsStore = useSliderItemsStore();

/**
 * Po zmianie suwaka najpierw zapisujemy wartosc w sliderStore, a potem
 * przepisujemy wartosci formularza do userStore, z ktorego czytaja kalkulacje.
 */
function handleSliderValueChanged(id: number, value: number): void {
  sliderItemsStore.handleSliderValueChanged(id, value);
  userStore.updateUserFromSliders();
}

/**
 * Synchronizujemy userStore od razu po wejściu na profil, zeby CalculationsPage
 * miala dane zgodne z poczatkowymi wartosciami sliderow.
 */
onMounted(() => {
  userStore.updateUserFromSliders();
});
</script>

<template>
  <h1>Profile page</h1>
  <p>set up your parameters</p>
  <div class="sliders-container">
    <!-- v-model zapisuje tekst bezposrednio do Pinia state: userStore.name. -->
    <input class="user-name" placeholder="enter your name" type="text" v-model="userStore.name"/>
    <Slider
      v-for="item in sliderItemsStore.itemsList"
      :key="item.id"
      :slider-item="item"
      @value-changed="handleSliderValueChanged"
    />
  </div>
</template>

<style scoped>
.sliders-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 1rem 0;
}

.user-name{
  max-width: 400px;
  background-color: #212121;
  border: none;
  color: #E0F7FA;
  padding: 16px 6px;
  border-bottom: 1px solid #474747;
  margin:16px 0;

}
.user-name:focus{
  border: 1px solid #4e8181;
  border-radius: 8px;
  background-color: transparent;
  caret: aqua;
}
</style>
