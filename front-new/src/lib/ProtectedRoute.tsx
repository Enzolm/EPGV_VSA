import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "@/components/ui/spinner";

type AuthProviderProps = {
  children: React.ReactNode;
  AdminRoute: boolean;
};

const AuthProvider = ({ children, AdminRoute }: AuthProviderProps) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAuthenticated.success)) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate, location]);

  if (loading || isAuthenticated === null) {
    return <Spinner />;
  }

  if (
    !isAuthenticated ||
    !isAuthenticated.success ||
    (AdminRoute && !isAuthenticated.user?.isAdmin) ||
    (AdminRoute && isAuthenticated.user?.status !== "active")
  ) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
