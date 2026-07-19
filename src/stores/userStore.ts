import { defineStore } from 'pinia';

/**
 * Pinia store jest centralnym miejscem dla stanu uzytkownika.
 * Kazdy komponent, ktory wywola useUserStore(), dostanie te sama reaktywna instancje.
 */
export const useUserStore = defineStore('user', {
  /**
   * state() odpowiada za dane przechowywane w store.
   * Pinia robi je reaktywne, wiec zmiana userName odswieza komponenty, ktore go czytaja.
   */
  state: () => ({
    userName: '',
  }),
});
