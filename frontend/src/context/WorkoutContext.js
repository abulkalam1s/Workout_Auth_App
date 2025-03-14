import { createContext, useReducer } from "react";

// reducer function
export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      // console.log(action.payload);
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUT":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

// Create context
export const WorkoutContext = createContext();

// Creating Context Component
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: null,
  });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children} {/* *1: children is <App/> ...more below*/}
    </WorkoutContext.Provider>
  );
};

// *1: children is App because it is inside <WorkoutsContextProvider> component in index.js file,
//     now all the children can acces the 'state' and 'dispatch' function as it is passed from <WorkoutsContextProvider> to its children
