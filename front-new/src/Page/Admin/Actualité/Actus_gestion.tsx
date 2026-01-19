import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Actus_creation from "@/Page/Admin/Actualité/Actus_creation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IconPencilPlus } from "@tabler/icons-react";

function ActusGesiton() {
  const navigate = useNavigate();
  const isCreationRoute = location.pathname === "/gestion/actus/creation";

  const items = [
    { label: "Evènement", id: "@evenement" },
    { label: "Actualité", id: "@actualite" },
    { label: "Annonce", id: "@annonce" },
  ];

  return (
    <div className="flex flex-nowrap gap-8 h-full">
      <div
        className={`flex flex-col gap-4 transition-all duration-300 ease-out overflow-hidden ${
          isCreationRoute ? "w-1/2" : "w-2/2"
        }`}
      >
        <section id="info" className="flex">
          <div className="flex align-center justify-between w-2/2 items-center">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-green-800">
                Actualités
              </h2>
              <p className="text-gray-700">
                Ajoutez, modifiez ou supprimez des articles pour tenir vos
                visiteurs informés des dernières nouvelles et événements.
              </p>
            </div>
            <Button
              className="align-center "
              onClick={() => navigate("/gestion/actus/creation")}
            >
              Créer une publication
            </Button>
          </div>
        </section>
        <section id="actu-list">
          <div className="border border-black/10 w-68 rounded-lg bg-white hover:shadow-md cursor-pointer mb-4">
            <img className="h-30" src="" alt="" />
            <div className="p-4">
              <h3>Titre actus</h3>
              <Badge>01/01/2026</Badge>
              <p className="line-clamp-3">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi rem repudiandae delectus consequuntur eveniet omnis
                eos nihil pariatur eum eligendi ipsa rerum cumque esse,
                voluptatem amet eaque hic sequi similique.
              </p>

              <div className="flex gap-4 flex-col mt-2">
                <hr className=" text-black/20" />
                <div>
                  <Button color="tertiary" className="text-black/60">
                    Modifier
                  </Button>
                  <Button className="text-white">Supprimer</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Actus_creation />
    </div>
  );
}
export default ActusGesiton;
