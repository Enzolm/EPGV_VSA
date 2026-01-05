import { useState } from "react";
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

function ActusGesiton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { label: "Evènement", id: "@evenement" },
    { label: "Actualité", id: "@actualite" },
    { label: "Annonce", id: "@annonce" },
  ];

  return (
    <>
      <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div>
            <Input type="text" placeholder="Entrez le titre de l'actualité" />
            <Select>
              <SelectTrigger className="w-full mt-4">
                <SelectValue placeholder="Sélectionnez le type d'actualité" />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-4">
            <Button
              onSelect={() => setIsMenuOpen(false)}
              color="secondary"
              size="sm"
            >
              Annuler
            </Button>
            <Button size="sm">Brouillon</Button>
            <Button size="sm">Publier</Button>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
        >
          Ouvrir le menu de gestion
        </Button>
      </section>
      <section id="actu-list">
        <div className="border border-black/10 w-68 rounded-lg bg-white hover:shadow-md cursor-pointer mb-4">
          <img className="h-30" src="" alt="" />
          <div className="p-4">
            <h3>Titre actus</h3>
            <Badge>01/01/2026</Badge>
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
