
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskAudit } from "@/types/audit";
import { toast } from "sonner";

export function useTaskAudits() {
  const queryClient = useQueryClient();

  const { data: audits, isLoading, error } = useQuery({
    queryKey: ['taskAudits'],
    queryFn: async (): Promise<TaskAudit[]> => {
      const { data, error } = await supabase
        .from('task_audit_log')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching task audits:', error);
        toast.error('Failed to load audit tasks');
        throw new Error(error.message);
      }
      
      return data as TaskAudit[];
    },
  });

  const markAsComplete = useMutation({
    mutationFn: async (rowId: string) => {
      const { error } = await supabase
        .from('task_audit_log')
        .update({ row_updated: new Date().toISOString() })
        .eq('row_id', rowId);
      
      if (error) {
        console.error('Error marking audit as complete:', error);
        toast.error('Failed to update audit status');
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('Audit marked as complete');
      queryClient.invalidateQueries({ queryKey: ['taskAudits'] });
    },
  });

  const pendingAudits = audits?.filter(audit => audit.row_updated === null) || [];
  const completedAudits = audits?.filter(audit => audit.row_updated !== null) || [];

  return {
    audits,
    pendingAudits,
    completedAudits,
    isLoading,
    error,
    markAsComplete
  };
}
