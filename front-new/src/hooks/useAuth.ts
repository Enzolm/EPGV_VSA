import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { useUserStore } from "@/lib/store/userStore";

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
  } | null;
};


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<VerifyTokenResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUserStore();

    useEffect(() => {
        console.log("Vérification du token", localStorage.getItem("token"));
        const verifyToken = async (token :string) => {
            if (!token) {
                setIsAuthenticated({ success: false, user: null });
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
            } catch (err) {
                setError("Erreur lors de la vérification du token.");
                setIsAuthenticated({ success: false, user: null });
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
            setError(response.data.message || "Erreur lors de la connexion.");
        }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la connexion.");
    } finally {
      setLoading(false);
    }
    };

    return { isAuthenticated, login, loading, error };
};

export default useAuth;
