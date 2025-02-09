import { Link } from "react-router-dom";
function NavBar() {
  return (
    <header>
      <div className="navContainer">
        <Link to="/">
          <h1 className="logo">Workouts</h1>
        </Link>
      </div>
    </header>
  );
}

export default NavBar;
