import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../asyncActions/userActions";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Пожалуйста, введите и email, и пароль");
      return;
    }

    const response = await fetch(
      `http://localhost:5000/users?email=${email}&password=${password}`
    );
    const users = await response.json();
    const currentUser = users[0];

    if (currentUser) {
      dispatch(loginUser(currentUser));
      navigate("/about");
    } else {
      setError("User not found");
    }
  };

  return (
    <main className="main mt-40">
      <h1 className="h1">Login</h1>
      <input
        className="input"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="btn">
        Login
      </button>
      {error && <div className="error">{error}</div>}
      <Link to="/signup" className="link">
        signup
      </Link>
    </main>
  );
}
