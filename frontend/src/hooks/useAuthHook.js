import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthHook = () => {
  const userContext = useContext(AuthContext);

  // When this function is called from outside of the component tree then this function will return null, That is, we want to use this function inside the <App/> component only because outside the <App/> <AuthContextProvider/> contexts provider is wrapped
  if (!userContext) {
    throw Error("useAuthContext() must be used inside the AuthContextProvider");
  }
  return userContext;
};
