import { defineStore } from 'pinia';
import type { CalculationResult } from '@/types/calculation_result/CalculationResult.ts';
import Calculations from '@/utils/calculations/Calculations.ts';
import { useUserStore } from '@/stores/userStore.ts';

export const useCalculationsStore = defineStore('calculations', {
  getters: {
    /**
     * Getter przelicza wyniki na podstawie aktualnego userStore.
     * Nie trzymamy tutaj drugiej kopii usera, bo wtedy latwo o rozjazd danych.
     */
    resultsList(): CalculationResult[] {
      const userStore = useUserStore();
      const calculations = new Calculations(userStore.toUserMetrics());

      return calculations.getResultsList();
    },
  },
});
