import logo_sf from "@/assets/logo_sf.webp";
import { useLocation, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, Moon, Sun, ExternalLink } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isMenuOpen) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        toggleRef.current &&
        !menuRef.current.contains(target) &&
        !toggleRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav
      role="navigation"
      className=" bg-background p-2 pl-4 pr-4 md:pr-10 md:pl-10 text-primary flex justify-between items-center shadow-md border-b border-border"
    >
      <div>
        <img
          aria-label="Logo"
          className="h-20 w-20 hover:cursor-pointer"
          src={logo_sf}
          alt="Logo de l'association"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex  gap-3 md:hidden align-middle" ref={toggleRef}>
        <button
          aria-label="Changer le thème"
          aria-pressed={isDark}
          onClick={toggle}
          className="p-2 rounded-full transition-colors hover:bg-muted hover:cursor-pointer"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {!isMenuOpen ? (
          <button
            aria-label="Ouvrir le menu de navigation"
            className="cursor-pointer bg-transparent"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={40} className="text-primary bg-transparent" />
          </button>
        ) : (
          <button
            aria-label="Fermer le menu de navigation"
            className="cursor-pointer bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={40} className="text-primary bg-transparent" />
          </button>
        )}
      </div>
      <div
        ref={menuRef}
        className={`text-primary flex-wrap flex absolute left-0 top-24  z-40 w-full bg-card rounded-b-lg shadow-lg transform origin-top-right transition-all duration-220 ease-out md:hidden ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className={`flex border-t border-border items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 text-xl ${
            location.pathname === "/"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Accueil
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          onClick={() => navigate("/news/")}
          className={`flex border-t border-border items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 text-xl ${
            location.pathname.startsWith("/news")
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Actualités
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          className={`flex border-t border-border items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 text-xl ${
            location.pathname === "/sportsante"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <a
            className="flex flex-wrap items-center align-middle gap-1"
            href="https://ffepgv.fr/dirigeant/label-qualite-sport-sante"
            target="_blank"
          >
            Sport Santé
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          onClick={() => navigate("/contact")}
          className={`flex border-t border-border items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 text-xl ${
            location.pathname === "/contact"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          Nous contacter
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
      </div>
      <div className=" flex-nowrap gap-8 text-muted-foreground hidden md:flex">
        <button
          id="hover-animation"
          onClick={() => navigate("/")}
          className={`cursor-pointer hover:text-foreground font-semibold ${
            location.pathname === "/" ? "active text-foreground" : ""
          }`}
        >
          Accueil
        </button>

        <button
          id="hover-animation"
          onClick={() => navigate("/news")}
          className={`cursor-pointer hover:text-foreground font-semibold  ${
            location.pathname.startsWith("/news")
              ? "active text-foreground"
              : ""
          }`}
        >
          Actualités
        </button>
        <button
          id="hover-animation"
          className={`cursor-pointer hover:text-foreground font-semibold  ${
            location.pathname === "/sportsante" ? "active text-foreground" : ""
          }`}
        >
          <a
            className="flex flex-wrap items-center align-middle gap-1"
            href="https://ffepgv.fr/dirigeant/label-qualite-sport-sante"
            target="_blank"
          >
            Sport Santé
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </button>
        <div className="flex gap-2">
          <button
            aria-label="Changer le thème"
            aria-pressed={isDark}
            onClick={toggle}
            className="text-foreground p-2 rounded-full transition-colors hover:bg-muted hover:cursor-pointer"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => navigate("/contact")}
            className={` border-2 border-muted-foreground hover:text-foreground font-semibold text-foreground rounded-lg p-2 cursor-pointer hover:bg-green-900/5 ${
              location.pathname === "/contact"
                ? "rounded-lg p-2 cursor-pointer bg-green-900/5"
                : ""
            }`}
          >
            Nous contacter
          </button>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
