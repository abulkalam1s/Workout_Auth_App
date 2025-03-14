import { createContext, useReducer } from "react";
import { useEffect } from "react";

// Reducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Create the context
export const AuthContext = createContext();

// Creating auth Context Component
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  console.log("AuthContext state: ", state);
  // Every time when react loads it searches if the user is logged in. That is, if local storage has the value 'user' if yes, it uses it for logging user. (Note in case of logout user gets deleted from local storage)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
