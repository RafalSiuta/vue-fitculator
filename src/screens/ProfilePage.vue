<script setup lang="ts">
import Slider from '@/components/Slider.vue';
import type { SliderItem } from '@/types/slider/SliderItem';
import Calculations from '@/utils/calculations/Calculations';
import { ref, watch } from 'vue';

/**
 * ref() tworzy reaktywny stan Vue. Najlatwiej porownac to do useState w React:
 * itemsList przechowuje aktualne wartosci suwakow, a zmiana itemsList.value
 * powoduje odswiezenie miejsc w template, ktore z tego stanu korzystaja.
 */
const itemsList = ref<SliderItem[]>([
  {
    id: 1,
    name: 'age',
    min: 1,
    max: 100,
    value: 30,
    unit: 'years',
  },
  {
    id: 2,
    name: 'height',
    min: 100,
    max: 220,
    value: 180,
    unit: 'cm',
  },
  {
    id: 3,
    name: 'weight',
    min: 30,
    max: 250,
    value: 80,
    unit: 'kg',
  },
  {
    id: 4,
    name: 'activity factor',
    min: 1.2,
    max: 2.2,
    value: 1.2,
    unit: 'PAL',
    step: 0.1,
  },
]);

/**
 * Instancja klasy Calculations zyje obok stanu komponentu.
 * W Flutterze podobna logika moglaby powstac w initState(), a potem byc
 * aktualizowana po zmianie slidera. W <script setup> kod wykonuje sie przy
 * tworzeniu komponentu, wiec to dobre miejsce na utworzenie obiektu.
 */

const calculations = new Calculations();

/**
 * Funkcja pomocnicza wyciaga z itemsList konkretna wartosc po nazwie.
 * Zwracamy fallback, bo TypeScript przy noUncheckedIndexedAccess slusznie
 * przypomina, ze szukany element moze nie istniec.
 */
function getSliderValue(sliderName: string, fallback: number): number {
  return itemsList.value.find((item) => item.name === sliderName)?.value ?? fallback;
}

/**
 * Slider emituje id i nowa wartosc, a rodzic aktualizuje swoj stan.
 * Tworzymy nowa tablice przez map(), zamiast mutowac obiekt w miejscu. To jest
 * bardzo podobne do Reactowego setItems(items.map(...)) i ulatwia sledzenie
 * przeplywu danych.
 */
function handleSliderValueChanged(id: number, value: number): void {
  itemsList.value = itemsList.value.map((item) => (item.id === id ? { ...item, value } : item));
}

/**
 * Watcher jest odpowiednikiem reakcji na zmiane stanu.
 * W React podobna rola nalezalaby do useEffect(() => { ... }, [itemsList]).
 * immediate: true uruchamia log od razu po starcie komponentu, a potem po
 * kazdej zmianie suwaka.
 */
watch(
  itemsList,
  () => {
    calculations.updateUserData({
      name:"Rafi",
      age: getSliderValue('age', 30),
      height: getSliderValue('height', 180),
      weight: getSliderValue('weight', 80),
      neck:getSliderValue('neck', 80),
      hips:getSliderValue('hips', 80),
      gender:true,
      activity: getSliderValue('activityFactor', 1.2),
    });

    calculations.getResults();

  },
  { immediate: true },
);
</script>

<template>
  <h1>Profile page</h1>
  <p>set up your parameters</p>
  <div class="sliders-container">
    <Slider
      v-for="item in itemsList"
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
</style>
