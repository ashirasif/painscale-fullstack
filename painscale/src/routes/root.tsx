import { Outlet } from "react-router-dom";
import "./root.css";
export default function Root() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          Pain Scale App
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/">Pain Scale</a>
          </li>
          <li className="nav-item">
            <a href="/submissions">Submissions</a>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
