import { defineStore } from 'pinia';
import { UserMetrics } from '@/models/user/UserMetrics.ts';
import { useSliderItemsStore } from '@/stores/sliderStore.ts';
/**
 * Pinia store jest centralnym miejscem dla stanu uzytkownika.
 * Kazdy komponent, ktory wywola useUserStore(), dostanie te sama reaktywna instancje.
 */
export const useUserStore = defineStore('user', {
  /**
   * state() odpowiada za dane przechowywane w store.
   * Pinia robi je reaktywne, wiec zmiana np. name albo age odswieza komponenty,
   * ktore czytaja te pola.
   */
  state: () => new UserMetrics(),
  actions: {
    /**
     * Akcja pobiera aktualne wartosci ze sliderStore i zapisuje je jako dane
     * uzytkownika. Store moze uzyc innego store'a, ale robimy to wewnatrz akcji,
     * zeby Pinia byla juz poprawnie zainicjalizowana przez app.use(pinia).
     */
    updateUserFromSliders(): void {
      const sliderItemsStore = useSliderItemsStore();

      this.age = sliderItemsStore.getSliderValue('age', this.age ?? 30);
      this.height = sliderItemsStore.getSliderValue('height', this.height ?? 180);
      this.weight = sliderItemsStore.getSliderValue('weight', this.weight ?? 80);
      this.activity = sliderItemsStore.getSliderValue('activity factor', this.activity ?? 1.2);
    },
    /**
     * Akcja pozwala aktualizowac pojedyncze pola uzytkownika bez wiedzy o tym,
     * jak wyglada caly obiekt UserMetrics. Przyda sie np. dla gender, neck, hips.
     */
    updateUser(data: Partial<UserMetrics>): void {
      Object.assign(this, data);
    },
    /**
     * Metoda tworzy zwykly obiekt UserMetrics na potrzeby klasy Calculations.
     * Dzieki temu klasa kalkulacji nie dostaje calego Pinia store'a z akcjami.
     */
    toUserMetrics(): UserMetrics {
      return new UserMetrics(
        this.name ?? undefined,
        this.age ?? undefined,
        this.gender ?? undefined,
        this.weight ?? undefined,
        this.height ?? undefined,
        this.neck ?? undefined,
        this.hips ?? undefined,
        this.activity ?? undefined,
      );
    },
  },
});
