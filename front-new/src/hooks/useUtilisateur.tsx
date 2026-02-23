import { useState, useEffect } from "react";
import api from "@/lib/axios";

export interface Utilisateur {
  id_utilisateur: string;
  nom: string;
  prenom: string;
  role: string;
  is_active: boolean;
  email: string;
  created_at: string;
  updated_at: string;
}

const useUtilisateurs = () => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/utilisateurs/get/all`);
        setUtilisateur(response.data.utilisateurs);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, []);

  return { utilisateur, loading, error };
};

const useUtilisateurByID = (id_utilisateur: string | null) => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (id_utilisateur === null) {
    return {
      utilisateur: null,
      loading: false,
      error: "ID d'utilisateur invalide.",
    };
  }
  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/utilisateurs/get/id/${id_utilisateur}`,
        );
        setUtilisateur(response.data.utilisateur);
      } catch (err) {
        setError("Erreur lors du chargement de l'utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, [id_utilisateur]);

  return { utilisateur, loading, error };
};

const useCreateUtilisateur = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createUtilisateur = async (formData: FormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.post("/utilisateurs/create/admin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccess(true);
    } catch (err) {
      setError("Erreur lors de la création de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return { createUtilisateur, loading, error, success };
};

const useUpdateUtilisateur = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUtilisateur = async (
    id_utilisateur: string,
    formData: FormData,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.put(
        `/utilisateurs/update/${id_utilisateur}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setSuccess(true);
    } catch (err) {
      setError("Erreur lors de la mise à jour de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return { updateUtilisateur, loading, error, success };
};

const useDeleteUtilisateur = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const deleteUtilisateur = async (id_utilisateur: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.delete(
        `/utilisateurs/delete/${id_utilisateur}`,
      );
      if (response.data.success) {
        setSuccess(true);
        console.log("Utilisateur supprimé:", response.data);
      } else {
        setError(response.data.message);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la suppression de l'utilisateur",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { deleteUtilisateur, loading, error, success };
};

const activateAccount = async (id_utilisateur: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  setLoading(true);
  setError(null);
  setSuccess(false);
  try {
    const response = await api.post(`/utilisateurs/activate/${id_utilisateur}`);
    if (response.data.success) {
      setSuccess(true);
      console.log("Utilisateur activé:", response.data);
    } else {
      setError(response.data.message);
    }
  } catch (err: any) {
    setError(
      err.response?.data?.message ||
        "Erreur lors de l'activation de l'utilisateur",
    );
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export default {
  useUtilisateurs,
  useUtilisateurByID,
  useCreateUtilisateur,
  useUpdateUtilisateur,
  useDeleteUtilisateur,
  activateAccount,
};
