import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthHook } from "../hooks/useAuthHook";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthHook();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      console.log("Response Status:", response.status);

      if (response.ok) {
        // console.log(json.workouts);
        dispatch({ type: "SET_WORKOUTS", payload: json.workouts });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]); //** 'workouts' de dena, continus run ho rha tha find issue isliy hata diye */

  return (
    <div className="home">
      <div className="workouts">
        {/* {console.log(workouts)} */}
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
