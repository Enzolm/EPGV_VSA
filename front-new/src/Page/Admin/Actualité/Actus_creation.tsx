import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import type { OutputData } from "@editorjs/editorjs/types/data-formats/output-data";

function Actus_creation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isCreationRoute = location.pathname === "/gestion/actus/creation";

  useEffect(() => {
    if (isCreationRoute) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isCreationRoute]);

  if (!shouldRender) return null;

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-300 ease-out overflow-hidden ${
        isVisible ? "w-1/2" : "w-0"
      }`}
    >
      <h2 className="mb-4 text-2xl font-bold text-green-800">
        Créer un nouvel article
      </h2>
      <div className="flex flex-col gap-4">
        <Input type="text" placeholder="Titre de l'article" />
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionner le type d'article" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="@evenement">Evènement</SelectItem>
            <SelectItem value="@actualite">Actualité</SelectItem>
            <SelectItem value="@annonce">Annonce</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Input type="file" />
      <Textarea placeholder="Contenu de l'article" rows={10} />
      <div className="items-end flex gap-2 mt-auto flex-nowrap">
        <Button>Publier</Button>
        <Button>Enregistrer le brouillon</Button>
        <Button onClick={() => navigate("/gestion/actus")}>Retour</Button>
      </div>
    </div>
  );
}

export default Actus_creation;
