import { useAuthHook } from "./useAuthHook";
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
  const { dispatch } = useAuthHook();
  const { dispatch: dispatchWorkouts } = useWorkoutContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user"); // 'user' Item was created on local storage, but now we will delete it.

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchWorkouts({ type: "dispatchWorkouts", payload: null });
  };

  return { logout };
};
