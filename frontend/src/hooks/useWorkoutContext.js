// We are declaring it in a separate file rather than using using in the component directly where we want to use, because
// Because whenever we want it, we can import the state From useContext hook, from this functionor rather than directly on that component.

import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);

  // When this function is called from outside of the component tree then this function will return null, That is, we want to use this function inside the app component only because outside the app componentworkout contacts provider is wrapped
  if (!context) {
    throw Error(
      "Use workoutContext must be used inside the workoutContextProvider"
    );
  }
  return context; // so that So that we can get the values passed from the context
}
