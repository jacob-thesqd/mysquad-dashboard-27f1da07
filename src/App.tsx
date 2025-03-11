
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SidebarProvider } from "@/components/ui/collapsible-sidebar";
import AppLayout from "@/components/layout/AppLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Dashboard</h1><p>Welcome to your dashboard</p></div></AppLayout>} />
              <Route path="/projects" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Projects</h1><p>Manage your projects</p></div></AppLayout>} />
              <Route path="/documents" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Documents</h1><p>View and manage your documents</p></div></AppLayout>} />
              <Route path="/team" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Team</h1><p>Manage your team members</p></div></AppLayout>} />
              <Route path="/learning" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Learning</h1><p>Access learning resources</p></div></AppLayout>} />
              <Route path="/resources" element={<AppLayout><div className="p-8"><h1 className="text-2xl font-bold mb-4">Resources</h1><p>Browse available resources</p></div></AppLayout>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
