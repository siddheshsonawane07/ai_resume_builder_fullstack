import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

// Import all pages
import App from "./App";
import SignInPage from "./auth/sign-in/index"
import Dashboard from "./dashboard/index";
import Home from "./home/index";

// Create router with protected and public routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "auth/sign-in",
        element: <SignInPage />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);