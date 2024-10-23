import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { PropsWithChildren } from "react";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/signin" />;
  }
  return children;
};
