import {UserMetrics} from "@/models/user/UserMetrics.ts";
import type {CalculationResult} from "@/types/calculation_result/CalculationResult.ts";

/**
 * Ten typ opisuje "sprawdzonego" uzytkownika dla aktualnych kalkulacji.
 * UserMetrics pozwala na null, bo formularz/profil moze byc niekompletny.
 * ValidatedUserMetrics mowi TypeScriptowi: po walidacji te pola sa juz pewne.
 */
type ValidatedUserMetrics = UserMetrics & {
  age: number
  gender: boolean
  weight: number
  height: number
  activity: number
}

export default class Calculations {
  // private user: User;

  user:UserMetrics | null

   constructor(
      user:UserMetrics = new UserMetrics()
  ) {
    this.user = user;
  }

  public updateUserData(data: UserMetrics): void {
    this.user = data;
  }

  public bmi(): CalculationResult {
    const bmi = {
      title:"BMI",
      unit:"",
      description:"",
      result:0
    }
    /*
     * Twoja wersja:
     * if(this.user?.height && this.user?.weight != null){
     *
     * Ona dziala, ale miesza dwa mechanizmy:
     * 1. this.user?.height sprawdza "truthy/falsy", czyli np. 0 jest traktowane jak false.
     * 2. this.user?.weight != null sprawdza tylko null albo undefined.
     *
     * Czytelniej jest najpierw sprawdzic, czy this.user istnieje, a potem jawnie
     * sprawdzic, czy liczby potrzebne do wzoru sa wieksze od 0.
     *
     * Jeszcze lepsza wersja jest nizej: korzystamy z getValidatedUser(), zeby
     * nie powtarzac tego samego warunku w kazdej metodzie kalkulacji.
     */
    const user = this.getValidatedUser();

    if(user !== null){
      const heightInMeters = user.height / 100;
      bmi.result = this.roundTo(user.weight / heightInMeters ** 2, 2);
    }else{
      bmi.result = 0;
    }
    if (bmi.result < 18.5) {
      bmi.unit = 'underweight';
      bmi.description = 'underweight description';
    } else if (bmi.result >= 18.5 && bmi.result <= 24.0) {
      bmi.unit = 'healthy weight';
      bmi.description = 'healthy weight description';

    } else if (bmi.result >= 24.0 && bmi.result <= 24.99) {
      bmi.unit = 'ideal weight';
      bmi.description = 'ideal weight description';

    } else if (bmi.result >= 24.99 && bmi.result <= 29.99) {
      bmi.unit = 'overweight';
      bmi.description = 'overweight description';
    } else if (bmi.result >= 30) {
      bmi.unit = 'obese';
      bmi.description = 'obese description';
    }
    console.log(`your BMI is ${bmi.result} ${bmi.unit} ${bmi.description}`);
    return bmi;
  }

  public baseMetabolicRate(): CalculationResult {
    const bmr = {
      title:"BMR",
      unit:"kcal",
      description:"basal metabolic rate",
      result:0
    }
    /*
     * Twoja wersja:
     * if(this.user?.height && this.user?.weight && this.user?.age != null){
     *
     * Problem jest podobny jak wyzej. Dodatkowo przez priorytet operatorow zapis
     * this.user?.age != null dotyczy tylko age, a height/weight sa sprawdzane
     * przez truthy/falsy. To moze byc mylace, bo wyglada jak jedna wspolna
     * walidacja, ale kazde pole jest sprawdzane troche inaczej.
     *
     * Teraz warunek jest schowany w getValidatedUser(). Jesli metoda zwroci
     * usera, TypeScript wie, ze height/weight/age/activity/gender sa poprawne.
     */
    const user = this.getValidatedUser();

    if(user !== null){
      const genderModifier = user.gender === true ? 5 : -161;
      bmr.result = this.roundTo(( 10 * user.weight + 6.25 * user.height - 5 * user.age + genderModifier), 0);
    }else{
      bmr.result = 0;
    }
    console.log(`your BMR is ${bmr.result} ${bmr.unit} ${bmr.description}`);
    return bmr;
  }

  public totalEnergyRequirement(): CalculationResult {
    const ter = {
      title:"TER",
      unit:"kcal",
      description:"total energy requirement",
      result:0
    }
    /*
     * Twoja wersja:
     * if(this.user?.activity != null){
     *
     * Tutaj warunek byl blizej poprawnego, bo != null dobrze lapie null i
     * undefined. Dla wzoru TER warto jednak dopisac, ze activity ma byc dodatnie.
     *
     * Wspolna walidacja upraszcza tez TER, bo activity jest juz number > 0.
     */
    const user = this.getValidatedUser();
    const bmrResult = this.baseMetabolicRate().result;

    if(user !== null){
      ter.result =  this.roundTo(bmrResult * user.activity, 0);
    }else{
      ter.result = bmrResult;
    }
    console.log(`your TER is ${ter.result} ${ter.unit} ${ter.description}`);
    return ter;
  }

  public getResults(): void {

     this.bmi();
     this.baseMetabolicRate();
     this.totalEnergyRequirement();

  }

  public getResultsList():CalculationResult[] {
    return [
      this.bmi(),
      this.baseMetabolicRate(),
      this.totalEnergyRequirement(),
    ]
  }

  /**
   * Prywatna metoda jest widoczna tylko wewnatrz klasy. To dobry sposob na
   * ukrycie technicznego detalu, ktory nie jest czescia publicznego API klasy.
   */
  private roundTo(value: number, precision: number): number {
    const multiplier = 10 ** precision;

    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * Prywatna metoda walidujaca zbiera w jednym miejscu pytanie:
   * "czy mam komplet danych potrzebnych do obliczen?".
   *
   * Jesli cos jest niepoprawne, zwracamy null. W metodach bmi/bmr/ter wystarczy
   * wtedy prosty zapis: const user = this.getValidatedUser(); if(user !== null).
   *
   * To jest podobne do guard clause w React/Flutter: najpierw wychwytujesz stan,
   * w ktorym nie da sie liczyc, a dopiero potem wykonujesz wlasciwa logike.
   */
  private getValidatedUser(): ValidatedUserMetrics | null {
    const user = this.user;

    if (user === null) {
      return null;
    }

    const hasRequiredNumbers =
      user.height !== null &&
      user.weight !== null &&
      user.age !== null &&
      user.activity !== null &&
      user.height > 0 &&
      user.weight > 0 &&
      user.age > 0 &&
      user.activity > 0;

    if (!hasRequiredNumbers || user.gender === null) {
      return null;
    }

    /*
     * TypeScript widzi powyzsze warunki, ale nie zawsze sam umie zamienic caly
     * obiekt UserMetrics na bardziej szczegolowy typ ValidatedUserMetrics.
     * Rzutowanie "as" jest tutaj bezpieczne, bo przed nim recznie sprawdzilismy
     * wszystkie pola, ktore w ValidatedUserMetrics nie moga byc null.
     */
    return user as ValidatedUserMetrics;
  }
}
