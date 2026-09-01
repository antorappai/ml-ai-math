import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/dashboard", "Dashboard"],
  ["/formulas", "Formula Library"],
  ["/practice", "Practice"],
  ["/projects", "Projects"]
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/dashboard" className="brand"><span className="brand-mark">M</span><span>ML Mastery <em>Studio</em></span></NavLink>
        <button type="button" className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>Menu</button>
        <nav className={open ? "nav-open" : ""} aria-label="Main navigation">
          {links.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
      </header>
      <main><Outlet /></main>
      <footer><span>ML Mastery Studio</span><span>Intuition → notation → code → evidence</span></footer>
    </div>
  );
}

