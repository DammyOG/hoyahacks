"use client";

import Image from "next/image";
import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from "./home/home_page";
import FileUpload from "./uploadtest/upload";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/upload",
    element: <FileUpload />,
  },
  // Catch-all route for unmatched paths
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// Root layout component
const RootLayout = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

// Main page component
export default function Home() {
  // Since we're using React Router, we need to ensure this only runs on client
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Return empty fragment during SSR to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return <RootLayout />;
}