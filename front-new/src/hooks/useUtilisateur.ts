import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { set } from "react-hook-form";

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

type EditProfileData = {
  nom?: string;
  prenom?: string;
  email?: string;
  profileImage?: File | null;
};

type AdminEditProfileData = {
  nom?: string;
  prenom?: string;
  email?: string;
  role?: string;
  isAdmin?: boolean;
}

export interface EditProfileResponse {
  success: boolean;
  message: string;
}

export interface CreateUtilisateurResponse {
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
      const response = await api.post("/users/create/admin", data);
      return response.data as CreateUtilisateurResponse;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création de l'utilisateur."  );
      return { success: false, message: error || "Erreur lors de la création de l'utilisateur." } as CreateUtilisateurResponse;
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

const useGetProfileImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

    const fetchImageUrl = async (id: string) => {
      try {
        const img = await api.get(`/users/profile-image/user-${id}.webp`, {
          responseType: "blob",
        });
        setImageUrl(URL.createObjectURL(img.data));
      } catch (err) {
        console.error("Erreur lors du chargement de l'image de profil :", err);
        setError("Erreur lors du chargement de l'image de profil.");
        setImageUrl(`${import.meta.env.VITE_URL_PROFILE_IMAGE}/user-default.webp`);
      } finally {
        setLoading(false);
      }
    };

  return { fetchImageUrl, imageUrl, loading, error };
}

const useGetUtilisateurById = (id: string) => {
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/users/${id}`);
        setUtilisateur(response.data);
      } catch (err) {
        setError("Erreur lors du chargement de l'utilisateur.");
      } finally {
        setLoading(false);
      }
    };

    fetchUtilisateur();
  }, [id]);

  return { utilisateur, loading, error };
}

const useEditMyProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ success, setSuccess] = useState<EditProfileResponse | null>(null);

  const uploadProfileImage = async (file: File, id: string) => {
    const uploadData = new FormData();
    uploadData.append("img", file); // clé attendue par /users/upload
    uploadData.append("id", id);    // clé attendue par /users/upload
    return api.post("/users/upload", uploadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const editMyProfile = async (data: EditProfileData, id: string) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (data.nom) formData.append("nom", data.nom);
      if (data.prenom) formData.append("prenom", data.prenom);
      if (data.email) formData.append("email", data.email);
       const response = await api.put(`/users/edit-profile/${id}`, formData);
             if (data.profileImage instanceof File) {
        await uploadProfileImage(data.profileImage, id);
      }
      setSuccess(response.data);
      return response.data as EditProfileResponse;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du profil.");
      return { success: false, message: err.response?.data?.message || "Erreur lors de la mise à jour du profil." } as EditProfileResponse;
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editMyProfile, loading, error, success };
}

const useAdminEditProfile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [ success, setSuccess] = useState<EditProfileResponse | null>(null);

  const editProfile = async (data: AdminEditProfileData, id: string) => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (data.nom) formData.append("nom", data.nom);
      if (data.prenom) formData.append("prenom", data.prenom);
      if (data.email) formData.append("email", data.email);
      if (data.role) formData.append("role", data.role);
      if (data.isAdmin !== undefined) formData.append("isAdmin", data.isAdmin.toString());

      const response = await api.put(`/users/admin/edit-profile/${id}`, formData);
      setSuccess(response.data);
      return response.data as EditProfileResponse;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du profil.");
      return { success: false, message: err.response?.data?.message || "Erreur lors de la mise à jour du profil." } as EditProfileResponse;
    } finally {
      setLoading(false);
    }
  };

  return { editProfile, loading, error, success };
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
    useGetUtilisateurById,
  useGetProfileImage,
  useEditMyProfile,
  useAdminEditProfile,
};
