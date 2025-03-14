
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Filter, CheckCircle, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import DataTable from "@/components/data/DataTable";
import { 
  ProjectData,
  HIDDEN_COLUMNS,
  isArrayColumn,
  isDateColumn,
  isNumber,
  getColumnRange,
  getUniqueColumnValues
} from "@/utils/dataUtils";
import { ColumnDef } from "@tanstack/react-table";

const DataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<string>("active");

  // Fetch active projects data from Supabase
  const {
    data: activeProjects = [],
    isLoading: isActiveLoading,
    error: activeError
  } = useQuery({
    queryKey: ["activeProjects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("active_projects_mv").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data as ProjectData[];
    },
    enabled: activeTab === "active"
  });

  // Fetch master projects data from Supabase
  const {
    data: masterProjects = [],
    isLoading: isMasterLoading,
    error: masterError
  } = useQuery({
    queryKey: ["masterProjects"],
    queryFn: async () => {
      const { data, error } = await supabase.from("master_project_view_mv").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data as ProjectData[];
    },
    enabled: activeTab === "master"
  });

  // Get current projects based on active tab
  const currentProjects = useMemo(() => {
    return activeTab === "active" ? activeProjects : masterProjects;
  }, [activeTab, activeProjects, masterProjects]);

  const isLoading = activeTab === "active" ? isActiveLoading : isMasterLoading;
  const error = activeTab === "active" ? activeError : masterError;

  // Get all column names from first project
  const columns = useMemo(() => {
    if (currentProjects.length === 0) return [];
    
    // Create column definitions for the DataTable
    return Object.keys(currentProjects[0])
      .filter(column => !HIDDEN_COLUMNS.includes(column))
      .map((column) => ({
        id: column,
        accessorKey: column,
        header: column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' '),
        enableSorting: true,
      })) as ColumnDef<ProjectData>[];
  }, [currentProjects]);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <Tabs defaultValue="active" className="w-full h-full" onValueChange={handleTabChange}>
        <div className="border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-2">
              <CheckCircle size={16} />
              Account Active Projects View
            </TabsTrigger>
            <TabsTrigger value="master" className="flex items-center gap-2">
              <Layers size={16} />
              Master Projects View
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="active" className="flex-1 h-[calc(100%-3rem)]">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-8" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {isLoading ? "Loading..." : `Showing ${currentProjects.length} projects`}
                </span>
              </div>
            </div>
            
            <DataTable 
              data={currentProjects}
              columns={columns}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="master" className="flex-1 h-[calc(100%-3rem)]">
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-80">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-8" 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)} 
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {isLoading ? "Loading..." : `Showing ${currentProjects.length} projects`}
                </span>
              </div>
            </div>
            
            <DataTable 
              data={currentProjects}
              columns={columns}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataPage;
