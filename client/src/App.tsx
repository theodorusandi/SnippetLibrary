import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/hooks/useAuth";
import SignInPage from "./components/SignInPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
