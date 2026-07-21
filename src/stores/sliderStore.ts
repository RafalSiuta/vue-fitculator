import { defineStore } from 'pinia';
import type { SliderItem } from '@/types/slider/SliderItem.ts';

export const useSliderItemsStore = defineStore('sliderItems', {
  state: (): { itemsList: SliderItem[] } => ({
    itemsList: [
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
    ],
  }),
  actions: {
    /**
     * Akcja aktualizuje jeden slider po id, czyli w komponencie nie trzeba
     * wiedziec, jak wewnetrznie przechowywana jest lista w Pinia store.
     */
    handleSliderValueChanged(id: number, value: number): void {
      const sliderItem = this.itemsList.find((item) => item.id === id);

      if (sliderItem) {
        sliderItem.value = value;
      }
    },
    /**
     * Getter w formie akcji jest wygodny, kiedy chcesz pobrac wartosc po nazwie
     * np. przy obliczeniach, ale zachowac fallback dla brakujacego slidera.
     */
    getSliderValue(sliderName: string, fallback: number): number {
      return this.itemsList.find((item) => item.name === sliderName)?.value ?? fallback;
    },
  },
});
