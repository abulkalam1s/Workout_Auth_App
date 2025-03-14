import { useWorkoutContext } from "../hooks/useWorkoutContext";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthHook } from "../hooks/useAuthHook";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthHook();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/workouts/" + workout._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json.data }); // here data is the deleted Workout
    }
  };

  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Load: </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete} className="material-symbols-outlined">
        Delete
      </span>
    </div>
  );
}

export default WorkoutDetails;
