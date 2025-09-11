import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

export default function Header() {
  //   const location = useLocation();

  return (
    <header className={css.header}>
      {/* Logo */}
      <NavLink to="/">
        <svg className={css.logoIcon}>
          <use href="/icons.svg#icon-logo" />
        </svg>
      </NavLink>
      <nav className={css.navGroup}>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${css.link} ${css.recipes} ${isActive ? css.active : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          end
          className={({ isActive }) =>
            `${css.link} ${css.recipes} ${isActive ? css.active : ""}`
          }
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}
