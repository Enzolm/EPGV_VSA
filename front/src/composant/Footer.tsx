import logo_footer from "@/assets/logo_sf.png";
import { Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-card-light border-t border-black/10 border-card-border-light mt-12">
      <div className="max-w-8xl mx-auto py-12 px-4 sm:px-6 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="size-10 text-primary">
                <img src={logo_footer} alt="Gym Volontaire Logo" />
              </div>
              <h2 className="text-lg font-bold">Gym Volontaire</h2>
            </div>
            <p className="text-sm opacity-80">
              Le sport santé pour tous, près de chez vous. Rejoignez une
              communauté active et bienveillante.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2 text-green-700/70">
              <li>
                <a
                  className="cursor-pointer text-sm text-green-700/70 hover:text-green-700/50 hover:transition-colors"
                  onClick={() => navigate("/")}
                >
                  Acceuil
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer text-sm text-green-700/70 hover:text-green-700/50 hover:transition-colors"
                  onClick={() => navigate("/actu")}
                >
                  Actualités
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer text-sm transition-colors hover:text-green-700/50 hover:transition-colors"
                  onClick={() => navigate("/sportsante")}
                >
                  Sport Santé
                </a>
              </li>
              <li>
                <a
                  className="text-sm transition-colors hover:text-green-700/50 hover:transition-colors"
                  href="#"
                >
                  Nous contacter
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer text-sm transition-colors hover:text-green-700/50 hover:transition-colors"
                  onClick={() => navigate("/gestion")}
                >
                  Gestion
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2 ">
                <MapPin
                  size={30}
                  className="text-green-700/70 bg-transparent"
                />
                6 Rue de Noncerve, 91580 Villeneuve-sur-Auvers
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  (window.location.href =
                    "mailto:contact@gym-volontaire-vsa.fr")
                }
              >
                <Mail size={25} className="text-green-700/70 bg-transparent" />
                contact@gym-volontaire-vsa.fr
              </li>
              <li
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => (window.location.href = "tel:0601020304")}
              >
                <Phone size={25} className="text-green-700/70 bg-transparent" />
                06 79 95 30 48
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider ">
              Suivez-nous
            </h3>
            <div className="flex mt-4 space-x-4">
              <a
                className="hover:text-primary transition-colors"
                target="_blank"
                href="https://www.facebook.com/people/Gymnastique-volontaire-VSA/100069466486782/"
              >
                <svg aria-hidden="true" className="h-6 w-6" fill="currentColor">
                  <path
                    clip-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </a>
              {/* <a className="hover:text-primary transition-colors" href="#">
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  //   viewbox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a> */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-card-border-light dark:border-card-border-dark pt-8 text-center text-sm opacity-40">
          <p>© 2025 Gym Volontaire. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
