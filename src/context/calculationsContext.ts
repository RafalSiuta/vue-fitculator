import { inject, provide, ref, type InjectionKey, type Ref } from 'vue';
import { UserMetrics } from '@/models/user/UserMetrics.ts';
import type { CalculationResult } from '@/types/calculation_result/CalculationResult.ts';
import Calculations from '@/utils/calculations/Calculations.ts';

/**
 * Context opisuje dane i funkcje, ktore chcemy udostepnic wielu podstronom.
 * To jest bardzo podobna idea do React Context albo Provider w Flutterze:
 * stan zyje wyzej w drzewie komponentow, a dzieci moga go pobrac bez propsow.
 */
interface CalculationsContext {
  userMetrics: Ref<UserMetrics>;
  resultsList: Ref<CalculationResult[]>;
  updateUserMetrics: (data: Partial<UserMetrics>) => void;
}

/**
 * InjectionKey daje TypeScriptowi informację, jaki typ danych kryje sie pod
 * danym kluczem provide/inject. Symbol jest bezpieczniejszy niz zwykly string,
 * bo trudno przypadkowo uzyc identycznego klucza do innego kontekstu.
 */
const calculationsContextKey: InjectionKey<CalculationsContext> = Symbol('calculationsContext');

/**
 * Funkcja tworzy nowy obiekt UserMetrics na podstawie poprzedniego stanu i
 * czesciowych danych z formularza. Partial<UserMetrics> oznacza, ze mozna
 * przekazac np. tylko { weight: 82 }, bez podawania calego uzytkownika.
 */
function createUserMetrics(data: Partial<UserMetrics>, fallback: UserMetrics): UserMetrics {
  return new UserMetrics(
    data.name ?? fallback.name ?? undefined,
    data.age ?? fallback.age ?? undefined,
    data.gender ?? fallback.gender ?? undefined,
    data.weight ?? fallback.weight ?? undefined,
    data.height ?? fallback.height ?? undefined,
    data.neck ?? fallback.neck ?? undefined,
    data.hips ?? fallback.hips ?? undefined,
    data.activity ?? fallback.activity ?? undefined,
  );
}

/**
 * Provider tworzy wspolny, reaktywny stan i udostepnia go komponentom nizej.
 * Uzywamy ref(), bo chcemy jawnie widziec, gdzie Vue trzyma reaktywna wartosc:
 * userMetrics.value i resultsList.value. To dobry krok przed nauka Pinia.
 */
export function provideCalculationsContext(): void {
  const userMetrics = ref<UserMetrics>(new UserMetrics());
  const calculations = new Calculations(userMetrics.value);
  const resultsList = ref<CalculationResult[]>(calculations.getResultsList());

  /**
   * To jest jedna centralna akcja zmiany stanu.
   * ProfilePage nie musi wiedziec, jak przeliczyc BMI/BMR/TER. Wysyla tylko
   * nowe dane, a kontekst aktualizuje userMetrics i odswieza resultsList.
   */
  function updateUserMetrics(data: Partial<UserMetrics>): void {
    userMetrics.value = createUserMetrics(data, userMetrics.value);
    calculations.updateUserData(userMetrics.value);
    resultsList.value = calculations.getResultsList();
  }

  provide(calculationsContextKey, {
    userMetrics,
    resultsList,
    updateUserMetrics,
  });
}

/**
 * Helper ukrywa techniczny detal inject().
 * inject() moze zwrocic undefined, jesli komponent nie jest opakowany providerem.
 * Zamiast sprawdzac to w kazdej podstronie, robimy jeden czytelny blad tutaj.
 */
export function useCalculationsContext(): CalculationsContext {
  const context = inject(calculationsContextKey);

  if (context === undefined) {
    throw new Error('useCalculationsContext musi byc uzyte pod provideCalculationsContext().');
  }

  return context;
}
