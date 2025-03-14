import { useState } from "react";
import { useAuthHook } from "./useAuthHook";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthHook();

  const signup = async (email, password) => {
    // **1:  jaise sign-up btn click karenge....
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    // if response is ok, then we will cahnge the global user state using dispatch
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      // update loading state
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};

// **1: jaise sign-up btn click karenge, uske baad, data fetch hoga and check hoga credentials, use samay take setIsLoading ko 'true' rakhenge taki, btn ko disable kar sake jab tak response.ok nahi aa jata
