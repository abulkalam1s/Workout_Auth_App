import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthHook } from "../hooks/useAuthHook";

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthHook();

  const handleClick = () => {
    logout();
  };
  return (
    <header>
      <div className="navContainer">
        <Link to="/">
          <h1 className="logo">Workouts</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
