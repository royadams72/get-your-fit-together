export const enum units {
  KG = "kg",
  LBS = "lbs",
}

export const weightOptionsLbs = [
  { value: "", display: "Select your weight" },
  { value: "100lbs", display: "100 lbs" },
  { value: "110lbs", display: "110 lbs" },
  { value: "120lbs", display: "120 lbs" },
  { value: "130lbs", display: "130 lbs" },
  { value: "140lbs", display: "140 lbs" },
  { value: "150lbs", display: "150 lbs" },
  { value: "160lbs", display: "160 lbs" },
  { value: "170lbs", display: "170 lbs" },
  { value: "180lbs", display: "180 lbs" },
  { value: "190lbs", display: "190 lbs" },
  { value: "200lbs", display: "200 lbs" },
  { value: "210lbs", display: "210 lbs" },
  { value: "220lbs", display: "220 lbs" },
  { value: "230lbs", display: "230 lbs" },
  { value: "240lbs", display: "240 lbs" },
  { value: "250lbs", display: "250 lbs" },
  { value: "260lbs", display: "260 lbs" },
  { value: "270lbs", display: "270 lbs" },
  { value: "280lbs", display: "280 lbs" },
  { value: "290lbs", display: "290 lbs" },
  { value: "over290lbs", display: "over 240 lbs" },
];

export const weightOptionsKg = [
  { value: "", display: "Select your weight" },
  { value: "45kg", display: "45 kg" },
  { value: "50kg", display: "50 kg" },
  { value: "55kg", display: "55 kg" },
  { value: "60kg", display: "60 kg" },
  { value: "65kg", display: "65 kg" },
  { value: "70kg", display: "70 kg" },
  { value: "75kg", display: "75 kg" },
  { value: "80kg", display: "80 kg" },
  { value: "85kg", display: "85 kg" },
  { value: "90kg", display: "90 kg" },
  { value: "95kg", display: "95 kg" },
  { value: "100kg", display: "100 kg" },
  { value: "105kg", display: "105 kg" },
  { value: "110kg", display: "110 kg" },
  { value: "115kg", display: "115 kg" },
  { value: "120kg", display: "120 kg" },
  { value: "125kg", display: "125 kg" },
  { value: "over125kg", display: "over 125 kg" },
];

export const weightTogglgOptions = [
  {
    label: "Set Weight in KG",
    value: units.KG,
    toggleOption: weightOptionsKg,
  },
  {
    label: "Set Weight in LBS",
    value: units.LBS,
    toggleOption: weightOptionsLbs,
  },
];
