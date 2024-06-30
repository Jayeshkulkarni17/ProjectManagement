import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "./pages/login";
import Main from "./pages/main";
import Dashboard from "../src/pages/dashboard";
import ProjectList from "./components/projectList";
import CreateProject from "./components/createProject";
import PrivateRoute from "./utils/protectedRoutes";
import { AuthProvider } from "./components/useAuth";

export default function App() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Protected route setup */}
          <Route element={<PrivateRoute />}>
            {/* Main layout */}
            <Route path="/" element={<Main />}>
              <Route index element={<Dashboard />} />
              <Route path="/project-list" element={<ProjectList />} />
              <Route path="/create-project" element={<CreateProject />} />
            </Route>
          </Route>
          {/* Redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
