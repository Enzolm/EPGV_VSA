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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useGetAllUtilisateurs,
  useLockAccount,
  useUnlockAccount,
  useDeleteAccount,
} from "@/hooks/useUtilisateur";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  BadgeCheck,
  Hourglass,
  Ban,
  ShieldUser,
  Search,
  SquarePen,
  UserRoundPenIcon,
  UserLock,
  Trash2,
  UserCheck,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
import { FieldLabel } from "@/components/ui/field";
import { ButtonGroup } from "@/components/ui/button-group";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function UtilisateurGestion() {
  const navigate = useNavigate();
  const { utilisateurs, loading, error, refresh } = useGetAllUtilisateurs();
  const {
    lockAccount,
    loading: lockLoading,
    error: lockError,
  } = useLockAccount();
  const {
    unlockAccount,
    loading: unlockLoading,
    error: unlockError,
  } = useUnlockAccount();
  const {
    deleteAccount,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteAccount();
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

  const handleLock = (id: string) => {
    lockAccount(id);
  };

  useEffect(() => {
    if (lockError) {
      console.error("Erreur lors du verrouillage du compte:", lockError);
    }
    if (unlockError) {
      console.error("Erreur lors du déverrouillage du compte:", unlockError);
    }
    if (deleteError) {
      console.error("Erreur lors de la suppression du compte:", deleteError);
    }
    if (!lockLoading && !unlockLoading && !deleteLoading) {
      refresh();
    }
  }, [
    lockError,
    unlockError,
    lockLoading,
    unlockLoading,
    deleteError,
    deleteLoading,
  ]);

  const handleUnlock = (id: string) => {
    unlockAccount(id);
  };

  const handleDelete = (id: string) => {
    deleteAccount(id);
  };

  return (
    <>
      <section id="info" className="flex flex-col gap-4">
        <div className="flex lg:flex-row flex-col align-center justify-between w-2/2 lg:items-center items-end">
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
            className="align-center"
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
                * Seul les administrateurs peuvent créer ET supprimer des
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
                <TableHead className="text-right"></TableHead>
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
                    <Popover>
                      <PopoverTrigger>
                        <Button variant="outline" className="ml-2">
                          <SquarePen className="w-4 h-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-32 p-0 gap-0">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <UserRoundPenIcon className="w-4 h-4 mr-2" />
                          Modifier
                        </Button>
                        {utilisateur.status !== "desactivated" ? (
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleLock(utilisateur.id)}
                          >
                            {lockLoading ? (
                              <Spinner className="w-4 h-4 mr-2" />
                            ) : (
                              <UserLock className="w-4 h-4 mr-2" />
                            )}
                            Désactiver
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => handleUnlock(utilisateur.id)}
                          >
                            {unlockLoading ? (
                              <Spinner className="w-4 h-4 mr-2" />
                            ) : (
                              <UserCheck className="w-4 h-4 mr-2" />
                            )}
                            Activer
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger className="w-full">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-red-500 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Confirmer la suppression
                              </DialogTitle>
                              <DialogDescription>
                                Êtes-vous sûr de vouloir supprimer cet
                                utilisateur ? Cette action est irréversible.
                              </DialogDescription>
                            </DialogHeader>
                            <Button
                              variant="destructive"
                              className="mt-4"
                              onClick={() => {
                                handleDelete(utilisateur.id);
                              }}
                            >
                              Supprimer définitivement
                            </Button>
                          </DialogContent>
                        </Dialog>
                      </PopoverContent>
                    </Popover>
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
