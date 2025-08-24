import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function RootRedirect() {
  const { token } = useAuth();
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-1 max-w-6xl mx-auto p-4 w-full">
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
