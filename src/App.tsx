
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/collapsible-sidebar";
import AppLayout from "@/components/layout/AppLayout";
import NotFound from "./pages/NotFound";
import DataPage from "./pages/DataPage";
import Dashboard from "./pages/Dashboard";
import Audits from "./pages/Audits";
import TaskDeepDive from "./pages/TaskDeepDive";
import Processes from "./pages/Processes";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useAutoAssignerDocs } from "./hooks/useAutoAssignerDocs";

// Initialize QueryClient
const queryClient = new QueryClient();

// Preload component to fetch documentation in the background
const PreloadData = () => {
  const { refetch } = useAutoAssignerDocs();
  
  useEffect(() => {
    // Prefetch the data in the background
    refetch();
  }, [refetch]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <BrowserRouter>
            <PreloadData />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
              <Route path="/data" element={<AppLayout><DataPage /></AppLayout>} />
              <Route path="/audits" element={<AppLayout><Audits /></AppLayout>} />
              <Route path="/deep-dive" element={<AppLayout><TaskDeepDive /></AppLayout>} />
              <Route path="/turnaround" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Turnaround Times</h1><p>Track task completion times and trends</p></div></AppLayout>} />
              <Route path="/scheduling" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Scheduling</h1><p>Manage resource scheduling</p></div></AppLayout>} />
              <Route path="/processes" element={<AppLayout><Processes /></AppLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
