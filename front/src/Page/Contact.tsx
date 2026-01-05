import Navbar from "../composant/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "../composant/Footer";
import m_b from "../assets/M_B.jpg";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="justify-center flex flex-col gap-14 w-full">
        <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-10">
          <h1 className="font-bold text-4xl text-center">Nous Contacter</h1>
          <p className="text-center max-w-2xl">
            Une question ? Une suggestion ? N'hésitez pas à nous contacter via
            le formulaire ci-dessous ou par les moyens directs. Notre équipe
            vous répondra dans les meilleurs délais
          </p>
        </div>

        <div className="flex gap-4 w-screen justify-center flex-wrap md:flex-nowrap ">
          <div className="w-50vw">
            <div className="border border-black/10 max-w-lg rounded-lg bg-white p-6 shadow-md m-4 flex flex-col gap-8">
              <h2 className="text-xl font-bold">Envoyez-nous un message</h2>
              <div className="flex flex-col gap-4">
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input placeholder="Votre prénom" />
                  <Input placeholder="Votre nom" />
                </div>
                <Input type="email" placeholder="votre.email@exemple.com" />
                <Input type="text" placeholder="Sujet de votre message" />
                <Textarea
                  placeholder="Écrivez votre message ici..."
                  rows={3}
                  className="h-30"
                />
              </div>
              <Checkbox />
              <Button className="w-full mt-4">Envoyer</Button>
              <p className="text-xs">
                <span className="text-red-600">*</span> Information(s)
                nécessaire(s) afin de traiter au mieux votre demande.
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-col">
            <div className="w-[457px] ">
              <div className="rounded-lg bg-white p-6 shadow-md m-4 flex flex-col gap-6">
                <h1 className="font-semibold text-xl">Nos Coordonnées</h1>
                <div className="flex items-center gap-2">
                  <MapPin color="green" />
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p>6 Rue de Noncerve, 91580 Villeneuve-sur-Auvers</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail color="green" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>contact@gym-volontaire-vsa.fr</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone color="green" />
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[457px] ">
              <div className="rounded-lg shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d169166.60850588762!2d2.3027818857910054!3d48.50968886855793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5c6099b979cf5%3A0xa7610bcc970d6dea!2sSalle%20Polyvalente!5e0!3m2!1sfr!2sfr!4v1764598706852!5m2!1sfr!2sfr"
                  width="457"
                  height="350"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className=" w-full py-10 mt-20 flex flex-col gap-6 justify-center items-center">
          <h1 className="text-4xl font-bold family-Lexend ">
            Les Membres du Bureau
          </h1>
          <p className="max-w-[500px] text-center">
            L'équipe dévouée qui fait vivre notre association. N'hésitez pas à
            nous contacter pour toute question spécifique.
          </p>
          <div className="flex flex-wrap lg:flex-nowrap justify-evenly gap-6 pl-6 pr-6 w-full">
            <div className="flex flex-col align-middle items-center justify-center bg-white p-4 rounded-lg shadow-md w-full">
              <img
                className="rounded-full h-35 w-35 object-cover"
                src={m_b}
                alt="Présidente"
              />
              <h3>Michèle BEMILLI</h3>
              <p className="text-green-600">Présidente</p>
              <div className="flex mt-3">
                <Mail size={25} className="text-black bg-transparent"></Mail>
                <span className="ml-2 cursor-pointer">
                  michele.bemilli@wanadoo.fr
                </span>
              </div>
              <div className="flex mt-3">
                <Phone size={25} className="text-black bg-transparent"></Phone>
                <span className="ml-2 cursor-pointer">06 85 82 90 01</span>
              </div>
            </div>
            <div className="flex flex-col align-middle items-center justify-center bg-white p-4 rounded-lg shadow-md w-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzyNbJcTKaW6Ax5TvxTSIRUnbfN8kIdcnACCYRdWsbfpbUvONHrJ3u1yznW71jHECh-JizVzQj7d_Lklhx6aXps1W0ZAQBYdEvNZletjtTsSfT_sedUCCTPS6HKfupOWC4isBEU_x-n1rn-OL3We1L-hU17TtDoUlyCdMDeuvu8iOWAuRNUMo460S387iDWnwan5obWY3iAakZNL7AXsvF2mDfD0UrS33o2ofCdAQ6lJklb4z3OO9aQdtzAZ1HbZNLWNn2G-BVfsI"
                alt="Trésorière"
                className="rounded-full h-35 w-35 object-cover"
              />
              <h3>Marie-Claude SEPTIER</h3>
              <p className="text-green-600">Trésorière</p>
              <div className="flex mt-3">
                <Mail size={25} className="text-black bg-transparent"></Mail>
                <span className="ml-2 cursor-pointer">
                  jmc.septier@wanadoo.fr
                </span>
              </div>
              <div className="flex mt-3">
                <Phone size={25} className="text-black bg-transparent"></Phone>
                <span className="ml-2 cursor-pointer">06 81 52 53 21</span>
              </div>
            </div>
            <div className="flex flex-col align-middle items-center justify-center bg-white p-4 rounded-lg shadow-md w-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgru4Xee4u2Vbnm2s6Z7LUbKBUqJLX7Lw6p_4CewYiUiAYJkhI3KDCA0LPL6Gua9RcUjWXxS2uw8Ng6trbmBBEZBF99UKxG5UGDwKjfWydWiKmaiPIzYhHk3XUqbC0eTaJ_FEr2yEkFwXbXFxHPm3UXdtuG0zxqTXAxfRU5h0NfxbR6GktfPGS0c0Lv0ZROAfo1K_tJBMY6I7IoHnCXUdJ1dN0JuamAGS8a8kWXwHHaDsF8hhnEBXLyXDBXPqKycs8QMLlHicsnlU"
                alt="Secrétaire"
                className="rounded-full h-35 w-35 object-cover"
              />
              <h3>Joséphine MIART</h3>
              <p className="text-green-600">Secrétaire</p>
              <div className="flex mt-3">
                <Mail size={25} className="text-black bg-transparent"></Mail>
                <span className="ml-2 cursor-pointer">miartj@hotmail.com</span>
              </div>
              <div className="flex mt-3">
                <Phone size={25} className="text-black bg-transparent"></Phone>
                <span className="ml-2 cursor-pointer">06 79 95 30 48</span>
              </div>
            </div>
            <div className="flex flex-col align-middle items-center justify-center bg-white p-4 rounded-lg shadow-md w-full">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuADq0l5ePLjMGry5cEnvk9tJWkSt7Zkpt3mCZNz_mqRJvkTJmHpmTvTgN60fGIy6YqV0IO-RvvXyPNw5PUEDCfHPyRliDTQICn6PMnZ1HO_tkQMN_69SCPWxblgstCjQ0ClD5cq5zI2GU4hAkGpiybGS8YBKHzyG2vN_C_047f_6qY1pZUkOuna3cdZNP7tlzIquMLTh4NsDCzEZQyfv1Xs6dsVSpRL-vlw0lvE2XDtJ4hv7E2mReuQelV0cm5btgfrcuVcO8XBNhY"
                alt="Secrétaire"
                className="rounded-full h-35 w-35 object-cover"
              />
              <h3>Cécile BEMILLI</h3>
              <p className="text-green-600">Secrétaire Adjointe</p>
              <div className="flex mt-3">
                <Mail size={25} className="text-black bg-transparent"></Mail>
                <span className="ml-2 cursor-pointer">ctb.idf@gmail.com</span>
              </div>
              <div className="flex mt-3">
                <Phone size={25} className="text-black bg-transparent"></Phone>
                <span className="ml-2 cursor-pointer">06 16 03 67 47</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
