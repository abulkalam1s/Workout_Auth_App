import { useEffect } from "react";
// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts");
      const json = await response.json();

      console.log("Response Status:", response.status);

      if (response.ok) {
        // setWorkouts(json.workouts);
        // console.log(json.workouts);
        dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
      }
    };

    fetchWorkouts();
  }, [workouts]);

  return (
    <div className="home">
      <div className="workouts">
        {console.log(workouts)}
        {Array.isArray(workouts) &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
