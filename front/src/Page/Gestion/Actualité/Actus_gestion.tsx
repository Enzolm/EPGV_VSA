import { useState } from "react";
import { Badge } from "../../../components/base/badges/badges";
import { SlideoutMenu } from "../../../components/application/slideout-menus/slideout-menu";
import { Button } from "../../../components/base/buttons/button";
import { Input } from "../../../components/base/input/input";
import { Select } from "../../../components/base/select/select";
import { FilePlus02, XClose, Check, Save01 } from "@untitledui/icons";
import FileUploadProgressFill from "../../../composant/UploadFileComponents";

function ActusGesiton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { label: "Evènement", id: "@evenement" },
    { label: "Actualité", id: "@actualite" },
    { label: "Annonce", id: "@annonce" },
  ];

  return (
    <>
      <SlideoutMenu isOpen={isMenuOpen}>
        <div slot="header" className="flex p-4 w-full justify-between">
          <p className="text-2xl font-bold">Gestion des Actualités</p>
          <Button
            onClick={() => setIsMenuOpen(false)}
            iconLeading={<XClose data-icon />}
            color="tertiary"
          ></Button>
        </div>
        <div slot="body" className="flex flex-col gap-4 p-4">
          <div>
            <Input
              isRequired={true}
              label="Titre de l'actualité"
              type="text"
              placeholder="Entrez le titre de l'actualité"
            />
            <Select
              label="Catégorie"
              items={items}
              placeholder="Sélectionnez une catégorie"
            >
              {(item) => (
                <Select.Item
                  id={item.id}
                  supportingText={item.supportingText}
                  isDisabled={item.isDisabled}
                  icon={item.icon}
                  avatarUrl={item.avatarUrl}
                >
                  {item.label}
                </Select.Item>
              )}
            </Select>
            <FileUploadProgressFill />
          </div>
          <div className="flex gap-4">
            <Button
              onSelect={() => setIsMenuOpen(false)}
              color="secondary"
              size="sm"
            >
              Annuler
            </Button>
            <Button iconLeading={<Save01 data-icon />} size="sm">
              Brouillon
            </Button>
            <Button iconLeading={<Check data-icon />} size="sm">
              Publier
            </Button>
          </div>
        </div>
      </SlideoutMenu>

      <section id="info" className="flex">
        <div>
          <h2 className="mb-4 text-2xl font-bold text-green-800">
            Actualités récentes
          </h2>
          <p className="text-gray-700">
            Ici, vous pouvez gérer les actualités de votre site. Ajoutez,
            modifiez ou supprimez des articles pour tenir vos visiteurs informés
            des dernières nouvelles et événements.
          </p>
        </div>
        <Button
          onClick={() => setIsMenuOpen(true)}
          className="mt-4 bg-green-900 text-white hover:bg-green-700 self-end"
          iconLeading={<FilePlus02 data-icon />}
        >
          Ouvrir le menu de gestion
        </Button>
      </section>
      <section id="actu-list">
        <div className="border border-black/10 w-68 rounded-lg bg-white hover:shadow-md cursor-pointer mb-4">
          <img className="h-30" src="" alt="" />
          <div className="p-4">
            <h3>Titre actus</h3>
            <Badge type="pill-color">01/01/2026</Badge>
            <p className="line-clamp-3">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi rem repudiandae delectus consequuntur eveniet omnis eos
              nihil pariatur eum eligendi ipsa rerum cumque esse, voluptatem
              amet eaque hic sequi similique.
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
    </>
  );
}
export default ActusGesiton;
