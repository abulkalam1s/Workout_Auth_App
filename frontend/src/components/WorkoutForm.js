import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthHook } from "../hooks/useAuthHook";

function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthHook();

  // For 'form state' management
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const [error, setError] = useState(null);

  // For clearing the input fields after submiting the form
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // agar user login hai hi nahi to form can't be submitted
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, reps };

    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields); // 'emptyFields' is also an array declared in the backend and passing it
    }

    if (response.ok) {
      setEmptyFields([]);

      setError(null);

      // Form bharne ke baad fields clear do
      setTitle("");
      setReps("");
      setLoad("");

      dispatch({ type: "CREATE_WORKOUT", payload: json });
      // console.log("New workout added: ", json);
    }
  };

  return (
    <form className="createForm" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Exercise Title: </label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""} // className set kiye taki, jo field nahi bhara gya use highlight karenge.
      />

      <label>Number of Reps: </label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <label>Load (in kg): </label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
