
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter, useSidebar } from "@/components/ui/collapsible-sidebar";
import { LayoutGrid, Settings, Box, ChevronsUpDown, FileText, Users, Award, Package, SunMoon, LogOut, Grid } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme/theme-provider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    theme,
    setTheme
  } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Add hover delay for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCollapsed(!isHovered);
    }, isHovered ? 100 : 400);
    return () => clearTimeout(timer);
  }, [isHovered]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return <div className="flex h-screen w-full overflow-hidden bg-sidebar" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Sidebar collapsed={isCollapsed}>
        <SidebarHeader>
          <div className="flex items-center px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
              <Box size={20} className="text-primary" />
            </div>
            <span className="ml-2 font-semibold text-sidebar-foreground">MyApp</span>
          </div>
        </SidebarHeader>
        
        <div className="flex flex-col h-[calc(100%-8rem)] overflow-hidden ml-2">
          <SidebarSection>
            <SidebarItem 
              icon={LayoutGrid} 
              active={location.pathname === "/"} 
              onClick={() => handleNavigation("/")}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem 
              icon={Grid} 
              active={location.pathname === "/simulation"} 
              onClick={() => handleNavigation("/simulation")}
            >
              Projects
            </SidebarItem>
            <SidebarItem 
              icon={FileText} 
              active={location.pathname === "/financial"} 
              onClick={() => handleNavigation("/financial")}
            >
              Documents
            </SidebarItem>
            <SidebarItem 
              icon={Users} 
              active={location.pathname === "/business"} 
              onClick={() => handleNavigation("/business")}
            >
              Team
            </SidebarItem>
            <SidebarItem 
              icon={Award} 
              active={location.pathname === "/university"} 
              onClick={() => handleNavigation("/university")}
            >
              Learning
            </SidebarItem>
            <SidebarItem 
              icon={Package} 
              active={location.pathname === "/marketplace"} 
              onClick={() => handleNavigation("/marketplace")}
            >
              Resources
            </SidebarItem>
          </SidebarSection>
        </div>
        
        <SidebarFooter>
          <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-4`}>
            {!isCollapsed ? (
              <>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <span className="ml-2 text-sm font-medium">John Doe</span>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-sidebar-foreground/70 hover:text-sidebar-foreground">
                      <ChevronsUpDown size={18} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2" align="end">
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="flex items-center justify-start gap-2 w-full">
                        <Settings size={16} />
                        <span>Settings</span>
                      </Button>
                      <Button variant="ghost" className="flex items-center justify-start gap-2 w-full" onClick={toggleTheme}>
                        <SunMoon size={16} />
                        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                      </Button>
                      <Button variant="ghost" className="flex items-center justify-start gap-2 w-full text-destructive">
                        <LogOut size={16} />
                        <span>Log out</span>
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                <span className="text-xs font-medium">JD</span>
              </div>
            )}
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <main className="flex-1 bg-background rounded-l-3xl shadow-md overflow-hidden mt-4 mb-4 ml-2 border border-gray-300/20 dark:border-gray-600/20">
        {children}
      </main>
    </div>;
};

export default AppLayout;
