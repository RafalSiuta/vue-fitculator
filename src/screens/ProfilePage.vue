<script setup lang="ts">
import Slider from '@/components/Slider.vue';
import type { SliderItem } from '@/types/slider/SliderItem';
import { useCalculationsContext } from '@/context/calculationsContext.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { ref, watch } from 'vue';

/**
 * To jest ta sama instancja store, ktora czyta HomePage.
 * Zapis w tym komponencie bedzie od razu widoczny w kazdym innym komponencie uzywajacym useUserStore().
 */
const userStore = useUserStore();

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
    value:userStore.userAge,
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
 * Pobieramy wspolny kontekst utworzony w App.vue.
 * ProfilePage nie tworzy juz wlasnej instancji Calculations, bo wtedy wyniki
 * zylby tylko lokalnie w tej podstronie i CalculationsPage ich nie zobaczy.
 */
const { updateUserMetrics } = useCalculationsContext();



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
  userStore.userAge = value;
}

/**
 * Watcher jest odpowiednikiem reakcji na zmiane stanu.
 * W React podobna rola nalezalaby do useEffect(() => { ... }, [itemsList, userName]).
 * immediate: true uruchamia log od razu po starcie komponentu, a potem po
 * kazdej zmianie suwaka albo nazwy uzytkownika w Pinia store.
 */
watch(
  [itemsList, () => userStore.userName],
  () => {
    updateUserMetrics({
      name: userStore.userName,
      // age: getSliderValue('age', 30),
      age: userStore.userAge,
      height: getSliderValue('height', 180),
      weight: getSliderValue('weight', 80),
      neck:getSliderValue('neck', 80),
      hips:getSliderValue('hips', 80),
      gender:true,
      activity: getSliderValue('activity factor', 1.2),
    });
  },
  { immediate: true },
);
</script>

<template>
  <h1>Profile page</h1>
  <p>set up your parameters</p>
  <div class="sliders-container">
    <!-- v-model zapisuje tekst bezposrednio do Pinia state: userStore.userName. -->
    <input class="user-name" placeholder="enter your name" type="text" v-model="userStore.userName"/>
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
