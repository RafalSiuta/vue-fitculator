<script setup lang="ts">
import type { SliderItem } from '@/types/slider/SliderItem';

const props = defineProps<{
  sliderItem: SliderItem;
}>();

/**
 * Emit to mechanizm komunikacji dziecka z rodzicem w Vue.
 * Komponent Slider nie powinien sam mutowac propsa, bo props nalezy do
 * ProfilePage. To podobne do Reacta: dziecko dostaje value i wywoluje callback,
 * a rodzic decyduje, jak zmienic stan.
 */
const emit = defineEmits<{
  valueChanged: [id: number, value: number];
}>();

/**
 * Event z input range zwraca wartosc jako string, dlatego jawnie zamieniamy ja
 * na number. Dzieki temu cala reszta aplikacji pracuje na liczbach.
 */
function handleInput(event: Event): void {
  const input = event.target as HTMLInputElement;

  emit('valueChanged', props.sliderItem.id, Number(input.value));
}
</script>

<template>
  <div :key="props.sliderItem.id" class="slider-container">
    <label>
      {{ props.sliderItem.name }} {{ props.sliderItem.value }}
      <small>{{ props.sliderItem.unit }}</small>
    </label>
    <br />
    <div class="range-container">
      <span>-</span>
      <input
        :value="props.sliderItem.value"
        class="slider"
        type="range"
        :min="props.sliderItem.min"
        :max="props.sliderItem.max"
        :step="props.sliderItem.step ?? 1"
        @input="handleInput"
      />
      <span>+</span>
    </div>
  </div>
</template>

<style scoped>
.slider-container {
  max-width: 400px;
}

.range-container {
  display: flex;
  max-width: 400px;
  justify-content: space-evenly;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  accent-color: aqua;
  width: 100%;
  height: 1px;
  background: #474747;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: aqua;
  cursor: grab;
  border-radius: 50%;
}

span {
  display: block;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

label {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
