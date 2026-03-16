import Footer from "@/composant/Footer";
import Navbar from "@/composant/Navbar";
import { Heart, PersonStanding, HandFist } from "lucide-react";
import { Button } from "@/components/ui/button";
import m_b from "@/assets/M_B.jpg";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function FadeInWhenVisible({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div className="bg-background">
      <Navbar />

      <section
        id="Accueil"
        ref={heroRef}
        className="bg-background px-4 sm:px-15 py-10 md:py-20 overflow-hidden"
      >
        <div className="@container">
          <div className="@[480px]:p-0">
            <motion.div
              className="flex min-h-120 flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4 text-center"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 34, 22, 0.4) 0%, rgba(16, 34, 22, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-98_UNq_dpKBgV6m80l3Mqwf9E5nMpvveIbJKE8ATLcDAKDQGJUwYdztbL639XraqxRcrRUy9foX1fvMkuwffBgmW_0WrL1SuK9RCVJc3ip4gvPSUUmXUpOkDADJ9VagzJ1MIdydvw2nEI47eV9CuoV-_rIQh0Rk6xz2mRTlJ6HtYd1SZ21HNYNDYk5qEgXjytgDbjJPjiY-n0naUcnrQ45XBp29UxYeZ0jFAVP7GBxTvOVy-eBTUnUod3Pu0fmpP82-GPvkvx4o")`,
                scale: heroScale,
                y: heroY,
              }}
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <motion.h1
                  className="text-primary-foreground font-black leading-tight tracking-[-0.033em] text-4xl md:text-5xl @[480px]:text-6xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  Le Sport Santé, pour une vie plus active, plus sereine, plus
                  heureuse
                </motion.h1>
                <motion.h2
                  className="text-primary-foreground text-sm font-normal leading-normal md:text-sm @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                >
                  Rejoignez l'association de Gymnastique Volontaire de
                  Villeneuve Sur Auvers (91).
                </motion.h2>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              >
                <Button
                  size="default"
                  onClick={() => navigate("/contact")}
                  className="text-lg px-5 py-5 font-semibold mt-6 bg-primary-foreground text-black hover:bg-[hsl(0 0% 10%)]"
                >
                  Nous contacter
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="NosValeurs"
        className="bg-background px-4 sm:px-20 py-10 lg:py-15 w-full"
      >
        <div className="flex flex-col items-center">
          <FadeInWhenVisible>
            <h1 className="text-4xl font-extrabold text-foreground">
              Nos valeurs
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <p className="text-muted-foreground">
              Plus qu'un sport, une pratique ouverte à tous, où chacun progresse
              à son propre rythme
            </p>
          </FadeInWhenVisible>

          <div className="flex flex-wrap justify-center lg:gap-32 gap-6 mt-14 w-full">
            <FadeInWhenVisible delay={0} className="min-w-72 max-w-96 flex-1">
              <div className="bg-muted w-full border border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4 sm:h-58">
                <Heart size={40} className="text-muted-foreground" />
                <h2 className="text-2xl font-semibold text-card-foreground">
                  Bien-être
                </h2>
                <p className="text-muted-foreground">
                  Parce que chaque séance vise à améliorer la santé, réduire le
                  stress et favoriser une meilleure qualité de vie.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible
              delay={0.15}
              className="min-w-72 max-w-96 flex-1"
            >
              <div className="bg-muted w-full border border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4 sm:h-58">
                <PersonStanding size={40} className="text-muted-foreground" />
                <h2 className="text-2xl font-semibold text-card-foreground">
                  Convivialité
                </h2>
                <p className="text-muted-foreground">
                  Des cours collectifs où l'on se sent bien, pour créer du lien
                  et s'amuser.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.3} className="min-w-72 max-w-96 flex-1">
              <div className="bg-muted w-full border border-black/10 shadow rounded-lg p-4 mt-6 flex flex-col gap-4 sm:h-58">
                <HandFist size={40} className="text-muted-foreground" />
                <h2 className="text-2xl font-semibold text-card-foreground">
                  Accessibilité
                </h2>
                <p className="text-muted-foreground">
                  Des tarifs abordables et des horaires flexibles pour que
                  chacun puisse nous rejoindre.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* ── ÉQUIPE ── */}
      <section
        id="Equipe"
        className="bg-background px-4 sm:px-20 py-5 lg:py-15 w-full"
      >
        <div className="px-4 w-full">
          <FadeInWhenVisible>
            <div className="bg-card border border-border rounded-lg text-center p-10 shadow-md">
              <h1 className="text-foreground text-4xl font-extrabold">
                Notre Équipe
              </h1>
              <p className="text-muted-foreground">
                Une animatrice passionnés et des membres du bureau engagés pour
                vous accompagner.
              </p>
              <div className="flex flex-col justify-center align-middle items-center md:flex-row mt-10 gap-8">
                <FadeInWhenVisible direction="right" delay={0.2}>
                  <img
                    className="rounded-full h-40 min-w-40 w-40 object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3w5ONe-NErKmCaUM_nPfysd_Ak2uh2oSa_SpcV19yeE5KGhHnIGYd7UmR7uz-_gTJPg9fctnVhiHhbCu2xetZucMPb34WPryzzEvicIp3tE0VBkzm6h6bPEyoCpF-PFhvc7ueIxDatVQV6UBO6FFtPS-sZDOlCH4s5MoUGDK-SeyZRRdlZMOKkxhU-j7Vs9byKYV1SRWht1agltLaaXszh0KSRX_xviawS-z1F-2rB8icsTm2HBKBDwi7mY6PM-EMf48gc07rOw0"
                    alt="Animatrice"
                  />
                </FadeInWhenVisible>
                <FadeInWhenVisible direction="left" delay={0.3}>
                  <div>
                    <h2 className="text-2xl text-foreground font-semibold mt-4 text-left">
                      Christelle
                    </h2>
                    <p className="text-muted-foreground text-left">
                      Professeur Instructeur Sportif depuis 1999 et diplômée BP
                      JEPS APT, Christelle — adhérente à la Fédération Française
                      EPGV — reprend la relève. Son concept : « Lier le corps,
                      l’esprit et le mental ». Elle accompagne chacun à trouver
                      son équilibre grâce à des exercices de renforcement ou de
                      relâchement musculaire, basés sur des critères posturaux.
                      Son programme, en harmonie avec Gym/Santé, mêle Yoga,
                      Fitness et Pilates pour renforcer les abdos, soulager le
                      dos, améliorer la silhouette et développer souplesse et
                      bien-être, avec douceur et précision..
                    </p>
                  </div>
                </FadeInWhenVisible>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* ── BUREAU ── */}
          <div>
            <FadeInWhenVisible>
              <h2 className="text-center text-foreground text-2xl font-semibold mt-16 mb-12">
                Le bureau
              </h2>
            </FadeInWhenVisible>
            <div className="flex flex-wrap justify-evenly gap-10">
              {[
                { src: m_b, name: "Michèle BEMILLI", role: "Présidente" },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzyNbJcTKaW6Ax5TvxTSIRUnbfN8kIdcnACCYRdWsbfpbUvONHrJ3u1yznW71jHECh-JizVzQj7d_Lklhx6aXps1W0ZAQBYdEvNZletjtTsSfT_sedUCCTPS6HKfupOWC4isBEU_x-n1rn-OL3We1L-hU17TtDoUlyCdMDeuvu8iOWAuRNUMo460S387iDWnwan5obWY3iAakZNL7AXsvF2mDfD0UrS33o2ofCdAQ6lJklb4z3OO9aQdtzAZ1HbZNLWNn2G-BVfsI",
                  name: "Marie-Claude SEPTIER",
                  role: "Trésorière",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgru4Xee4u2Vbnm2s6Z7LUbKBUqJLX7Lw6p_4CewYiUiAYJkhI3KDCA0LPL6Gua9RcUjWXxS2uw8Ng6trbmBBEZBF99UKxG5UGDwKjfWydWiKmaiPIzYhHk3XUqbC0eTaJ_FEr2yEkFwXbXFxHPm3UXdtuG0zxqTXAxfRU5h0NfxbR6GktfPGS0c0Lv0ZROAfo1K_tJBMY6I7IoHnCXUdJ1dN0JuamAGS8a8kWXwHHaDsF8hhnEBXLyXDBXPqKycs8QMLlHicsnlU",
                  name: "Joséphine MIART",
                  role: "Secrétaire",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADq0l5ePLjMGry5cEnvk9tJWkSt7Zkpt3mCZNz_mqRJvkTJmHpmTvTgN60fGIy6YqV0IO-RvvXyPNw5PUEDCfHPyRliDTQICn6PMnZ1HO_tkQMN_69SCPWxblgstCjQ0ClD5cq5zI2GU4hAkGpiybGS8YBKHzyG2vN_C_047f_6qY1pZUkOuna3cdZNP7tlzIquMLTh4NsDCzEZQyfv1Xs6dsVSpRL-vlw0lvE2XDtJ4hv7E2mReuQelV0cm5btgfrcuVcO8XBNhY",
                  name: "Cécile BEMILLI",
                  role: "Secrétaire Adjointe",
                },
              ].map((member, i) => (
                <FadeInWhenVisible key={member.name} delay={i * 0.1}>
                  <div className="flex flex-col align-middle items-center justify-center">
                    <img
                      className="rounded-full h-35 w-35 object-cover"
                      src={member.src}
                      alt={member.role}
                    />
                    <h3 className="text-foreground">{member.name}</h3>
                    <p className="text-accent">{member.role}</p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
