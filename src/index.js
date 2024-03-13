import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
import UserManagement from "./components/UserManagement";
import Contact from "./pages/Contact";


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
        path: "contact",
        element: 
          <ProtectedRoute>
            <Contact/>
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
        path: "usermanagement",
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
