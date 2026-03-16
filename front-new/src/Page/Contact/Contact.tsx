import Navbar from "@/composant/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/composant/Footer";
import m_b from "@/assets/M_B.jpg";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

type FormData = {
  prenom: string;
  nom: string;
  email: string;
  sujet: string;
  message: string;
  validation: boolean;
};

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

const Contact = () => {
  const { register, handleSubmit, control, watch } = useForm<FormData>();
  const [agreeTerms, setAgreeTerms] = useState<string | null>(null);

  useEffect(() => {
    setAgreeTerms(null);
  }, [watch("validation")]);

  const onSubmit = (data: FormData) => {
    console.log("Données du formulaire:", data);
    if (!data.validation) {
      setAgreeTerms(
        "Vous devez accepter les conditions pour soumettre le formulaire",
      );
      return;
    }
  };

  return (
    <div className="bg-background">
      <Navbar />
      <div className="justify-center flex flex-col gap-14 w-full">
        <FadeInWhenVisible>
          <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-10">
            <h1 className="font-bold text-4xl text-center text-foreground">
              Nous Contacter
            </h1>
            <p className="text-center max-w-2xl ml-4 mr-4 text-muted-foreground">
              Une question ? Une suggestion ? N'hésitez pas à nous contacter via
              le formulaire ci-dessous ou par les moyens directs. Notre équipe
              vous répondra dans les meilleurs délais
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <FadeInWhenVisible direction="right" delay={0.1}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="border border-black/10 max-w-lg rounded-lg bg-card p-6 shadow-md m-4 flex flex-col gap-8"
            >
              <h2 className="text-xl font-bold text-card-foreground">
                Envoyez-nous un message
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input placeholder="Votre prénom" {...register("prenom")} />
                  <Input placeholder="Votre nom" {...register("nom")} />
                </div>
                <Input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  {...register("email")}
                />
                <Input
                  type="text"
                  placeholder="Sujet de votre message"
                  {...register("sujet")}
                />
                <Textarea
                  placeholder="Écrivez votre message ici..."
                  rows={3}
                  className="h-30"
                  {...register("message")}
                />
              </div>
              <div className="flex gap-3">
                <Controller
                  name="validation"
                  control={control}
                  rules={{ required: false }}
                  defaultValue={false}
                  render={({ field }) => (
                    <Checkbox
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  )}
                />
                <p className="max-w-md text-foreground">
                  En soumettant ce formulaire, j'accepte que les informations
                  saisies dans ce formulaire soient exploitées pour permettre de
                  me recontacter ou dans le cadre de la relation commerciale qui
                  découlerait de cette demande.
                  <span className="text-red-500">*</span>
                </p>
              </div>
              {agreeTerms !== null && (
                <p className="text-red-500">{agreeTerms}</p>
              )}
              <Button className="w-full mt-4">Envoyer</Button>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500">*</span> Information(s)
                nécessaire(s) afin de traiter au mieux votre demande.
              </p>
            </form>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="flex gap-4 flex-col justify-center items-center">
              <div className="w-50vw">
                <div className="border border-black/10 max-w-lg rounded-lg bg-card p-6 shadow-md m-4 flex flex-col gap-8">
                  <h1 className="font-semibold text-xl">Nos Coordonnées</h1>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Adresse</p>
                      <p className="text-foreground">
                        6 Rue de Noncerve, 91580 Villeneuve-sur-Auvers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <p className="text-foreground">
                        contact@gym-volontaire-vsa.fr
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">Téléphone</p>
                      <p className="text-foreground">+33 1 23 45 67 89</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-md px-4 md:px-0">
                <div className="rounded-lg shadow-md overflow-hidden">
                  <div className="relative" style={{ paddingTop: "78.125%" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d169166.60850588762!2d2.3027818857910054!3d48.50968886855793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5c6099b979cf5%3A0xa7610bcc970d6dea!2sSalle%20Polyvalente!5e0!3m2!1sfr!2sfr!4v1764598706852!5m2!1sfr!2sfr"
                      className="absolute top-0 left-0 w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      <section>
        <div className="w-full py-10 mt-20 flex flex-col gap-6 justify-center items-center">
          <FadeInWhenVisible>
            <h1 className="text-4xl font-bold text-center text-foreground">
              Membres du Bureau
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <p className="w-full p-4 text-center text-muted-foreground">
              L'équipe dévouée qui fait vivre notre association. N'hésitez pas à
              nous contacter pour toute question spécifique.
            </p>
          </FadeInWhenVisible>

          <div className="flex flex-wrap lg:flex-nowrap justify-evenly gap-6 pl-6 pr-6 w-full">
            {[
              {
                src: m_b,
                name: "Michèle BEMILLI",
                role: "Présidente",
                email: "michele.bemilli@wanadoo.fr",
                phone: "06 85 82 90 01",
              },
              {
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzyNbJcTKaW6Ax5TvxTSIRUnbfN8kIdcnACCYRdWsbfpbUvONHrJ3u1yznW71jHECh-JizVzQj7d_Lklhx6aXps1W0ZAQBYdEvNZletjtTsSfT_sedUCCTPS6HKfupOWC4isBEU_x-n1rn-OL3We1L-hU17TtDoUlyCdMDeuvu8iOWAuRNUMo460S387iDWnwan5obWY3iAakZNL7AXsvF2mDfD0UrS33o2ofCdAQ6lJklb4z3OO9aQdtzAZ1HbZNLWNn2G-BVfsI",
                name: "Marie-Claude SEPTIER",
                role: "Trésorière",
                email: "jmc.septier@wanadoo.fr",
                phone: "06 81 52 53 21",
              },
              {
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgru4Xee4u2Vbnm2s6Z7LUbKBUqJLX7Lw6p_4CewYiUiAYJkhI3KDCA0LPL6Gua9RcUjWXxS2uw8Ng6trbmBBEZBF99UKxG5UGDwKjfWydWiKmaiPIzYhHk3XUqbC0eTaJ_FEr2yEkFwXbXFxHPm3UXdtuG0zxqTXAxfRU5h0NfxbR6GktfPGS0c0Lv0ZROAfo1K_tJBMY6I7IoHnCXUdJ1dN0JuamAGS8a8kWXwHHaDsF8hhnEBXLyXDBXPqKycs8QMLlHicsnlU",
                name: "Joséphine MIART",
                role: "Secrétaire",
                email: "miartj@hotmail.com",
                phone: "06 79 95 30 48",
              },
              {
                src: "https://lh3.googleusercontent.com/aida-public/AB6AXuADq0l5ePLjMGry5cEnvk9tJWkSt7Zkpt3mCZNz_mqRJvkTJmHpmTvTgN60fGIy6YqV0IO-RvvXyPNw5PUEDCfHPyRliDTQICn6PMnZ1HO_tkQMN_69SCPWxblgstCjQ0ClD5cq5zI2GU4hAkGpiybGS8YBKHzyG2vN_C_047f_6qY1pZUkOuna3cdZNP7tlzIquMLTh4NsDCzEZQyfv1Xs6dsVSpRL-vlw0lvE2XDtJ4hv7E2mReuQelV0cm5btgfrcuVcO8XBNhY",
                name: "Cécile BEMILLI",
                role: "Secrétaire Adjointe",
                email: "ctb.idf@gmail.com",
                phone: "06 16 03 67 47",
              },
            ].map((member, i) => (
              <FadeInWhenVisible key={member.name} delay={i * 0.1}>
                <div className="flex flex-col align-middle items-center justify-center bg-card p-4 rounded-lg shadow-md w-full min-w-73.5">
                  <img
                    className="rounded-full h-35 w-35 object-cover"
                    src={member.src}
                    alt={member.role}
                  />
                  <h3 className="text-foreground">{member.name}</h3>
                  <p className="text-accent">{member.role}</p>
                  <div className="flex mt-3">
                    <Mail size={25} className="text-muted-foreground" />
                    <span className="ml-2 cursor-pointer text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                  <div className="flex mt-3">
                    <Phone size={25} className="text-muted-foreground" />
                    <span className="ml-2 cursor-pointer text-muted-foreground">
                      {member.phone}
                    </span>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
