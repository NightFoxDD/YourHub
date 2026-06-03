import { Routes, Route, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import Layout from "./pages/layout";
import Home from "./pages/main/home";
import Loading from "./pages/loading";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import Profile from "./pages/User/Profile";
import Options from "./pages/User/Options";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";

import MainLayout from "./pages/mainLayout";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/register') {
        navigate('/home');
      }
    } else {
      if (location.pathname !== '/login' && location.pathname !== '/register') {
        navigate('/login');
      }
    }
    
    window.ipcRenderer.on('navigate', (_event: unknown, path: string) => {
      navigate(path);
    });
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/user" >
          <Route index element={<Profile />} />
          <Route path="options" element={<Options />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
