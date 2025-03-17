
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

export interface TaskStatus {
  id: string;
  status: string;
  color: string;
  orderindex: number;
  type: string;
}

export interface TaskCreator {
  id: number;
  username: string;
  color: string;
  email: string;
  profilePicture: string;
}

export interface ChecklistItem {
  id: string;
  name: string;
  orderindex: number | null;
  assignee: any | null;
  group_assignee: any | null;
  resolved: boolean;
  parent: any | null;
  date_created: string;
  start_date: string | null;
  start_date_time: boolean;
  due_date: string | null;
  due_date_time: boolean;
  sent_due_date_notif: any | null;
  children: any[];
}

export interface Checklist {
  id: string;
  task_id: string;
  name: string;
  date_created: string;
  orderindex: number;
  creator: number;
  resolved: number;
  unresolved: number;
  items: ChecklistItem[];
}

export interface TaskDetails {
  custom_id: string | null;
  custom_item_id: number;
  name: string;
  description: string;
  status: TaskStatus;
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed: string | null;
  date_done: string | null;
  archived: boolean;
  creator: TaskCreator;
  assignees: TaskAssignee[];
  group_assignees: any[];
  watchers: TaskAssignee[];
  checklists: Checklist[];
  tags: {
    name: string;
    tag_fg: string;
    tag_bg: string;
    creator: number;
  }[];
  parent: any | null;
  top_level_parent: any | null;
  priority: any | null;
  due_date: any | null;
  start_date: any | null;
  points: any | null;
  time_estimate: number;
  time_spent: number;
  custom_fields: Array<{
    id: string;
    name: string;
    type: string;
    type_config: any;
    date_created: string;
    hide_from_guests: boolean;
    value?: any;
    value_richtext?: any;
    required: boolean;
  }>;
  dependencies: any[];
  linked_tasks: any[];
  locations: Array<{
    id: string;
    name: string;
  }>;
  team_id: string;
  url: string;
  sharing: {
    public: boolean;
    public_share_expires_on: any | null;
    public_fields: string[];
    token: any | null;
    seo_optimized: boolean;
  };
  permission_level: string;
  list: {
    id: string;
    name: string;
    access: boolean;
  };
  project: {
    id: string;
    name: string;
    hidden: any | null;
    access: boolean;
  };
  folder: {
    id: string;
    name: string;
    hidden: any | null;
    access: boolean;
  };
  space: {
    id: string;
  };
  attachments: any[];
  task_id: string;
}
