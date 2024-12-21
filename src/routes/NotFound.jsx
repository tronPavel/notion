import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NotFound() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className="main">
      <h1 className="h1">Page not found</h1>
      {user?.id ? (
        <Link className="btn" to="/About">
          Go home
        </Link>
      ) : (
        <Link className="btn" to="/LogIn">
          login
        </Link>
      )}
    </main>
  );
}
