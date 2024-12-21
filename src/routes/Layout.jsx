import { NavLink, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../asyncActions/userActions";

export default function Layout() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div className="max-w-[80%] mx-auto  text-xl">
      <header className="flex items-center justify-between font-medium mb-10 h-20 border-b-2 ">
        <span>Hello, {user.email}</span>
        <nav className="w-[40%]">
          <ul className="flex  justify-between ">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-link" : "link"
                }
                to="/notes"
              >
                Notes
              </NavLink>
            </li>
            <li>
              <NavLink
                className="link"
                to="/login"
                onClick={dispatch(logoutUser)}
              >
                Log out
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
