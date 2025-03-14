import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useLogin();

  const handleClick = async (e) => {
    e.preventDefault();

    await login(email, password);
    // console.log(email + " " + password);
  };

  return (
    <form onSubmit={handleClick} className="login">
      {/* ****** ALERT ALERT *********** NOTE FORM ME 'onClick' nahi 'onSubmit' lagao */}

      {/* <div className="login"> */}
      <h2>Login In</h2>
      <label>Email</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button disabled={isLoading}>Login</button>
      {/* </div> */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
