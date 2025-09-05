import "./global.css";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Courses from "./pages/Courses";
import Agency from "./pages/Agency";
import Support from "./pages/Support";
import Contacts from "./pages/Contacts";
import Playlists from "./pages/Playlists";
import EventsProduction from "./pages/EventsProduction";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function PlaceholderPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent mb-4">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg mb-8">{description}</p>
        <p className="text-sm text-muted-foreground">
          This page is coming soon. Continue chatting to help us build out this
          section!
        </p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <LanguageProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/events" element={<Events />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/agency" element={<Agency />} />
                <Route path="/events-production" element={<EventsProduction />} />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const container = document.getElementById("root")!;

// Check if we're in development and avoid creating multiple roots
let root: ReturnType<typeof createRoot>;
if (import.meta.hot) {
  // In development with HMR, reuse existing root if available
  if (!(window as any).__reactRoot) {
    (window as any).__reactRoot = createRoot(container);
  }
  root = (window as any).__reactRoot;
} else {
  // In production, create root normally
  root = createRoot(container);
}

root.render(<App />);
