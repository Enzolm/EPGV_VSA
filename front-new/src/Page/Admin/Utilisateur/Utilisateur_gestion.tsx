import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUtilisateurs } from "@/hooks/useUtilisateur";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, Hourglass, Ban, ShieldUser, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";

function UtilisateurGestion() {
  const navigate = useNavigate();
  const { utilisateurs, loading, error } = useGetAllUtilisateurs();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("test", utilisateurs);
  }, [utilisateurs]);

  const filteredUtilisateurs = utilisateurs.filter(
    (utilisateur) =>
      utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utilisateur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <section id="info" className="flex flex-col gap-4">
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
        <div>
          <Field>
            <FieldLabel htmlFor="input-button-group">
              Rechercher un utilisateur
            </FieldLabel>
            <ButtonGroup className="max-w-72">
              <Input
                id="input-button-group"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </ButtonGroup>
          </Field>
          <Table>
            <TableCaption>
              {loading
                ? "Chargement en cours..."
                : error
                  ? error
                  : "Liste des utilisateurs"}
            </TableCaption>
            <TableCaption className="mt-4">
              <span className="text-sm text-gray-500">
                * Seul l'utilisateur "Président(e)" peut supprimer des
                utilisateurs.
              </span>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Status</TableHead>
                <TableHead className="w-32">Nom</TableHead>
                <TableHead className="w-32">Prenom</TableHead>
                <TableHead className="w-32">Email</TableHead>
                <TableHead className="w-32">Rôle</TableHead>
                <TableHead className="w-32">Administrateur</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUtilisateurs.map((utilisateur) => (
                <TableRow key={utilisateur.id}>
                  <TableCell className="font-medium">
                    <Badge
                      className={`${utilisateur.status === "active" ? "bg-green-100 text-green-800" : utilisateur.status === "waiting_password" ? "bg-yellow-100 text-yellow-800" : utilisateur.status === "desactivated" ? "bg-red-100 text-red-800" : ""}`}
                    >
                      {utilisateur.status === "active" ? (
                        <BadgeCheck className="" />
                      ) : utilisateur.status === "waiting_password" ? (
                        <Hourglass className="" />
                      ) : utilisateur.status === "desactivated" ? (
                        <Ban className="" />
                      ) : (
                        ""
                      )}
                      {utilisateur.status === "active"
                        ? "Actif"
                        : utilisateur.status === "waiting_password"
                          ? "En attente d'activation"
                          : utilisateur.status === "desactivated"
                            ? "Désactivé"
                            : ""}
                    </Badge>
                  </TableCell>
                  <TableCell>{utilisateur.nom}</TableCell>
                  <TableCell>{utilisateur.prenom}</TableCell>
                  <TableCell>{utilisateur.email}</TableCell>
                  <TableCell>
                    {utilisateur.role == "president"
                      ? "Président(e)"
                      : utilisateur.role == "tresorier"
                        ? "Trésorier(ère)"
                        : utilisateur.role == "secretaire"
                          ? "Secrétaire"
                          : utilisateur.role == "secretaire-adjoint"
                            ? "Membre"
                            : ""}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={`${utilisateur.isAdmin ? "default" : "outline"}`}
                      className={`${utilisateur.isAdmin ? "bg-blue-100 text-blue-800" : ""}`}
                    >
                      {utilisateur.isAdmin ? <ShieldUser /> : null}
                      {utilisateur.isAdmin ? "Oui" : "Non"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline">Modifier</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
export default UtilisateurGestion;
