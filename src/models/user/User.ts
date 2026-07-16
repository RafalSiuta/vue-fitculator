/**
 * Typ unii ogranicza mozliwe wartosci plci do dwoch konkretnych napisow.
 * Dla poczatkujacego: to dziala podobnie jak enum, ale jest lzejsze i bardzo
 * popularne w TypeScript. Kompilator podpowie blad, jesli wpiszesz np. "man".
 */
export type Gender = 'male' | 'female';

/**
 * Interfejs opisuje ksztalt danych potrzebnych do utworzenia uzytkownika.
 * Konstruktor przyjmuje jeden obiekt zamiast wielu argumentow po kolei, bo przy
 * klasach z kilkoma polami latwiej wtedy uniknac pomylki typu:
 * new User("Rafal", "male", 80, 180, 30).
 */
export interface UserParams {
  name?: string;
  gender?: Gender;
  age?: number;
  height?: number;
  weight?: number;
  activityFactor?: number;
}

/**
 * Klasa User jest modelem danych, czyli prostym opisem "jaki jest uzytkownik".
 * Nie liczymy tutaj BMI/BMR/TER, bo te obliczenia sa osobna odpowiedzialnoscia
 * klasy Calculations. To podobna separacja jak w React: stan moze byc w jednym
 * miejscu, a logika liczaca pochodne wartosci w osobnym hooku/funkcji.
 */
export default class User {
  name: string;
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  activityFactor: number;

  /**
   * Konstruktor ustawia domyslne wartosci, dzieki czemu instancja User jest od
   * razu kompletna. Jesli nie podasz np. wieku, obliczenia dalej maja liczbe,
   * a TypeScript nie musi zgadywac, czy pole moze byc undefined.
   */
  public constructor({
    name = 'Testowy uzytkownik',
    gender = 'male',
    age = 30,
    height = 180,
    weight = 80,
    activityFactor = 1.2,
  }: UserParams = {}) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.height = height;
    this.weight = weight;
    this.activityFactor = activityFactor;
  }
}