import Footer from "@/composant/Footer";
import Navbar from "@/composant/Navbar";

const sections = [
  {
    title: "Éditeur du site",
    content: `L'édition et la direction de la publication du site est assurée par Madame Joséphine MIART, domiciliée _______________, dont le numéro de téléphone est 010203040506, et l'adresse e-mail contact@gmail.com.`,
  },
  {
    title: "Hébergeur",
    content: `L'hébergeur du site est la société Infomaniak, dont le siège social est situé Rue Eugène Marziano 25, 1227 Les Acacias (GE).`,
  },
  {
    title: "Accès au site",
    content: `Le site est normalement accessible à tout moment. Toutefois, l'éditeur pourra, à tout moment, suspendre, limiter ou interrompre le site afin de procéder à des mises à jour ou des modifications de son contenu. L'éditeur ne pourra en aucun cas être tenu responsable des conséquences éventuelles de cette indisponibilité sur les activités de l'utilisateur.`,
  },
  {
    title: "Cookie de session",
    content: `Un seul cookie est utilisé sur ce site, strictement nécessaire au fonctionnement de l'espace membres. Il permet de maintenir la connexion des membres de l'association et expire à la fermeture de la session ou après 30 jours. Aucun cookie publicitaire ou de tracking n'est utilisé. Ce cookie étant techniquement indispensable, il ne nécessite pas votre consentement (CNIL).`,
  },
  {
    title: "Collecte des données personnelles",
    content: `Le site assure à l'utilisateur une collecte et un traitement des données personnelles dans le respect de la vie privée, conformément à la loi n°78-17 du 6 janvier 1978 et au RGPD (règlement UE 2016/679). Les données collectées (nom, prénom, adresse e-mail) sont utilisées uniquement pour la gestion des membres et ne sont jamais transmises à des tiers. Conformément à la réglementation, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : contact@gmail.com.`,
  },
  {
    title: "Propriété intellectuelle",
    content: `Toute utilisation, reproduction, diffusion ou modification de tout ou partie du site, sans autorisation expresse de l'éditeur, est interdite et pourra entraîner des actions judiciaires conformément à la réglementation en vigueur.`,
  },
  {
    title: "Liens externes",
    content: `Le site peut contenir des liens vers des sites tiers. L'association ne peut être tenue responsable du contenu de ces sites externes.`,
  },
];

const MentionLegal = () => {
  return (
    <>
      <Navbar />
      <div className="bg-background w-screen flex flex-col min-h-dvh items-center justify-center py-24 px-4">
        <div className="bg-card rounded-lg border border-border flex flex-col items-start p-8 shadow-md w-full max-w-2xl gap-6">
          {/* Header */}
          <div className="w-full flex flex-col items-center gap-2 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">
              Mentions légales
            </h1>
            <p className="text-muted-foreground text-sm text-center">
              Conformément à la loi n°2004-575 du 21 juin 2004 pour la confiance
              en l'économie numérique, les présentes mentions légales
              s'appliquent à l'ensemble des utilisateurs du site.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-border" />

          {/* Sections */}
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-2 w-full">
              <h2 className="text-foreground font-semibold text-base">
                {section.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {section.content}
              </p>
              {index < sections.length - 1 && (
                <div className="w-full border-t border-border mt-2" />
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MentionLegal;
