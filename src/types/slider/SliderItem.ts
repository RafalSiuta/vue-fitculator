export interface SliderItem {
  id: number;
  name: string;
  min: number;
  max: number;
  value: number;
  unit: string;
  step?: number;
}
