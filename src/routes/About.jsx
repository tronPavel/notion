import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function About() {
  const { user } = useSelector((state) => state.user);
  const date = new Date(user.createdAt);

  return (
    <>
      <h1 className="h1">About us</h1>
      <ul className="space-y-5">
        <li>
          Email: <span className="text-gray-400">{user.email}</span>
        </li>
        <li>
          Date sign up:{" "}
          <span className="text-gray-400">{date.toLocaleString()}</span>
        </li>
      </ul>
      <Link to={`/notes`} className="btn">
        Go to notes
      </Link>
    </>
  );
}
