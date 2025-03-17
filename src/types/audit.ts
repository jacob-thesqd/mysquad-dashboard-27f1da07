
export interface TaskAssignee {
  id: number;
  color: string;
  email: string;
  initials: string;
  username: string;
  profilePicture: string;
}

export interface TaskData {
  taskId: string;
  taskName: string;
  assignees: TaskAssignee[];
}

export interface AuditData {
  goLive?: boolean;
  taskData: TaskData;
  googleLinks?: string[];
  keywordsFoundDesc?: string;
  keywordsFoundChecklist?: string[];
}

export interface TaskAudit {
  row_id: string;
  created_at: string;
  task_id: string;
  reason: string;
  data: AuditData;
  row_updated: string | null;
  comment_sent: boolean | null;
}
