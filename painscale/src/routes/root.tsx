import { Outlet } from "react-router-dom";
import "./root.css";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { AlignJustify } from "lucide-react";
export default function Root() {
  // check if desktop
  const [isDesktop, setDesktop] = useState(window.innerWidth > 768)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Toaster />
      <nav>
        <div className="navbar">
          <div className="navbar-brand">
            Pain Scale App
          </div>
          {
            isDesktop ? (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a href="/">Pain Scale</a>
                </li>
                <li className="nav-item">
                  <a href="/submissions">Submissions</a>
                </li>
              </ul>
            ) : (
              <div className="dropdown">
                <button className="dropbtn" onClick={() => setOpen(!open)}>
                    <AlignJustify stroke="white" fill="white" />
                  </button>
                  {
                    open && (
                      <div className="dropdown-content">
                        <a href="/">Pain Scale</a>
                        <a href="/submissions">Submissions</a>
                      </div>
                    )
                  }
              </div>
            )
          }
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
