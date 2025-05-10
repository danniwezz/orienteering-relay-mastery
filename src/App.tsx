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
import CreateTeam from './pages/relay/CreateTeam';
import SubmitRunner from './pages/relay/SubmitRunner';

// Translations
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/config';
import { TranslationErrorBoundary } from './components/error/TranslationErrorBoundary';
import { FormatProvider } from './components/providers/FormatProvider';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language');
    const browserLanguage = navigator.language.split('-')[0];
    const initialLanguage = savedLanguage || (browserLanguage === 'sv' ? 'sv' : 'en');

    i18n.changeLanguage(initialLanguage);
    localStorage.setItem('language', initialLanguage);

    // For demo purposes, consider user authenticated
    setIsAuthenticated(true);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <AppProvider>
            <FormatProvider>
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
                        <Route path="/relay/:relayId/create-team" element={
                          <ProtectedRoute>
                            <CreateTeam />
                          </ProtectedRoute>
                        } />
                        <Route path="/relay/:relayId/submit" element={
                          <ProtectedRoute>
                            <SubmitRunner />
                          </ProtectedRoute>
                        } />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </div>
                </BrowserRouter>
              </TooltipProvider>
            </FormatProvider>
          </AppProvider>
        </I18nextProvider>
      </TranslationErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
