import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import AuthorProfile from "./pages/AuthorProfile";
import CreatePost from "./pages/CreatePost";
import Settings from "./pages/Settings";
import {
  EditPostPage,
  NetworkPage,
  MessagingPage,
  NotificationsPage
} from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to auth page */}
          <Route path="/" element={<Navigate to="/auth" replace />} />

          {/* Authentication */}
          <Route path="/auth" element={<Auth />} />

          {/* Main application pages */}
          <Route path="/home/:id" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:id/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:post-id" element={<EditPostPage />} />
          <Route path="/author/:id" element={<AuthorProfile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Navigation pages */}
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/messaging" element={<MessagingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
