import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import HausWork from "./pages/HausWork";
import { Auth0Provider } from "@auth0/auth0-react";
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import Settings from "./pages/Settings";
import UserManagement from "./components/UserManagement";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "hauswork",
        element: 
          <ProtectedRoute>
            <HausWork />
          </ProtectedRoute>
      },
      {
        path: "settings",
        element: 
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        
      },
      {
        path: "welcome",
        element: 
          <ProtectedRoute>
            <WelcomePage />
          </ProtectedRoute>
        
      },
      {
        path: "dashboard",
        element: 
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        
      },
      {
        path: "users",
        element: 
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        
      },
    ]
  }
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-2qc2dhie7p6o4mf5.us.auth0.com"
      clientId="EOu8ec6i1aLe6iacVtUJnkcFyNwjJugk"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
