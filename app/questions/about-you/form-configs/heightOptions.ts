export type HeightUnit = "heightOptionsFt" | "heightOptionsCm";
export interface Units {
  value: string;
  label: string;
}
export const enum units {
  feet = "feet",
  cm = "cm",
}
export const heightOptionsFt = [
  { value: "", display: "Select your height" },
  { value: "4'10", display: "4'10" },
  { value: "4'11", display: "4'11" },
  { value: "5'0", display: "5'0" },
  { value: "5'1", display: "5'1" },
  { value: "5'2", display: "5'2" },
  { value: "5'3", display: "5'3" },
  { value: "5'4", display: "5'4" },
  { value: "5'5", display: "5'5" },
  { value: "5'6", display: "5'6" },
  { value: "5'7", display: "5'7" },
  { value: "5'8", display: "5'8" },
  { value: "5'9", display: "5'9" },
  { value: "5'10", display: "5'10" },
  { value: "5'11", display: "5'11" },
  { value: "6'0", display: "6'0" },
  { value: "6'1", display: "6'1" },
  { value: "6'2", display: "6'2" },
  { value: "6'3", display: "6'3" },
  { value: "6'4", display: "6'4" },
  { value: "over 6'4", display: "over 6'4" },
];

export const heightOptionsCm = [
  { value: "", display: "Select your height" },
  { value: "150cm", display: "150 cm" },
  { value: "155cm", display: "155 cm" },
  { value: "160cm", display: "160 cm" },
  { value: "165cm", display: "165 cm" },
  { value: "170cm", display: "170 cm" },
  { value: "175cm", display: "175 cm" },
  { value: "180cm", display: "180 cm" },
  { value: "185cm", display: "185 cm" },
  { value: "190cm", display: "190 cm" },
  { value: "195cm", display: "195 cm" },
  { value: "200cm", display: "200 cm" },
  { value: "over 200cm", display: "over 200 cm" },
];

export const heightTogglgOptions = [
  {
    label: "Set Height in Feet",
    value: units.feet,
    toggleOption: heightOptionsFt,
  },
  { label: "Set Height in CM", value: units.cm, toggleOption: heightOptionsCm },
];
