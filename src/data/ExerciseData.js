export const exercises = [
    {
      id: 'squat',
      name: 'Squats',
      description: 'A compound exercise that strengthens the lower body muscles including quadriceps, hamstrings, and glutes.',
      difficulty: 'beginner',
      muscleGroups: ['legs', 'glutes'],
      keyPoints: [
        'Stand with feet shoulder-width apart',
        'Keep your back straight and chest up',
        'Lower your body as if sitting in a chair',
        'Keep knees in line with toes',
        'Push through heels to return to standing'
      ],
      poseInstructions: {
        startingPose: {
          keypoints: {
            knees: { angle: 170, tolerance: 10 },
            hips: { angle: 170, tolerance: 10 },
            back: { angle: 90, tolerance: 5 }
          }
        },
        midPose: {
          keypoints: {
            knees: { angle: 90, tolerance: 10 },
            hips: { angle: 90, tolerance: 10 },
            back: { angle: 90, tolerance: 10 }
          }
        }
      },
      repetitionDetection: {
        keypoint: 'knees',
        thresholdAngle: 130
      }
    },
    {
      id: 'pushup',
      name: 'Push-ups',
      description: 'A compound exercise that primarily targets the chest, shoulders, and triceps.',
      difficulty: 'intermediate',
      muscleGroups: ['chest', 'shoulders', 'triceps'],
      keyPoints: [
        'Start in plank position with hands slightly wider than shoulders',
        'Keep your body straight from head to heels',
        'Lower your chest to the ground by bending elbows',
        'Push back up to starting position',
        'Keep core engaged throughout the movement'
      ],
      poseInstructions: {
        startingPose: {
          keypoints: {
            elbows: { angle: 160, tolerance: 10 },
            shoulders: { angle: 40, tolerance: 5 },
            hips: { angle: 170, tolerance: 10 }
          }
        },
        midPose: {
          keypoints: {
            elbows: { angle: 90, tolerance: 10 },
            shoulders: { angle: 20, tolerance: 5 },
            hips: { angle: 170, tolerance: 10 }
          }
        }
      },
      repetitionDetection: {
        keypoint: 'elbows',
        thresholdAngle: 120
      }
    },
    {
      id: 'lunge',
      name: 'Lunges',
      description: 'An exercise that works the quadriceps, hamstrings, glutes, and calves while improving balance and flexibility.',
      difficulty: 'beginner',
      muscleGroups: ['legs', 'glutes', 'calves'],
      keyPoints: [
        'Stand with feet hip-width apart',
        'Take a step forward with one foot',
        'Lower your body until both knees form 90-degree angles',
        'Front knee should be above ankle, not beyond toes',
        'Push through front heel to return to starting position'
      ],
      poseInstructions: {
        startingPose: {
          keypoints: {
            knees: { angle: 170, tolerance: 10 },
            hips: { angle: 170, tolerance: 10 },
            back: { angle: 90, tolerance: 5 }
          }
        },
        midPose: {
          keypoints: {
            frontKnee: { angle: 90, tolerance: 10 },
            backKnee: { angle: 90, tolerance: 10 },
            hips: { angle: 130, tolerance: 10 }
          }
        }
      },
      repetitionDetection: {
        keypoint: 'frontKnee',
        thresholdAngle: 120
      }
    },
    {
      id: 'plank',
      name: 'Plank',
      description: 'An isometric core exercise that strengthens the abdominals, back, and shoulders.',
      difficulty: 'beginner',
      muscleGroups: ['core', 'shoulders', 'back'],
      keyPoints: [
        'Start on forearms and toes',
        'Keep elbows directly under shoulders',
        'Maintain a straight line from head to heels',
        'Engage core and glutes',
        'Avoid sagging hips or raised buttocks'
      ],
      poseInstructions: {
        correctPose: {
          keypoints: {
            shoulders: { angle: 80, tolerance: 10 },
            hips: { angle: 170, tolerance: 10 },
            back: { angle: 180, tolerance: 10 }
          }
        }
      },
      timeBasedExercise: true,
      defaultDuration: 30 // seconds
    }
  ];
  
  export const workoutPlans = [
    {
      id: 'beginner',
      name: 'Beginner Full Body',
      description: 'A simple workout plan for beginners focusing on full body strength.',
      exercises: [
        { exerciseId: 'squat', sets: 3, reps: 10 },
        { exerciseId: 'pushup', sets: 3, reps: 8 },
        { exerciseId: 'lunge', sets: 3, reps: 8 },
        { exerciseId: 'plank', sets: 3, duration: 20 }
      ],
      restBetweenExercises: 60, // seconds
      restBetweenSets: 30 // seconds
    },
    {
      id: 'intermediate',
      name: 'Intermediate Lower Body',
      description: 'A more challenging workout focusing on lower body strength.',
      exercises: [
        { exerciseId: 'squat', sets: 4, reps: 12 },
        { exerciseId: 'lunge', sets: 4, reps: 10 },
        { exerciseId: 'plank', sets: 3, duration: 45 }
      ],
      restBetweenExercises: 45, // seconds
      restBetweenSets: 30 // seconds
    }
  ];