import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

type FormData = {
  nom: string;
  prenom: string;
  role: string;
  isAdmin: boolean;
  email: string;
  emailConfirm: string;
};

function UtilisateurGestion() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const roles_list = [
    { label: "Président", id: "@president" },
    { label: "Présidente", id: "@presidente" },
    { label: "Trésorier", id: "@tresorier" },
    { label: "Trésorière", id: "@tresoriere" },
    { label: "Secrétaire", id: "@secretaire" },
  ];

  return (
    <>
      <div className="flex justify-between">
        <h1>Gestion Utilisateur</h1>
        lisateur
      </div>
    </>
  );
}
export default UtilisateurGestion;
