import logo_sf from "@/assets/logo_sf.png";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ChevronRight } from "lucide-react";

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
    <nav className=" bg-white p-2 pl-4 pr-4 md:pr-10 md:pl-10 text-white flex justify-between items-center shadow-md border-b border-black/10">
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
          className={` flex border-t border-green-900/10 items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 hover:bg-black/3 text-xl bw${
            location.pathname === "/"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Accueil
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          onClick={() => navigate("/news")}
          className={` flex border-t border-green-900/10 items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 hover:bg-black/3 text-xl bw${
            location.pathname.startsWith("/news")
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Actualités
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          onClick={() => navigate("/sportsante")}
          className={` flex border-t border-green-900/10 items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 hover:bg-black/3 text-xl bw${
            location.pathname === "/sportsante"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Sport Santé
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
        </button>
        <button
          onClick={() => navigate("/contact")}
          className={` flex border-t border-green-900/10 items-center justify-between pr-6 w-full text-left cursor-pointer pl-6 pb-4 pt-4 hover:bg-black/3 text-xl bw${
            location.pathname === "/contact"
              ? "border-b-2 border-green-600/70 pb-0"
              : ""
          }`}
        >
          Nous contacter
          <ChevronRight className=" inline ml-2 mb-1" size={18} />
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
          onClick={() => navigate("/news")}
          className={`cursor-pointer hover:border-b-2 hover:border-green-900 pb-1 ${
            location.pathname.startsWith("/news")
              ? "border-b-2 border-green-900 pb-0"
              : ""
          }`}
        >
          Actualités
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
