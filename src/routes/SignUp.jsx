import { useState } from "react";
import { User } from "../utils/validation";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [repeatPassword, setRepeatPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    try {
      setError(null);

      User.parse({
        email,
        password,
      });
      if (password !== repeatPassword) {
        setError({
          repeatPassword: "repeated password doesn't match with password",
        });
        return;
      }

      const createdUser = {
        email,
        password,
        createdAt: Date.now(),
        id: uuidv4(),
      };
      fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdUser),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate(`/login`);
        });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.format());
      }
    }
  };

  return (
    <div className="main mt-40">
      <h1 className="h1">sign up </h1>
      <input
        className="input"
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error?.email && <div className="error">{error?.email?._errors}</div>}
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error?.password && (
        <div className="error">
          {error.password._errors.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      )}{" "}
      <input
        className="input"
        type="password"
        placeholder="repeat password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {error?.repeatPassword && (
        <div className="error">{error?.repeatPassword}</div>
      )}
      <button onClick={handleSignUp} className="btn">
        sign up
      </button>
      <Link to="/login" className="link">
        login
      </Link>
    </div>
  );
}
