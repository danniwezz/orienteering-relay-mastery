
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { useState, useEffect } from "react";

import Navbar from "./components/navigation/Navbar";
import Index from "./pages/Index";
import Runners from "./pages/Runners";
import Clubs from "./pages/Clubs";
import RelayDetail from "./pages/RelayDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is logged in
  useEffect(() => {
    // For demo purposes, we'll consider the user authenticated by default
    // In a real app, we'd check for a token in localStorage or cookies
    setIsAuthenticated(true);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-background dark">
              {isAuthenticated && <Navbar />}
              <main className="flex-1">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } />
                  <Route path="/runners" element={
                    <ProtectedRoute>
                      <Runners />
                    </ProtectedRoute>
                  } />
                  <Route path="/clubs" element={
                    <ProtectedRoute>
                      <Clubs />
                    </ProtectedRoute>
                  } />
                  <Route path="/relay/:relayId" element={
                    <ProtectedRoute>
                      <RelayDetail />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
