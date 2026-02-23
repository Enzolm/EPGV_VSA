import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

type FormData = {
  nom: string;
  prenom: string;
  role: string;
  isAdmin: boolean;
  email: string;
  emailConfirm: string;
};

function UtilisateurGestion() {
  const navigate = useNavigate();

  const roles_list = [
    { label: "Président", id: "@president" },
    { label: "Présidente", id: "@presidente" },
    { label: "Trésorier", id: "@tresorier" },
    { label: "Trésorière", id: "@tresoriere" },
    { label: "Secrétaire", id: "@secretaire" },
  ];

  return (
    <>
      <section id="info" className="flex">
        <div className="flex align-center justify-between w-2/2 items-center">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-green-800">
              Utilisateurs
            </h2>
            <p className="text-gray-700">
              Ajoutez, modifiez ou supprimez des Utilisateurs, chaque
              utilisateur peut créer un article seul l'utilisateur
              "Président(e)" peut suprimer des articles ainsi que des
              utilisateurs.
            </p>
          </div>
          <Button
            className="align-center "
            onClick={() => navigate("/gestion/utilisateur/creation")}
          >
            Ajouter un utilisateur
          </Button>
        </div>
      </section>
    </>
  );
}
export default UtilisateurGestion;
