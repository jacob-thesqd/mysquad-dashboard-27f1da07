import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AutoAssigner } from "@/components/processes/AutoAssigner";
type Process = {
  id: string;
  name: string;
  description: string;
  component: React.ReactNode;
};
const Processes = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("auto-assigner");
  const processes: Process[] = [{
    id: "auto-assigner",
    name: "Auto-Assigner",
    description: "Automatically assign tasks based on predefined rules",
    component: <AutoAssigner />
  }
  // More processes can be added here in the future
  ];
  const currentProcess = processes.find(process => process.id === selectedProcess) || processes[0];
  return <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Processes</h1>
      <p className="mb-6">Select a process to view its details and configuration</p>
      
      <div className="mb-8 max-w-md">
        <Select value={selectedProcess} onValueChange={setSelectedProcess}>
          <SelectTrigger>
            <SelectValue placeholder="Select a process" />
          </SelectTrigger>
          <SelectContent>
            {processes.map(process => <SelectItem key={process.id} value={process.id}>
                {process.name}
              </SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Card className="pr-8">
        <CardHeader className="pb-0">
          <CardTitle>{currentProcess.name}</CardTitle>
          <CardDescription>{currentProcess.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-6 px-0 mx-0">
          {currentProcess.component}
        </CardContent>
      </Card>
    </div>;
};
export default Processes;