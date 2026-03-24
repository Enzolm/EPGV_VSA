import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useUserStore } from "@/lib/store/userStore";
import { useLocation } from "react-router";

type VerifyTokenResponse = {
  success: boolean;
  user: {
    id: number;
    email: string;
    nom: string;
    prenom: string;
    role: string;
    status: string;
    isAdmin: boolean;
  } | undefined;
};

export type ChangePasswordResponse = {
  success: boolean;
  message: string;
};


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<VerifyTokenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{code: string, message: string} | null>(null);
  const { setUser } = useUserStore();
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async (token :string) => {
        if (!token) {
            setIsAuthenticated({ success: false, user: undefined });
            setLoading(false);
        }
        try {
            setLoading(true);
            const response = await api.get("/auth/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsAuthenticated(response.data);
            if (response.data.success && response.data.user) {
              setUser(response.data.user);
            }
        } catch (err: any) {
            setError({
                code: err.response?.data?.code || "NO_TOKEN",
                message: err.response?.data?.message || "Erreur lors de la vérification du token."
            });
            setIsAuthenticated({ success: false, user: undefined });
        } finally {
            setLoading(false);
        }
    };

    verifyToken(localStorage.getItem("token") || "");
}, [location.pathname]);

    useEffect(() => {
        const verifyToken = async (token :string) => {
            if (!token) {
                setIsAuthenticated({ success: false, user: undefined });
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await api.get("/auth/verify-token", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAuthenticated(response.data);
                if (response.data.success && response.data.user) {
                  setUser(response.data.user);
                }
            } catch (err: any) {
                setError({
                    code: err.response?.data?.code || "UNKNOWN_ERROR",
                    message: err.response?.data?.message || "Erreur lors de la vérification du token."
                });
                setIsAuthenticated({ success: false, user: undefined });
            } finally {
                setLoading(false);
            }
        };

        verifyToken(localStorage.getItem("token") || "");
    }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
    const response = await api.post("/auth/login", { email, password });
        if (response.data.success) {
            localStorage.setItem("token", response.data.token);
            return response.data;
        } else {
            setError({
                code: response.data.code || "UNKNOWN_ERROR",
                message: response.data.message || "Erreur lors de la connexion."
            });
        }
    } catch (err: any) {
      setError({
        code: err.response?.data?.code || "UNKNOWN_ERROR",
        message: err.response?.data?.message || "Erreur lors de la connexion."
      });
    } finally {
      setLoading(false);
    }
    };

    return { isAuthenticated, login, loading, error };
};

const useChangePassword = () => {
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<ChangePasswordResponse | null>(null);


  const changePassword = async (id: number, oldPassword: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setSuccess({ success: false, message: "Les mots de passe ne correspondent pas." });
      return;
    }
    try {      
        setLoading(true);
      const response = await api.put(`/auth/change-password/${id}`, {
        oldPassword,
        newPassword: password
      });
      setSuccess(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors du changement de mot de passe.");
      setSuccess({ success: false, message: err.response?.data?.message || "Erreur lors du changement de mot de passe." });
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, success, error, loading };
};

export { useAuth, useChangePassword };
