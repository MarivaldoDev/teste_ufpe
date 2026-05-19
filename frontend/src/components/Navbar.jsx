import {
  Link,
  NavLink,
} from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/50 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          to="/"
          className="group"
        >
          <p className="font-display text-2xl tracking-tight text-slate-900">
            Atlas Estudio de Aulas
          </p>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-teal-700 transition group-hover:text-orange-700">
            Planejador de Aulas com IA
          </p>
        </Link>

        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-200"
              }`
            }
          >
            Inicio
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-600 text-white"
                  : "bg-slate-900 text-white hover:bg-slate-700"
              }`
            }
          >
            Nova Aula
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;