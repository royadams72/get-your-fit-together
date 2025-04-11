export const equipmentOptions = [
  { value: "", display: "What equipment do you have access to?" },
  { value: "No Equipment", display: "No Equipment (Bodyweight Only)" },
  {
    value: "Minimal Equipment",
    display: "Minimal Equipment (Resistance Bands, Yoga Mat, Dumbbells)",
  },
  {
    value: "Basic Home Gym",
    display: "Basic Home Gym (Dumbbells, Kettlebells, Jump Rope, Pull-Up Bar)",
  },
  {
    value: "Full Home Gym",
    display:
      "Full Home Gym (Squat Rack, Barbell, Bench, Weights, Cardio Machine, etc.)",
  },
  {
    value: "Gym Access",
    display: "Gym Access (Full Gym with Machines, Free Weights, etc.)",
  },
];

export const timeOptions = [
  { value: "", display: "How long can you commit per workout?" },
  { value: "Under 15 minutes", display: "Under 15 minutes" },
  { value: "15 - 30 minutes", display: "15-30 minutes" },
  { value: "30 - 45 minutes", display: "30-45 minutes" },
  { value: "45 - 60 minutes", display: "45-60 minutes" },
  { value: "60 minutes plus", display: "60+ minutes" },
];

export const daysOptions = [
  { value: "", display: "How many days can you commit to working out?" },
  {
    value: "1 - 2 days per week",
    display: "1-2 days per week (Light Commitment)",
  },
  {
    value: "3 - 4 days per week",
    display: "3-4 days per week (Balanced Routine)",
  },
  {
    value: "5 - 6 days per week",
    display: "5-6 days per week (High Commitment, Dedicated Routine)",
  },
  {
    value: "7 days per week",
    display: "7 days per week (Daily Training, Active Recovery Included)",
  },
];

export const workoutTimeOptions = [
  { value: "", display: "When do you prefer to train?" },
  {
    value: "Early Morning Before 8 AM",
    display: "Early Morning (Before 8 AM)",
  },
  { value: "Mid Morning 8 AM - 11 AM", display: "Mid-Morning (8 AM - 11 AM)" },
  { value: "Afternoon 12 PM - 3 PM", display: "Afternoon (12 PM - 3 PM)" },
  { value: "Evening 4 PM - 7 PM", display: "Evening (4 PM - 7 PM)" },
  { value: "Late Night After 7 PM", display: "Late Night (After 7 PM)" },
  {
    value: "No Preference Flexible Schedule",
    display: "No Preference (Flexible Schedule)",
  },
];

export const socialPreferenceOptions = [
  { value: "", display: "Do you prefer working out alone or with others?" },
  {
    value: "Solo Workouts",
    display: "Solo Workouts (I prefer training alone, focused on my routine.)",
  },
  {
    value: "Partner Workouts",
    display: "Partner Workouts (I like training with a workout buddy.)",
  },
  {
    value: "Small Group Training",
    display: "Small Group Training (2-4 people, semi-private coaching.)",
  },
  {
    value: "Group Classes",
    display: "Group Classes (Spin, Bootcamp, Zumba, etc.)",
  },
  {
    value: "Virtual Workouts",
    display: "Virtual Workouts (Home-based, online classes, fitness apps.)",
  },
];

export const workoutCheckboxes = [
  { label: "Cardio", value: false },
  { label: "Strength Training", value: false },
  { label: "Yoga", value: false },
  { label: "High-Intensity Interval Training", value: false },
  { label: "Pilates & Core Training", value: false },
  { label: "Bodyweight & Calisthenics", value: false },
  { label: "CrossFit & Circuits", value: false },
  { label: "Sports Training (Basketball, Soccer, etc.)", value: false },
  { label: "Dance & Aerobic Workouts", value: false },
  { label: "Martial Arts & Combat Sports", value: false },
  { label: "Outdoor Workouts & Hiking", value: false },
  /* Dummy item to make sure there are 12 items/even number of items
   Remove if necessary */
  { label: "Dummy", value: false },
];
