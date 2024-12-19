import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import LoginSignup from "./auth/sign-in/index.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import ResumeEditor from "./dashboard/components/ResumeItem.jsx"; 
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/register",
        element: <LoginSignup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/dashboard/:uid/resume/:resumeId/edit",
            element: <ResumeEditor />,
          },
          {
            path: "/dashboard/:uid/resume/:resumeId/view",
            element: <ResumeEditor />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);