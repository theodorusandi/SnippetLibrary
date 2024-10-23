import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react";
import Request from "../../utils/Request";
import { CookeStorageKey, cookieStorage, LocalStorageKey, persistentStorage } from "../../utils/BrowserStorage";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  user: string | null;
  signup: (data: unknown) => Promise<void>;
  signin: (data: unknown) => Promise<void>;
  logout: () => void;
}

const defaultValue: AuthContextValue = {
  user: null,
  signup: () => {
    throw new Error();
  },
  signin: () => {
    throw new Error();
  },
  logout: () => {
    throw new Error();
  },
};

const AuthContext = createContext<AuthContextValue>(defaultValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<string | null>(persistentStorage.get(LocalStorageKey.USER));

  const signin = useCallback(
    async (data: unknown) => {
      const res = await Request.post(`${import.meta.env.VITE_BASE_URL}auth/signin`, data);
      if (!res || !res.user || !res.token) {
        throw new Error("Sign in failed. Unable to authenticate user.");
      }
      const { user, token } = res;
      cookieStorage.set(CookeStorageKey.BEARER_TOKEN, token);
      persistentStorage.set(LocalStorageKey.USER, user.username);
      setUser(user.username);
      navigate("/");
    },
    [navigate]
  );

  const signup = useCallback(async (data: unknown) => {
    const res = await Request.post(`${import.meta.env.VITE_BASE_URL}auth/signup`, data);
    if (!res || !res.user) {
      throw new Error("Sign up failed.");
    }
  }, []);

  const logout = useCallback(() => {
    cookieStorage.remove(CookeStorageKey.BEARER_TOKEN);
    persistentStorage.remove(LocalStorageKey.USER);
    setUser(null);
    navigate("/signin");
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      signup,
      signin,
      logout,
    }),
    [user, signup, signin, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
