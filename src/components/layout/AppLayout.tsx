
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarHeader, SidebarSection, SidebarItem, SidebarFooter, useSidebar } from "@/components/ui/collapsible-sidebar";
import { MapPin, Settings, ChevronsUpDown, AudioWaveform, Award, Package, SunMoon, LogOut, SquareChartGantt, Waves } from "lucide-react";
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

  // Update isCollapsed state based on hover status
  useEffect(() => {
    setIsCollapsed(!isHovered);
  }, [isHovered]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-sidebar">
      <div 
        className="h-full" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <Sidebar collapsed={isCollapsed}>
          <SidebarHeader>
            <div className="flex items-center justify-center pb-4 mt-4 w-full">
              {isCollapsed ? (
                <div className="flex h-10 w-10 items-center justify-center ml-2">
                  <div className="flex h-10 w-10 items-center justify-center">
                    <img 
                      src="https://wttgwoxlezqoyzmesekt.supabase.co/storage/v1/object/public/cms-general//logo.png" 
                      alt="Logo" 
                      className="h-10" 
                      style={{ maxHeight: '24px' }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center px-4 w-full">
                  <div className="flex h-10 w-10 items-center justify-center">
                    <img 
                      src="https://wttgwoxlezqoyzmesekt.supabase.co/storage/v1/object/public/cms-general//logo.png" 
                      alt="Logo" 
                      className="h-10" 
                      style={{ maxHeight: '24px' }}
                    />
                  </div>
                  <span className="ml-2 text-xl font-[700] text-sidebar-foreground">MyApp</span>
                </div>
              )}
            </div>
          </SidebarHeader>
          
          <div className="flex flex-col h-[calc(100%-8rem)] overflow-hidden ml-2">
            <SidebarSection>
              <SidebarItem 
                icon={MapPin} 
                active={location.pathname === "/"} 
                onClick={() => handleNavigation("/")}
              >
                Home
              </SidebarItem>
              <SidebarItem 
                icon={SquareChartGantt} 
                active={location.pathname === "/data"} 
                onClick={() => handleNavigation("/data")}
              >
                Data
              </SidebarItem>
              <SidebarItem 
                icon={AudioWaveform} 
                active={location.pathname === "/audits"} 
                onClick={() => handleNavigation("/audits")}
              >
                Audits
              </SidebarItem>
              <SidebarItem 
                icon={Waves} 
                active={location.pathname === "/deep-dive"} 
                onClick={() => handleNavigation("/deep-dive")}
              >
                Task Deep Dive
              </SidebarItem>
            </SidebarSection>
          </div>
          
          <SidebarFooter>
            <div className={`flex items-center ${isCollapsed ? "justify-center px-0" : "justify-between px-2"}`}>
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
                <div className="mx-auto h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                  <span className="text-xs font-medium">JD</span>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>
      
      <main className="flex-1 bg-background rounded-l-3xl shadow-md overflow-hidden my-4 ml-2 border border-gray-300/20 dark:border-gray-600/20">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
