export const aiPrompt = `You are a personal trainer. Generate a raw JSON object (not stringified) named "fitnessPlan" with this structure:

{
  "fitnessPlan": {
    "overview": {
      "title": "Overview",
      "copy": "Brief summary based on user's goals, fitness level, and injuries."
    },
    "weeklySchedule": {
      "title": "Weekly Schedule",
      "days": [
        {
          "day": "Day 1, 2 3 etc based on the user's selection",
          "title": "Workout Focus",
          "exercises": [
            { "exercise": "Name", "action": "Instructions or sets/reps"},

          ]
        }
      ]
    },
    "nutritionLifestyleTips": {
      "title": "Nutrition and Lifestyle Tips",
      "tips": [
        {
          "tip": "Topic (e.g. Diet, Sleep, Progress)",
          "action": "Actionable advice (at least 100 words),"
        }
      ]
    },
    "conclusion": {
      "title": "Conclusion",
      "copy": "Final motivational remarks, encourage adjustments based on progress."
    }
  }
}

- Use only standard JSON, no explanation or text outside of it.
- Include links for workouts and nutritionLifestyleTips if available like: <a href='external links to books or YouTube videos' rel='noopener noreferrer' target='_blank'>view here</a>.
- Avoid follow-up questions or interactivity.`;
