import { useState, useEffect } from "react";
import api from "@/lib/axios";

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  role: string;
  isAdmin: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface getAllUtilisateursResponse {
  success: boolean;
  users: Utilisateur[];
}

export interface returnCheckTokenValidity {
  valid: boolean;
  userId?: string;
  message?: string;
}

type ActivateAccounteResponse = {
  success: boolean;
  message: string;
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

const useCreateUtilisateur = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUtilisateur = async (data: {
    nom: string;
    prenom: string;
    email: string;
    role: string;
    isAdmin: boolean;
  }) => {
    try {
      setLoading(true);
      await api.post("/users/create/admin", data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création de l'utilisateur."  );
    } finally {
      setLoading(false);
    }
  };

  return { createUtilisateur, loading, error };
};

const useGetAllUtilisateurs = () => {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUtilisateurs = async () => {
    try {
        setLoading(true);
        const response = await api.get(`/users/get/all`);
        setUtilisateurs(response.data.users);
      } catch (err) {
        setError("Erreur lors du chargement des utilisateurs.");
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
    
    fetchUtilisateurs();
  }, []);


  return { utilisateurs, loading, error, refresh: fetchUtilisateurs };
};

const useCheckTokenCreationValidity = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkTokenValidity = async (token: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/users/token/creation/check/${token}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la vérification du token."  );
      return { valid: false, message: error};
    } finally {
      setLoading(false);
    }
  };

  return { checkTokenValidity, loading, error };
}

const useActiveAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPassword = async (data: { token: string | undefined; password: string }) => {
    if (!data.token) {
      setError("Token manquant.");
      return { success: false, message: "Token manquant." };
    }
    try {
      setLoading(true);
      const reponse = await api.post("/users/activate/account", data);
      return reponse.data as ActivateAccounteResponse;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création du mot de passe."  );
      return { success: false, message: error || "Erreur lors de la création du mot de passe." };
    } finally {
      setLoading(false);
    }
  };

  return { createPassword, loading, error };
}

const useLockAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const lockAccount = async (id: string) => {
    try {
      setLoading(true);
      await api.get(`/users/account/lock/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la désactivation du compte."  );
    } finally {
      setLoading(false);
    }
  };

  return { lockAccount, loading, error };
}

const useUnlockAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const unlockAccount = async (id: string) => {
    try {
      setLoading(true);
      await api.get(`/users/account/unlock/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la réactivation du compte."  );
    } finally {
      setLoading(false);
    }
  };

  return { unlockAccount, loading, error };
}

const useDeleteAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const deleteAccount = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/users/account/delete/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression du compte."  );
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
}

export {
  useUtilisateurs,
  useCreateUtilisateur,
  useGetAllUtilisateurs,
  useCheckTokenCreationValidity,
  useActiveAccount,
  useLockAccount,
  useUnlockAccount,
  useDeleteAccount,
};
