import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthHook } from "./hooks/useAuthHook";

// pages & components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  const { user } = useAuthHook();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />

        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
