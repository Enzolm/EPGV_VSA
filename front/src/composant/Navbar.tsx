import logo_sf from "../assets/logo_sf.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
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
    <nav className="w-screen bg-white p-2 text-white flex justify-between items-center shadow-md border-b border-black/10">
      <div>
        <img className="h-20 w-20" src={logo_sf} alt="Logo de l'association" />
      </div>
      <div className="md:hidden" ref={toggleRef}>
        {!isMenuOpen ? (
          <button
            className="cursor-pointer bg-transparent"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={40} className="text-green-600/70 bg-transparent" />
          </button>
        ) : (
          <button
            className="cursor-pointer bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={40} className="text-green-700/70 bg-transparent" />
          </button>
        )}
      </div>
      <div
        ref={menuRef}
        className={`text-black flex-wrap flex absolute left-0 top-24  z-40 w-full bg-white rounded-b-lg shadow-lg transform origin-top-right transition-all duration-220 ease-out md:hidden ${
          isMenuOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={() => navigate("/")}
          className={` w-full text-left cursor-pointer pl-4 pb-3 pt-3 hover:bg-black/3 text-xl bw${
            location.pathname === "/"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Accueil
        </button>
        <button
          onClick={() => navigate("/actualites")}
          className={` w-full text-left cursor-pointer pl-4 pb-3 pt-3 hover:bg-black/3 text-xl bw${
            location.pathname === "/actualites"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Actualités
        </button>
        <button
          onClick={() => navigate("/sportsante")}
          className={` w-full text-left cursor-pointer pl-4 pb-3 pt-3 hover:bg-black/3 text-xl bw${
            location.pathname === "/sportsante"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Sport Santé
        </button>
        <button
          onClick={() => navigate("/contact")}
          className={` w-full text-left cursor-pointer pl-4 pb-3 pt-3 border-t border-green-900/20 hover:bg-black/3 text-xl bw${
            location.pathname === "/contact"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Nous contacter
        </button>
      </div>
      <div className=" flex-nowrap gap-8 text-black hidden md:flex">
        <button
          onClick={() => navigate("/")}
          className={`cursor-pointer hover:border-b-2 hover:border-green-900 pb-1 ${
            location.pathname === "/" ? "border-b-2 border-green-900 pb-0" : ""
          }`}
        >
          Accueil
        </button>

        <button
          onClick={() => navigate("/actualites")}
          className={`cursor-pointer hover:border-b-2 hover:border-green-900 pb-1 ${
            location.pathname === "/actualites"
              ? "border-b-2 border-green-900 pb-0"
              : ""
          }`}
        >
          Actualités
        </button>
        <button
          onClick={() => navigate("/lebureau")}
          className={`cursor-pointer hover:border-b-2 hover:border-green-900 pb-1 ${
            location.pathname === "/lebureau"
              ? "border-b-2 border-green-900 pb-0"
              : ""
          }`}
        >
          Le Bureau
        </button>
        <button
          onClick={() => navigate("/sportsante")}
          className={`cursor-pointer hover:border-b-2 hover:border-green-900 pb-1 ${
            location.pathname === "/sportsante"
              ? "border-b-2 border-green-900 pb-0"
              : ""
          }`}
        >
          Sport Santé
        </button>
        <button
          onClick={() => navigate("/contact")}
          className={` border-2 border-green-900 text-green-900 rounded-lg p-2 cursor-pointer hover:bg-green-900/5 ${
            location.pathname === "/contact"
              ? "rounded-lg p-2 cursor-pointer bg-green-900/5"
              : ""
          }`}
        >
          Nous contacter
        </button>
      </div>
    </nav>
  );
}
export default Navbar;
