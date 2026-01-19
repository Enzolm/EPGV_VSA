import Footer from "@/composant/Footer";
import Navbar from "@/composant/Navbar";
import { Heart, PersonStanding, HandFist } from "lucide-react";
import m_b from "@/assets/M_B.jpg";

function Home() {
  return (
    <>
      <Navbar />
      <section id="Accueil" className="px-4 sm:px-15 py-10 md:py-20">
        <div className="@container">
          <div className="@[480px]:p-0">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4 text-center"
              data-alt="A group of people smiling during an outdoor gym session in a village setting"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 34, 22, 0.4) 0%, rgba(16, 34, 22, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-98_UNq_dpKBgV6m80l3Mqwf9E5nMpvveIbJKE8ATLcDAKDQGJUwYdztbL639XraqxRcrRUy9foX1fvMkuwffBgmW_0WrL1SuK9RCVJc3ip4gvPSUUmXUpOkDADJ9VagzJ1MIdydvw2nEI47eV9CuoV-_rIQh0Rk6xz2mRTlJ6HtYd1SZ21HNYNDYk5qEgXjytgDbjJPjiY-n0naUcnrQ45XBp29UxYeZ0jFAVP7GBxTvOVy-eBTUnUod3Pu0fmpP82-GPvkvx4o")`,
              }}
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <h1 className="text-white  font-black leading-tight tracking-[-0.033em] text-4xl md:text-5xl @[480px]:text-6xl">
                  Le Sport Santé, pour une vie plus active, plus sereine, plus
                  heureuse
                </h1>
                <h2 className="text-gray-200 text-sm font-normal leading-normal md:text-sm @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Rejoignez l'association de Gymnastique Volontaire de
                  Villeneuve Sur Auvers (91).
                </h2>
              </div>
              <button className="mt-6 bg-white text-black rounded-lg p-2 cursor-pointer hover:bg-white/80">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="NosValeurs" className="px-4 sm:px-20 py-10 lg:py-15 w-full">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-extrabold ">Nos valeurs</h1>
          <p className="text-green-900/90">
            Plus qu’un sport, une pratique ouverte à tous, où chacun progresse à
            son propre rythme
          </p>
          <div className="flex flex-wrap md:flex-nowrap justify-center-safe lg:gap-32 gap-6 mt-14 w-full">
            <div className="bg-gray-50 max-w-96 lg:max-w-128 md:max-w-102   border-1 border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4">
              <Heart size={40} color="green" />
              <h2 className="text-2xl font-semibold">Bien-être</h2>
              <p className="text-green-900/90">
                Parce que chaque séance vise à améliorer la santé, réduire le
                stress et favoriser une meilleure qualité de vie.
              </p>
            </div>
            <div className="bg-gray-50 max-w-96 lg:max-w-128 md:max-w-102  border-1 border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4">
              <PersonStanding size={40} color="green" />
              <h2 className="text-2xl font-semibold">Convivialité</h2>
              <p className="text-green-900/90">
                Des cours collectifs où l'on se sent bien, pour créer du lien et
                s'amuser.{" "}
              </p>
            </div>
            <div className="bg-gray-50 max-w-96 lg:max-w-128 md:max-w-102  border-1 border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4">
              <HandFist size={40} color="green" />
              <h2 className="text-2xl font-semibold">Accessibilité</h2>
              <p className="text-green-900/90">
                Des tarifs abordables et des horaires flexibles pour que chacun
                puisse nous rejoindre.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="Equipe" className="px-4 sm:px-20 py-5 lg:py-15 w-full">
        <div className="px-4  w-full ">
          <div className="bg-white rounded-lg text-center p-10 shadow-md">
            <h1 className="text-4xl font-extrabold">Notre Équipe</h1>
            <p>
              Une animatrice passionnés et des membres du bureau engagés pour
              vous accompagner.
            </p>

            <div className="flex flex-col justify-center align-middle items-center md:flex-row mt-10 gap-8">
              <img
                className=" rounded-full h-40 w-40 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3w5ONe-NErKmCaUM_nPfysd_Ak2uh2oSa_SpcV19yeE5KGhHnIGYd7UmR7uz-_gTJPg9fctnVhiHhbCu2xetZucMPb34WPryzzEvicIp3tE0VBkzm6h6bPEyoCpF-PFhvc7ueIxDatVQV6UBO6FFtPS-sZDOlCH4s5MoUGDK-SeyZRRdlZMOKkxhU-j7Vs9byKYV1SRWht1agltLaaXszh0KSRX_xviawS-z1F-2rB8icsTm2HBKBDwi7mY6PM-EMf48gc07rOw0"
                alt="Animatrice"
              />
              <div>
                <h2 className="text-2xl font-semibold mt-4 text-left">
                  Christelle
                </h2>
                <p className="text-green-900/90 text-left">
                  Professeur Instructeur Sportif depuis 1999 et diplômée BP JEPS
                  APT, Christelle — adhérente à la Fédération Française EPGV —
                  reprend la relève. Son concept : « Lier le corps, l’esprit et
                  le mental ». Elle accompagne chacun à trouver son équilibre
                  grâce à des exercices de renforcement ou de relâchement
                  musculaire, basés sur des critères posturaux. Son programme,
                  en harmonie avec Gym/Santé, mêle Yoga, Fitness et Pilates pour
                  renforcer les abdos, soulager le dos, améliorer la silhouette
                  et développer souplesse et bien-être, avec douceur et
                  précision..
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-center text-2xl font-semibold mt-16 mb-12">
              Le bureau
            </h2>
            <div className="flex flex-wrap justify-evenly gap-10">
              <div className="flex flex-col align-middle items-center justify-center">
                <img
                  className="rounded-full h-35 w-35 object-cover"
                  src={m_b}
                  alt="Présidente"
                />
                <h3>Michèle BEMILLI</h3>
                <p className="text-green-600">Présidente</p>
              </div>
              <div className="flex flex-col align-middle items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzyNbJcTKaW6Ax5TvxTSIRUnbfN8kIdcnACCYRdWsbfpbUvONHrJ3u1yznW71jHECh-JizVzQj7d_Lklhx6aXps1W0ZAQBYdEvNZletjtTsSfT_sedUCCTPS6HKfupOWC4isBEU_x-n1rn-OL3We1L-hU17TtDoUlyCdMDeuvu8iOWAuRNUMo460S387iDWnwan5obWY3iAakZNL7AXsvF2mDfD0UrS33o2ofCdAQ6lJklb4z3OO9aQdtzAZ1HbZNLWNn2G-BVfsI"
                  alt="Trésorière"
                  className="rounded-full h-35 w-35 object-cover"
                />
                <h3>Marie-Claude SEPTIER</h3>
                <p className="text-green-600">Trésorière</p>
              </div>
              <div className="flex flex-col align-middle items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgru4Xee4u2Vbnm2s6Z7LUbKBUqJLX7Lw6p_4CewYiUiAYJkhI3KDCA0LPL6Gua9RcUjWXxS2uw8Ng6trbmBBEZBF99UKxG5UGDwKjfWydWiKmaiPIzYhHk3XUqbC0eTaJ_FEr2yEkFwXbXFxHPm3UXdtuG0zxqTXAxfRU5h0NfxbR6GktfPGS0c0Lv0ZROAfo1K_tJBMY6I7IoHnCXUdJ1dN0JuamAGS8a8kWXwHHaDsF8hhnEBXLyXDBXPqKycs8QMLlHicsnlU"
                  alt="Secrétaire"
                  className="rounded-full h-35 w-35 object-cover"
                />
                <h3>Joséphine MIART</h3>
                <p className="text-green-600">Secrétaire</p>
              </div>
              <div className="flex flex-col align-middle items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuADq0l5ePLjMGry5cEnvk9tJWkSt7Zkpt3mCZNz_mqRJvkTJmHpmTvTgN60fGIy6YqV0IO-RvvXyPNw5PUEDCfHPyRliDTQICn6PMnZ1HO_tkQMN_69SCPWxblgstCjQ0ClD5cq5zI2GU4hAkGpiybGS8YBKHzyG2vN_C_047f_6qY1pZUkOuna3cdZNP7tlzIquMLTh4NsDCzEZQyfv1Xs6dsVSpRL-vlw0lvE2XDtJ4hv7E2mReuQelV0cm5btgfrcuVcO8XBNhY"
                  alt="Secrétaire"
                  className="rounded-full h-35 w-35 object-cover"
                />
                <h3>Cécile BEMILLI</h3>
                <p className="text-green-600">Secrétaire Adjointe</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
