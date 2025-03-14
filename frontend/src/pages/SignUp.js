import { useState } from "react";
import { useSignup } from "../hooks/useSignUp";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading, error } = useSignup();

  const handleClick = async (e) => {
    console.log("handleClick (from SignUp.js ):I am get called");
    e.preventDefault();
    // console.log(email + " " + password);
    await signup(email, password);
  };

  return (
    <form onSubmit={handleClick} className="signup">
      {/* <div className="signup"> */}
      <h2>Sign Up</h2>
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      {/* </div> */}
    </form>
  );
};

export default SignUp;
