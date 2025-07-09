export const reduxMock = {
  aboutYou: {
    aboutYou: {
      experienceLevel: "advanced",
      alcoholConsumption: "40+",
      gender: "male",
      age: "45-54",
      height: "5'10",
      weight: "105kg",
      bodyType: "ecto-meso",
      stressLevel: "moderate",
      smoking: "yes",
      activityLevel: "moderately-active",
    },
  },
  injuries: {
    injuries: {
      upperBody: "none",
      lowerBody: "none",
      generalConditions: "none",
      medicalRestrictions: "none",
      foodAllergies: "none",
      otherSensitivities: "none",
    },
  },
  yourGoals: {
    yourGoals: {
      primaryGoal: "lose-weight",
      secondaryGoal: "gain-strength-no-bulk",
      motivationLevel: "highly-motivated",
      targetTimeline: "6-months",
    },
  },
  preferences: {
    preferences: {
      workoutType: ["Boxing", "Basketball"],
      equipmentAvailability: "Basic Home Gym",
      timePerSession: "45 - 60 minutes",
      daysPerWeek: "3 days per week",
      workoutTime: "Early Morning Before 8 AM",
      socialPreference: "Solo Workouts",
    },
  },
  user: {
    user: {
      userName: "clientUserName",
      userPassword: "clientPassword",
      userFitnessPlan: {
        overview: {
          title: "Overview",
          copy: "Create a personalized fitness plan for a highly motivated 45-54 years old male, standing at 5'10 and weighing 105kg. Body type is ecto-meso with an advanced fitness level and moderately-active lifestyle. No specific injuries or medical restrictions reported. Goals include losing weight and gaining strength without bulking up within a 6-month timeline.",
        },
        weeklySchedule: {
          title: "Weekly Schedule",
          days: [
            {
              day: "Day 1",
              title: "Boxing Workout Focus",
              exercises: [
                {
                  exercise: "Jump Rope",
                  action: "150 jumps, 3 sets",
                },
                {
                  exercise: "Shadow Boxing",
                  action:
                    "5 rounds of 3 minutes each, focus on footwork and technique",
                },
                {
                  exercise: "Heavy Bag Work",
                  action:
                    "4 rounds of 3 minutes each, focus on combos and power",
                },
              ],
            },
            {
              day: "Day 2",
              title: "Basketball Workout Focus",
              exercises: [
                {
                  exercise: "Dribbling Drills",
                  action: "20 minutes of various dribbling drills",
                },
                {
                  exercise: "Shooting Practice",
                  action: "50 jump shots, focusing on form and accuracy",
                },
                {
                  exercise: "Scrimmage or Pickup Game",
                  action:
                    "Play for 30-45 minutes, focusing on agility and endurance",
                },
              ],
            },
            {
              day: "Day 3",
              title: "Active Recovery",
              exercises: [
                {
                  exercise: "Stretching",
                  action: "Full-body stretching for 15-20 minutes",
                },
                {
                  exercise: "Light Cardio",
                  action: "30-minute walk or jog at a comfortable pace",
                },
              ],
            },
          ],
        },
        nutritionLifestyleTips: {
          title: "Nutrition and Lifestyle Tips",
          tips: [
            {
              tip: "Diet",
              action:
                "Focus on a balanced diet with lean proteins, whole grains, and plenty of fruits and veggies. Limit processed foods and sugary drinks. Consider consulting a nutritionist for a personalized plan. <a href='https://www.nutrition.gov' rel='noopener noreferrer' target='_blank'>View here</a>",
            },
            {
              tip: "Sleep",
              action:
                "Ensure you get 7-9 hours of quality sleep each night to support recovery and overall health. Create a bedtime routine and limit screen time before bed.",
            },
            {
              tip: "Progress Tracking",
              action:
                "Keep a workout and nutrition journal to track your progress. Set realistic goals and celebrate small achievements along the way.",
            },
          ],
        },
        conclusion: {
          title: "Conclusion",
          copy: "Stay committed to your fitness journey, listen to your body, and make adjustments as needed. Progress may vary, but consistency is key. Keep pushing yourself while prioritizing recovery, and you will reach your goals. Remember, it's about progress, not perfection.",
        },
      },
    },
  },
  uiData: {
    uiData: {
      isSignedIn: false,
      isRetrieving: false,
      isEditing: false,
    },
  },
  journey: {
    journey: {
      journeyData: [
        {
          name: "/questions/about-you",
          isComplete: true,
          canNavigate: true,
        },
        {
          name: "/questions/injuries",
          isComplete: true,
          canNavigate: true,
        },
        {
          name: "/questions/your-goals",
          isComplete: true,
          canNavigate: true,
        },
        {
          name: "/questions/preferences",
          isComplete: true,
          canNavigate: true,
        },
        {
          name: "/your-custom-fit",
          isComplete: true,
          canNavigate: true,
        },
      ],
      routes: {
        currentRoute: "/your-custom-fit",
        nextRoute: "",
        prevRoute: "/questions/preferences",
      },
    },
  },
  _persist: {
    version: -1,
    rehydrated: true,
  },
};
