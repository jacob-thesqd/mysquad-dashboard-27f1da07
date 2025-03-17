export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aa_decision_log: {
        Row: {
          all_choices: Json[] | null
          assignee_id: number | null
          created_at: string
          designer: string | null
          designer_data: Json | null
          execution_data: Json | null
          execution_id: number | null
          explanation_pl: string | null
          explanation_pl_md: string | null
          row_id: string
          task_id: string
          type: string | null
        }
        Insert: {
          all_choices?: Json[] | null
          assignee_id?: number | null
          created_at?: string
          designer?: string | null
          designer_data?: Json | null
          execution_data?: Json | null
          execution_id?: number | null
          explanation_pl?: string | null
          explanation_pl_md?: string | null
          row_id?: string
          task_id: string
          type?: string | null
        }
        Update: {
          all_choices?: Json[] | null
          assignee_id?: number | null
          created_at?: string
          designer?: string | null
          designer_data?: Json | null
          execution_data?: Json | null
          execution_id?: number | null
          explanation_pl?: string | null
          explanation_pl_md?: string | null
          row_id?: string
          task_id?: string
          type?: string | null
        }
        Relationships: []
      }
      aa_log: {
        Row: {
          aa_execution_id: string | null
          aa_workflow_id: string | null
          account: number | null
          adjusted_go_live: boolean | null
          assignee: string | null
          days_out: number | null
          draft_date: string | null
          execution_id: string | null
          high_usage: boolean | null
          max_days_future: number | null
          min_days_future: number | null
          name: string | null
          pref_score: number | null
          prev_designer: boolean | null
          queue_num: number | null
          resp_dept: string | null
          row_created: string | null
          row_id: string
          row_updated: string | null
          status: string | null
          tag_grouping: string | null
          task_id: string
          time_estimate: number | null
          workflow_id: string | null
        }
        Insert: {
          aa_execution_id?: string | null
          aa_workflow_id?: string | null
          account?: number | null
          adjusted_go_live?: boolean | null
          assignee?: string | null
          days_out?: number | null
          draft_date?: string | null
          execution_id?: string | null
          high_usage?: boolean | null
          max_days_future?: number | null
          min_days_future?: number | null
          name?: string | null
          pref_score?: number | null
          prev_designer?: boolean | null
          queue_num?: number | null
          resp_dept?: string | null
          row_created?: string | null
          row_id?: string
          row_updated?: string | null
          status?: string | null
          tag_grouping?: string | null
          task_id: string
          time_estimate?: number | null
          workflow_id?: string | null
        }
        Update: {
          aa_execution_id?: string | null
          aa_workflow_id?: string | null
          account?: number | null
          adjusted_go_live?: boolean | null
          assignee?: string | null
          days_out?: number | null
          draft_date?: string | null
          execution_id?: string | null
          high_usage?: boolean | null
          max_days_future?: number | null
          min_days_future?: number | null
          name?: string | null
          pref_score?: number | null
          prev_designer?: boolean | null
          queue_num?: number | null
          resp_dept?: string | null
          row_created?: string | null
          row_id?: string
          row_updated?: string | null
          status?: string | null
          tag_grouping?: string | null
          task_id?: string
          time_estimate?: number | null
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "aa_log_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "aa_log_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      accounts: {
        Row: {
          acc_airtable_data: Json | null
          account: number
          address: string | null
          attendance: number | null
          auto_assign_override: boolean | null
          campuses: number | null
          church_name: string | null
          current_sub_start: string | null
          dropbox_folder_id: string | null
          facebook: string | null
          folder_id: number | null
          high_usage: boolean | null
          instagram: string | null
          mmq_max: number | null
          monthly_rate: number | null
          original_sub_start: string | null
          primary_email: string[] | null
          row_created: string
          row_id: string
          row_updated: string | null
          status: Database["public"]["Enums"]["account_status"] | null
          timezone: string | null
          website: string | null
        }
        Insert: {
          acc_airtable_data?: Json | null
          account: number
          address?: string | null
          attendance?: number | null
          auto_assign_override?: boolean | null
          campuses?: number | null
          church_name?: string | null
          current_sub_start?: string | null
          dropbox_folder_id?: string | null
          facebook?: string | null
          folder_id?: number | null
          high_usage?: boolean | null
          instagram?: string | null
          mmq_max?: number | null
          monthly_rate?: number | null
          original_sub_start?: string | null
          primary_email?: string[] | null
          row_created?: string
          row_id?: string
          row_updated?: string | null
          status?: Database["public"]["Enums"]["account_status"] | null
          timezone?: string | null
          website?: string | null
        }
        Update: {
          acc_airtable_data?: Json | null
          account?: number
          address?: string | null
          attendance?: number | null
          auto_assign_override?: boolean | null
          campuses?: number | null
          church_name?: string | null
          current_sub_start?: string | null
          dropbox_folder_id?: string | null
          facebook?: string | null
          folder_id?: number | null
          high_usage?: boolean | null
          instagram?: string | null
          mmq_max?: number | null
          monthly_rate?: number | null
          original_sub_start?: string | null
          primary_email?: string[] | null
          row_created?: string
          row_id?: string
          row_updated?: string | null
          status?: Database["public"]["Enums"]["account_status"] | null
          timezone?: string | null
          website?: string | null
        }
        Relationships: []
      }
      assignee_history: {
        Row: {
          assignee: number
          change_type: Database["public"]["Enums"]["assignee_change_type"]
          changed_at: string
          row_created: string | null
          row_id: string
          task_id: string
          updated_by: number | null
        }
        Insert: {
          assignee: number
          change_type: Database["public"]["Enums"]["assignee_change_type"]
          changed_at?: string
          row_created?: string | null
          row_id?: string
          task_id: string
          updated_by?: number | null
        }
        Update: {
          assignee?: number
          change_type?: Database["public"]["Enums"]["assignee_change_type"]
          changed_at?: string
          row_created?: string | null
          row_id?: string
          task_id?: string
          updated_by?: number | null
        }
        Relationships: []
      }
      bible_translations: {
        Row: {
          abbreviation: string | null
          created_at: string
          row_id: string
          translation: string
        }
        Insert: {
          abbreviation?: string | null
          created_at?: string
          row_id?: string
          translation: string
        }
        Update: {
          abbreviation?: string | null
          created_at?: string
          row_id?: string
          translation?: string
        }
        Relationships: []
      }
      clickup_auth_users: {
        Row: {
          clickup_access_token: string
          clickup_email: string
          clickup_team_id: string | null
          clickup_token_type: string | null
          clickup_user_id: string
          clickup_username: string | null
          created_at: string
          id: string
          metadata: Json | null
          profile_picture: string | null
          updated_at: string
        }
        Insert: {
          clickup_access_token: string
          clickup_email: string
          clickup_team_id?: string | null
          clickup_token_type?: string | null
          clickup_user_id: string
          clickup_username?: string | null
          created_at?: string
          id: string
          metadata?: Json | null
          profile_picture?: string | null
          updated_at?: string
        }
        Update: {
          clickup_access_token?: string
          clickup_email?: string
          clickup_team_id?: string | null
          clickup_token_type?: string | null
          clickup_user_id?: string
          clickup_username?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          profile_picture?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      clickup_comments: {
        Row: {
          clickup_id: number
          comment_id: string
          comment_text: string
          created_at: string
          internal: boolean | null
          sentiment: Database["public"]["Enums"]["sentiment"] | null
          task_id: string
          update_category:
            | Database["public"]["Enums"]["comment_category"]
            | null
          username: string | null
        }
        Insert: {
          clickup_id: number
          comment_id: string
          comment_text: string
          created_at?: string
          internal?: boolean | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          task_id: string
          update_category?:
            | Database["public"]["Enums"]["comment_category"]
            | null
          username?: string | null
        }
        Update: {
          clickup_id?: number
          comment_id?: string
          comment_text?: string
          created_at?: string
          internal?: boolean | null
          sentiment?: Database["public"]["Enums"]["sentiment"] | null
          task_id?: string
          update_category?:
            | Database["public"]["Enums"]["comment_category"]
            | null
          username?: string | null
        }
        Relationships: []
      }
      clickup_custom_fields: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      clickup_folders: {
        Row: {
          account: number | null
          created_at: string
          id: number
          name: string | null
          space_id: number | null
        }
        Insert: {
          account?: number | null
          created_at?: string
          id?: number
          name?: string | null
          space_id?: number | null
        }
        Update: {
          account?: number | null
          created_at?: string
          id?: number
          name?: string | null
          space_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_space_id_fkey"
            columns: ["space_id"]
            isOneToOne: false
            referencedRelation: "clickup_spaces"
            referencedColumns: ["id"]
          },
        ]
      }
      clickup_lists: {
        Row: {
          account: number | null
          created_at: string
          folder: number | null
          id: number
          name: string
          space: number | null
        }
        Insert: {
          account?: number | null
          created_at?: string
          folder?: number | null
          id?: number
          name: string
          space?: number | null
        }
        Update: {
          account?: number | null
          created_at?: string
          folder?: number | null
          id?: number
          name?: string
          space?: number | null
        }
        Relationships: []
      }
      clickup_sessions: {
        Row: {
          clickup_access_token: string
          clickup_email: string
          clickup_team_id: string
          clickup_token_type: string
          clickup_user_id: string
          clickup_username: string
          created_at: string
          expires_at: string
          id: string
          metadata: Json | null
          profile_picture: string | null
          session_id: string
        }
        Insert: {
          clickup_access_token: string
          clickup_email: string
          clickup_team_id: string
          clickup_token_type: string
          clickup_user_id: string
          clickup_username: string
          created_at?: string
          expires_at?: string
          id?: string
          metadata?: Json | null
          profile_picture?: string | null
          session_id: string
        }
        Update: {
          clickup_access_token?: string
          clickup_email?: string
          clickup_team_id?: string
          clickup_token_type?: string
          clickup_user_id?: string
          clickup_username?: string
          created_at?: string
          expires_at?: string
          id?: string
          metadata?: Json | null
          profile_picture?: string | null
          session_id?: string
        }
        Relationships: []
      }
      clickup_spaces: {
        Row: {
          created_at: string
          department: string | null
          id: number
          name: string | null
          row_id: string | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          id?: number
          name?: string | null
          row_id?: string | null
        }
        Update: {
          created_at?: string
          department?: string | null
          id?: number
          name?: string | null
          row_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_spaces_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      clickup_statuses: {
        Row: {
          action_required: boolean | null
          active: boolean | null
          color: string | null
          created_at: string
          queued: boolean | null
          status: string
        }
        Insert: {
          action_required?: boolean | null
          active?: boolean | null
          color?: string | null
          created_at?: string
          queued?: boolean | null
          status: string
        }
        Update: {
          action_required?: boolean | null
          active?: boolean | null
          color?: string | null
          created_at?: string
          queued?: boolean | null
          status?: string
        }
        Relationships: []
      }
      clickup_tags: {
        Row: {
          aa_exclude: boolean | null
          created_at: string
          department: string | null
          grouping: string | null
          id: string
          lead_time_days: number | null
          max_days_future: number | null
          max_time_est: number | null
          min_days_future: number | null
          min_time_est: number | null
          name: string
          prf_id: number | null
          proj_types_rec_id: string | null
          sqd_level_only: boolean | null
          status: string | null
          tag_type: Database["public"]["Enums"]["tag_type"] | null
          target_max: number | null
          target_min: number | null
        }
        Insert: {
          aa_exclude?: boolean | null
          created_at?: string
          department?: string | null
          grouping?: string | null
          id?: string
          lead_time_days?: number | null
          max_days_future?: number | null
          max_time_est?: number | null
          min_days_future?: number | null
          min_time_est?: number | null
          name: string
          prf_id?: number | null
          proj_types_rec_id?: string | null
          sqd_level_only?: boolean | null
          status?: string | null
          tag_type?: Database["public"]["Enums"]["tag_type"] | null
          target_max?: number | null
          target_min?: number | null
        }
        Update: {
          aa_exclude?: boolean | null
          created_at?: string
          department?: string | null
          grouping?: string | null
          id?: string
          lead_time_days?: number | null
          max_days_future?: number | null
          max_time_est?: number | null
          min_days_future?: number | null
          min_time_est?: number | null
          name?: string
          prf_id?: number | null
          proj_types_rec_id?: string | null
          sqd_level_only?: boolean | null
          status?: string | null
          tag_type?: Database["public"]["Enums"]["tag_type"] | null
          target_max?: number | null
          target_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_tags_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      clickup_users: {
        Row: {
          active: boolean | null
          association_last_scan: string | null
          clickup_id: number
          created_at: string
          date_invited: string | null
          date_joined: string | null
          email: string
          last_active: string | null
          mysquad_pushy_id: string | null
          profile_picture: string | null
          row_updated: string | null
          username: string | null
        }
        Insert: {
          active?: boolean | null
          association_last_scan?: string | null
          clickup_id?: number
          created_at?: string
          date_invited?: string | null
          date_joined?: string | null
          email: string
          last_active?: string | null
          mysquad_pushy_id?: string | null
          profile_picture?: string | null
          row_updated?: string | null
          username?: string | null
        }
        Update: {
          active?: boolean | null
          association_last_scan?: string | null
          clickup_id?: number
          created_at?: string
          date_invited?: string | null
          date_joined?: string | null
          email?: string
          last_active?: string | null
          mysquad_pushy_id?: string | null
          profile_picture?: string | null
          row_updated?: string | null
          username?: string | null
        }
        Relationships: []
      }
      clickup_views: {
        Row: {
          created_at: string
          folder: number | null
          id: string
          list: number | null
          name: string | null
          row_updated: string | null
        }
        Insert: {
          created_at?: string
          folder?: number | null
          id: string
          list?: number | null
          name?: string | null
          row_updated?: string | null
        }
        Update: {
          created_at?: string
          folder?: number | null
          id?: string
          list?: number | null
          name?: string | null
          row_updated?: string | null
        }
        Relationships: []
      }
      client_feedback: {
        Row: {
          account: number
          advice: string | null
          comments: string | null
          created_at: string
          nps: number | null
          rating: string | null
          rating_score: number | null
          task_id: string
        }
        Insert: {
          account: number
          advice?: string | null
          comments?: string | null
          created_at?: string
          nps?: number | null
          rating?: string | null
          rating_score?: number | null
          task_id: string
        }
        Update: {
          account?: number
          advice?: string | null
          comments?: string | null
          created_at?: string
          nps?: number | null
          rating?: string | null
          rating_score?: number | null
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_feedback_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "client_feedback_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      clients: {
        Row: {
          account: string | null
          clickup_id: string | null
          contact_type: string | null
          created_at: string | null
          email: string
          first_name: string | null
          job_title: string | null
          last_name: string | null
          name: string | null
          profile_photo: string | null
          row_id: string
          row_updated: string | null
        }
        Insert: {
          account?: string | null
          clickup_id?: string | null
          contact_type?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          name?: string | null
          profile_photo?: string | null
          row_id?: string
          row_updated?: string | null
        }
        Update: {
          account?: string | null
          clickup_id?: string | null
          contact_type?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          name?: string | null
          profile_photo?: string | null
          row_id?: string
          row_updated?: string | null
        }
        Relationships: []
      }
      database_recommendations: {
        Row: {
          category: string | null
          description: string
          estimated_benefit: string
          id: string
          impact: string
          potential_risks: string
          sql_fix: string
          title: string
        }
        Insert: {
          category?: string | null
          description: string
          estimated_benefit: string
          id: string
          impact: string
          potential_risks: string
          sql_fix: string
          title: string
        }
        Update: {
          category?: string | null
          description?: string
          estimated_benefit?: string
          id?: string
          impact?: string
          potential_risks?: string
          sql_fix?: string
          title?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string
          name: string
          row_id: string
        }
        Insert: {
          created_at?: string
          name: string
          row_id?: string
        }
        Update: {
          created_at?: string
          name?: string
          row_id?: string
        }
        Relationships: []
      }
      designer_changes: {
        Row: {
          created_at: string
          designer_email: string | null
          employee: boolean | null
          feedback: string | null
          id: string
          revisions: number | null
          task_id: string
          work_again: boolean | null
        }
        Insert: {
          created_at?: string
          designer_email?: string | null
          employee?: boolean | null
          feedback?: string | null
          id?: string
          revisions?: number | null
          task_id: string
          work_again?: boolean | null
        }
        Update: {
          created_at?: string
          designer_email?: string | null
          employee?: boolean | null
          feedback?: string | null
          id?: string
          revisions?: number | null
          task_id?: string
          work_again?: boolean | null
        }
        Relationships: []
      }
      designer_preference: {
        Row: {
          account: number
          created_at: string
          current: boolean | null
          designer: string
          dsq: boolean | null
          preference_code: string | null
          preference_type: Database["public"]["Enums"]["preference_type"]
          row_id: string
          row_updated: string | null
        }
        Insert: {
          account: number
          created_at?: string
          current?: boolean | null
          designer: string
          dsq?: boolean | null
          preference_code?: string | null
          preference_type: Database["public"]["Enums"]["preference_type"]
          row_id?: string
          row_updated?: string | null
        }
        Update: {
          account?: number
          created_at?: string
          current?: boolean | null
          designer?: string
          dsq?: boolean | null
          preference_code?: string | null
          preference_type?: Database["public"]["Enums"]["preference_type"]
          row_id?: string
          row_updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "designer_preference_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "designer_preference_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      designer_scheduling: {
        Row: {
          created_at: string
          day_num: number | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          email: string
          minutes_day: number | null
          row_id: string
          row_updated: string | null
        }
        Insert: {
          created_at?: string
          day_num?: number | null
          day_of_week: Database["public"]["Enums"]["day_of_week"]
          email: string
          minutes_day?: number | null
          row_id: string
          row_updated?: string | null
        }
        Update: {
          created_at?: string
          day_num?: number | null
          day_of_week?: Database["public"]["Enums"]["day_of_week"]
          email?: string
          minutes_day?: number | null
          row_id?: string
          row_updated?: string | null
        }
        Relationships: []
      }
      dropbox_async: {
        Row: {
          async_job_id: string
          created_at: string
          path: string | null
          status: string | null
        }
        Insert: {
          async_job_id: string
          created_at?: string
          path?: string | null
          status?: string | null
        }
        Update: {
          async_job_id?: string
          created_at?: string
          path?: string | null
          status?: string | null
        }
        Relationships: []
      }
      due_date_history: {
        Row: {
          changed_by: number | null
          created_at: string
          due_date_after: string | null
          due_date_before: string | null
          row_id: string
          task_id: string
        }
        Insert: {
          changed_by?: number | null
          created_at?: string
          due_date_after?: string | null
          due_date_before?: string | null
          row_id?: string
          task_id: string
        }
        Update: {
          changed_by?: number | null
          created_at?: string
          due_date_after?: string | null
          due_date_before?: string | null
          row_id?: string
          task_id?: string
        }
        Relationships: []
      }
      employee_timeoff: {
        Row: {
          amount: string | null
          at_rec_id: string | null
          created_at: string
          employee: string
          row_id: string
          row_updated: string | null
          status: string | null
          timeoff_code: string
          timeoff_end: string
          timeoff_start: string
          timeoff_type: string | null
          workdays_off: number | null
        }
        Insert: {
          amount?: string | null
          at_rec_id?: string | null
          created_at?: string
          employee: string
          row_id?: string
          row_updated?: string | null
          status?: string | null
          timeoff_code: string
          timeoff_end: string
          timeoff_start: string
          timeoff_type?: string | null
          workdays_off?: number | null
        }
        Update: {
          amount?: string | null
          at_rec_id?: string | null
          created_at?: string
          employee?: string
          row_id?: string
          row_updated?: string | null
          status?: string | null
          timeoff_code?: string
          timeoff_end?: string
          timeoff_start?: string
          timeoff_type?: string | null
          workdays_off?: number | null
        }
        Relationships: []
      }
      employees: {
        Row: {
          airtable_rec_id: string
          clickup_id: number | null
          created_at: string
          department: string | null
          email: string | null
          emp_airtable_data: Json | null
          first_name: string | null
          job_title: string | null
          last_name: string | null
          location: string | null
          manager: string | null
          name: string
          preserve_associations: boolean | null
          profile_photo: string | null
          row_id: string | null
          row_updated: string | null
          slack_id: string | null
          status: string | null
        }
        Insert: {
          airtable_rec_id: string
          clickup_id?: number | null
          created_at?: string
          department?: string | null
          email?: string | null
          emp_airtable_data?: Json | null
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          manager?: string | null
          name: string
          preserve_associations?: boolean | null
          profile_photo?: string | null
          row_id?: string | null
          row_updated?: string | null
          slack_id?: string | null
          status?: string | null
        }
        Update: {
          airtable_rec_id?: string
          clickup_id?: number | null
          created_at?: string
          department?: string | null
          email?: string | null
          emp_airtable_data?: Json | null
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          location?: string | null
          manager?: string | null
          name?: string
          preserve_associations?: boolean | null
          profile_photo?: string | null
          row_id?: string | null
          row_updated?: string | null
          slack_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      go_live_dates: {
        Row: {
          created_at: string
          go_live_date: string
          id: string
          task_id: string | null
        }
        Insert: {
          created_at?: string
          go_live_date: string
          id?: string
          task_id?: string | null
        }
        Update: {
          created_at?: string
          go_live_date?: string
          id?: string
          task_id?: string | null
        }
        Relationships: []
      }
      igniter_account_members: {
        Row: {
          account_id: string
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "igniter_account_members_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "igniter_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      igniter_accounts: {
        Row: {
          active: boolean | null
          created_at: string | null
          end_date: string | null
          id: string
          memberid: number | null
          name: string
          owner_id: string
          primary_email: string | null
          trial_end: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          memberid?: number | null
          name: string
          owner_id: string
          primary_email?: string | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          memberid?: number | null
          name?: string
          owner_id?: string
          primary_email?: string | null
          trial_end?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      igniter_profiles: {
        Row: {
          avatar_url: string | null
          church_name: string | null
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          church_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          church_name?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      improvement_scripts: {
        Row: {
          category: string
          description: string
          id: string
          impact: string
          name: string
          sql: string
        }
        Insert: {
          category: string
          description: string
          id: string
          impact: string
          name: string
          sql: string
        }
        Update: {
          category?: string
          description?: string
          id?: string
          impact?: string
          name?: string
          sql?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          currency: string | null
          customer_id: string | null
          id: string
          last_synced: string | null
          metadata: Json | null
          period_end: string | null
          period_start: string | null
          status: string | null
          subscription_id: string | null
          total: number | null
        }
        Insert: {
          currency?: string | null
          customer_id?: string | null
          id: string
          last_synced?: string | null
          metadata?: Json | null
          period_end?: string | null
          period_start?: string | null
          status?: string | null
          subscription_id?: string | null
          total?: number | null
        }
        Update: {
          currency?: string | null
          customer_id?: string | null
          id?: string
          last_synced?: string | null
          metadata?: Json | null
          period_end?: string | null
          period_start?: string | null
          status?: string | null
          subscription_id?: string | null
          total?: number | null
        }
        Relationships: []
      }
      issue_keywords: {
        Row: {
          category: string
          created_at: string
          id: number
          keyword: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: number
          keyword: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          keyword?: string
        }
        Relationships: []
      }
      location_mappings: {
        Row: {
          active: boolean | null
          clickup_id: number | null
          created_at: string
          email: string
          location_type: Database["public"]["Enums"]["location_type"]
          object_id: number
          row_id: string
          row_updated: string | null
        }
        Insert: {
          active?: boolean | null
          clickup_id?: number | null
          created_at?: string
          email: string
          location_type: Database["public"]["Enums"]["location_type"]
          object_id: number
          row_id?: string
          row_updated?: string | null
        }
        Update: {
          active?: boolean | null
          clickup_id?: number | null
          created_at?: string
          email?: string
          location_type?: Database["public"]["Enums"]["location_type"]
          object_id?: number
          row_id?: string
          row_updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_clickup_user"
            columns: ["clickup_id"]
            isOneToOne: false
            referencedRelation: "clickup_users"
            referencedColumns: ["clickup_id"]
          },
          {
            foreignKeyName: "fk_clickup_user"
            columns: ["clickup_id"]
            isOneToOne: false
            referencedRelation: "mv_all_designers"
            referencedColumns: ["assignee_user_id"]
          },
          {
            foreignKeyName: "fk_clickup_user"
            columns: ["clickup_id"]
            isOneToOne: false
            referencedRelation: "mv_all_designers_scheduling"
            referencedColumns: ["assignee_user_id"]
          },
        ]
      }
      mmq_log: {
        Row: {
          account: number | null
          action: string | null
          created_at: string
          data: Json | null
          row_id: string
        }
        Insert: {
          account?: number | null
          action?: string | null
          created_at?: string
          data?: Json | null
          row_id?: string
        }
        Update: {
          account?: number | null
          action?: string | null
          created_at?: string
          data?: Json | null
          row_id?: string
        }
        Relationships: []
      }
      mysquad_notification: {
        Row: {
          created_at: string
          data: Json | null
          device_id: string | null
          id: string
          notif_data: Json | null
          task_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          device_id?: string | null
          id?: string
          notif_data?: Json | null
          task_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          device_id?: string | null
          id?: string
          notif_data?: Json | null
          task_id?: string | null
        }
        Relationships: []
      }
      "mysquad-chrome-ext-preferences": {
        Row: {
          created_at: string
          data: Json | null
          row_id: string
          type: string | null
          user: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          row_id?: string
          type?: string | null
          user?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          row_id?: string
          type?: string | null
          user?: string | null
        }
        Relationships: []
      }
      n8n_executions: {
        Row: {
          completed: string
          end_time: string | null
          execution_id: number | null
          id: number
          start_time: string | null
          unique_id: string
          workflow_id: string
          workflow_server: string | null
        }
        Insert: {
          completed: string
          end_time?: string | null
          execution_id?: number | null
          id?: never
          start_time?: string | null
          unique_id: string
          workflow_id: string
          workflow_server?: string | null
        }
        Update: {
          completed?: string
          end_time?: string | null
          execution_id?: number | null
          id?: never
          start_time?: string | null
          unique_id?: string
          workflow_id?: string
          workflow_server?: string | null
        }
        Relationships: []
      }
      n8n_vectors: {
        Row: {
          embedding: string | null
          id: string
          metadata: Json | null
          text: string | null
        }
        Insert: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
          text?: string | null
        }
        Update: {
          embedding?: string | null
          id?: string
          metadata?: Json | null
          text?: string | null
        }
        Relationships: []
      }
      n8n_workflows: {
        Row: {
          created_at: string | null
          id: number
          name: string
          raw_data: Json | null
          server_name: string | null
          status: string | null
          updated_at: string | null
          workflow_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          raw_data?: Json | null
          server_name?: string | null
          status?: string | null
          updated_at?: string | null
          workflow_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          raw_data?: Json | null
          server_name?: string | null
          status?: string | null
          updated_at?: string | null
          workflow_id?: string
        }
        Relationships: []
      }
      ooo_coverage: {
        Row: {
          clickup_id: number
          department: string | null
          email: string | null
          id: number
          week: string
        }
        Insert: {
          clickup_id: number
          department?: string | null
          email?: string | null
          id?: never
          week: string
        }
        Update: {
          clickup_id?: number
          department?: string | null
          email?: string | null
          id?: never
          week?: string
        }
        Relationships: []
      }
      ooo_deduplicate: {
        Row: {
          created_at: string | null
          id: string
          recognition_key: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          recognition_key: string
        }
        Update: {
          created_at?: string | null
          id?: string
          recognition_key?: string
        }
        Relationships: []
      }
      pm_audits: {
        Row: {
          audit_date: string | null
          completed_by: number | null
          completion: string | null
          created_at: string
          data: Json | null
          department: string | null
          row_id: string
          task_id: string
        }
        Insert: {
          audit_date?: string | null
          completed_by?: number | null
          completion?: string | null
          created_at?: string
          data?: Json | null
          department?: string | null
          row_id: string
          task_id: string
        }
        Update: {
          audit_date?: string | null
          completed_by?: number | null
          completion?: string | null
          created_at?: string
          data?: Json | null
          department?: string | null
          row_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pm_audits_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      prf_account_project_counter: {
        Row: {
          account: string | null
          count: string | null
          created_at: string
          submission_id: string
        }
        Insert: {
          account?: string | null
          count?: string | null
          created_at?: string
          submission_id: string
        }
        Update: {
          account?: string | null
          count?: string | null
          created_at?: string
          submission_id?: string
        }
        Relationships: []
      }
      prf_admin_users: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
          super_admin: boolean | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
          super_admin?: boolean | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
          super_admin?: boolean | null
        }
        Relationships: []
      }
      prf_audit_logs: {
        Row: {
          action: string
          details: Json | null
          entity: string
          entity_id: string | null
          id: string
          performed_at: string
          performed_by: string
        }
        Insert: {
          action: string
          details?: Json | null
          entity: string
          entity_id?: string | null
          id?: string
          performed_at?: string
          performed_by: string
        }
        Update: {
          action?: string
          details?: Json | null
          entity?: string
          entity_id?: string | null
          id?: string
          performed_at?: string
          performed_by?: string
        }
        Relationships: []
      }
      prf_content_variables: {
        Row: {
          created_at: string
          fillout_field: string | null
          folder_name: string | null
          new_text: string | null
          temp_text: string | null
          variable: string
        }
        Insert: {
          created_at?: string
          fillout_field?: string | null
          folder_name?: string | null
          new_text?: string | null
          temp_text?: string | null
          variable?: string
        }
        Update: {
          created_at?: string
          fillout_field?: string | null
          folder_name?: string | null
          new_text?: string | null
          temp_text?: string | null
          variable?: string
        }
        Relationships: []
      }
      prf_custom_kits: {
        Row: {
          account_id: string
          created_at: string
          description: string | null
          id: number
          name: string
          project_ids: number[]
        }
        Insert: {
          account_id: string
          created_at?: string
          description?: string | null
          id?: number
          name: string
          project_ids?: number[]
        }
        Update: {
          account_id?: string
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          project_ids?: number[]
        }
        Relationships: []
      }
      prf_favorites: {
        Row: {
          account_id: string
          created_at: string
          id: string
          project_id: string
        }
        Insert: {
          account_id: string
          created_at?: string
          id?: string
          project_id: string
        }
        Update: {
          account_id?: string
          created_at?: string
          id?: string
          project_id?: string
        }
        Relationships: []
      }
      prf_feedback: {
        Row: {
          account_id: string | null
          category: string
          created_at: string
          id: string
          is_resolved: boolean | null
          member_id: string | null
          message: string
          resolved_at: string | null
          resolved_by: string | null
          response: string | null
          source: string | null
          status: string
          user_agent: string | null
          user_id: number | null
        }
        Insert: {
          account_id?: string | null
          category: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          member_id?: string | null
          message: string
          resolved_at?: string | null
          resolved_by?: string | null
          response?: string | null
          source?: string | null
          status?: string
          user_agent?: string | null
          user_id?: number | null
        }
        Update: {
          account_id?: string | null
          category?: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          member_id?: string | null
          message?: string
          resolved_at?: string | null
          resolved_by?: string | null
          response?: string | null
          source?: string | null
          status?: string
          user_agent?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      prf_general_submissions: {
        Row: {
          account_id: string | null
          created_at: string | null
          end_time: string
          raw_data: Json
          start_time: string
          submission_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id?: string | null
          created_at?: string | null
          end_time: string
          raw_data: Json
          start_time: string
          submission_id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string | null
          created_at?: string | null
          end_time?: string
          raw_data?: Json
          start_time?: string
          submission_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prf_help_content: {
        Row: {
          content: string
          id: string
          page: string | null
          updated_at: string
        }
        Insert: {
          content: string
          id: string
          page?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          id?: string
          page?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      prf_ministry_departments: {
        Row: {
          category: string
          created_at: string | null
          id: string
          member_id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          member_id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          member_id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prf_plans: {
        Row: {
          active: boolean
          id: string
          name: string
          plan_query: string | null
        }
        Insert: {
          active?: boolean
          id?: string
          name: string
          plan_query?: string | null
        }
        Update: {
          active?: boolean
          id?: string
          name?: string
          plan_query?: string | null
        }
        Relationships: []
      }
      prf_project_groups: {
        Row: {
          account_id: string | null
          active: boolean
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          order: number
          project_ids: string[]
          title: string
        }
        Insert: {
          account_id?: string | null
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          order?: number
          project_ids?: string[]
          title: string
        }
        Update: {
          account_id?: string | null
          active?: boolean
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          order?: number
          project_ids?: string[]
          title?: string
        }
        Relationships: []
      }
      prf_project_submissions: {
        Row: {
          account_id: string
          clickup_id: string | null
          completion_target: string | null
          created_at: string | null
          dbox_folder_created: boolean | null
          edit_id: string | null
          editable: boolean | null
          end_time: string | null
          files_processed: boolean | null
          gis_id: string
          hidden: boolean | null
          project_name: string | null
          project_submission_id: string
          project_type: number
          raw_data: Json
          start_time: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_id: string
          clickup_id?: string | null
          completion_target?: string | null
          created_at?: string | null
          dbox_folder_created?: boolean | null
          edit_id?: string | null
          editable?: boolean | null
          end_time?: string | null
          files_processed?: boolean | null
          gis_id: string
          hidden?: boolean | null
          project_name?: string | null
          project_submission_id: string
          project_type: number
          raw_data: Json
          start_time: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_id?: string
          clickup_id?: string | null
          completion_target?: string | null
          created_at?: string | null
          dbox_folder_created?: boolean | null
          edit_id?: string | null
          editable?: boolean | null
          end_time?: string | null
          files_processed?: boolean | null
          gis_id?: string
          hidden?: boolean | null
          project_name?: string | null
          project_submission_id?: string
          project_type?: number
          raw_data?: Json
          start_time?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      prf_search_logs: {
        Row: {
          account_id: string | null
          created_at: string
          id: string
          member_id: string | null
          results_count: string | null
          search_query: string
          search_type: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          created_at?: string
          id?: string
          member_id?: string | null
          results_count?: string | null
          search_query: string
          search_type: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          created_at?: string
          id?: string
          member_id?: string | null
          results_count?: string | null
          search_query?: string
          search_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      prf_selection_submissions: {
        Row: {
          created_at: string | null
          design_style: string | null
          gisid: string | null
          inspiration_images: Json[] | null
          member_id: number | null
          project_ids: number[] | null
          session_id: string
          trust_the_squad: boolean | null
          vision: string | null
        }
        Insert: {
          created_at?: string | null
          design_style?: string | null
          gisid?: string | null
          inspiration_images?: Json[] | null
          member_id?: number | null
          project_ids?: number[] | null
          session_id: string
          trust_the_squad?: boolean | null
          vision?: string | null
        }
        Update: {
          created_at?: string | null
          design_style?: string | null
          gisid?: string | null
          inspiration_images?: Json[] | null
          member_id?: number | null
          project_ids?: number[] | null
          session_id?: string
          trust_the_squad?: boolean | null
          vision?: string | null
        }
        Relationships: []
      }
      prf_selection_types: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          featured: boolean | null
          filter_categories: string[] | null
          form_id: string | null
          id: number
          image_url: string | null
          image_urls: Json | null
          is_primary: boolean
          keywords: string[] | null
          plan_requirements: Json | null
          ptRecID: string | null
          related_projects: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          featured?: boolean | null
          filter_categories?: string[] | null
          form_id?: string | null
          id?: never
          image_url?: string | null
          image_urls?: Json | null
          is_primary?: boolean
          keywords?: string[] | null
          plan_requirements?: Json | null
          ptRecID?: string | null
          related_projects?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          featured?: boolean | null
          filter_categories?: string[] | null
          form_id?: string | null
          id?: never
          image_url?: string | null
          image_urls?: Json | null
          is_primary?: boolean
          keywords?: string[] | null
          plan_requirements?: Json | null
          ptRecID?: string | null
          related_projects?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prf_special_dates: {
        Row: {
          created_at: string | null
          end_date: string | null
          event_type: string
          id: string
          is_active: boolean | null
          notes: string | null
          start_date: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          event_type: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          start_date: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          event_type?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
          start_date?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prf_system_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          created: string | null
          currency: string | null
          last_synced: string | null
          metadata: Json | null
          product_id: string | null
          stripe_id: string
          type: string | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          created?: string | null
          currency?: string | null
          last_synced?: string | null
          metadata?: Json | null
          product_id?: string | null
          stripe_id: string
          type?: string | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          created?: string | null
          currency?: string | null
          last_synced?: string | null
          metadata?: Json | null
          product_id?: string | null
          stripe_id?: string
          type?: string | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["stripe_id"]
          },
        ]
      }
      product_history: {
        Row: {
          account: number
          created_at: string
          current: boolean | null
          id: string
          product: string
          row_updated: string | null
        }
        Insert: {
          account: number
          created_at?: string
          current?: boolean | null
          id: string
          product: string
          row_updated?: string | null
        }
        Update: {
          account?: number
          created_at?: string
          current?: boolean | null
          id?: string
          product?: string
          row_updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_history_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "product_history_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "product_history_product_fkey"
            columns: ["product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["name"]
          },
        ]
      }
      products: {
        Row: {
          aa_exclude: boolean | null
          created_at: string
          features: string | null
          name: string
          row_id: string
          stripe_id: string | null
          type: Database["public"]["Enums"]["product_type"]
        }
        Insert: {
          aa_exclude?: boolean | null
          created_at?: string
          features?: string | null
          name: string
          row_id?: string
          stripe_id?: string | null
          type: Database["public"]["Enums"]["product_type"]
        }
        Update: {
          aa_exclude?: boolean | null
          created_at?: string
          features?: string | null
          name?: string
          row_id?: string
          stripe_id?: string | null
          type?: Database["public"]["Enums"]["product_type"]
        }
        Relationships: []
      }
      profiles: {
        Row: {
          church_name: string | null
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          church_name?: string | null
          created_at?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          church_name?: string | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      project_folders: {
        Row: {
          created_at: string
          id: string
          name: string | null
          path_display: string | null
          task_id: string
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
          path_display?: string | null
          task_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
          path_display?: string | null
          task_id?: string
        }
        Relationships: []
      }
      queued_log: {
        Row: {
          account: number | null
          active_tasks: number | null
          cap: number | null
          created_at: string
          current_queued_count: number | null
          name: string | null
          queue_num: number | null
          room: number | null
          row_id: string
          task_created: string | null
          task_id: string
        }
        Insert: {
          account?: number | null
          active_tasks?: number | null
          cap?: number | null
          created_at?: string
          current_queued_count?: number | null
          name?: string | null
          queue_num?: number | null
          room?: number | null
          row_id?: string
          task_created?: string | null
          task_id: string
        }
        Update: {
          account?: number | null
          active_tasks?: number | null
          cap?: number | null
          created_at?: string
          current_queued_count?: number | null
          name?: string | null
          queue_num?: number | null
          room?: number | null
          row_id?: string
          task_created?: string | null
          task_id?: string
        }
        Relationships: []
      }
      redirects: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          param_config: Json | null
          param_name: string | null
          param_type: string | null
          source_path: string
          target_url: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          param_config?: Json | null
          param_name?: string | null
          param_type?: string | null
          source_path: string
          target_url: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          param_config?: Json | null
          param_name?: string | null
          param_type?: string | null
          source_path?: string
          target_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      remix_library: {
        Row: {
          assets: string[] | null
          colors: string[] | null
          created_at: string
          description: string | null
          file_name: string | null
          id: string
          name: string | null
          theme: string | null
          url: string | null
          wcid: number | null
        }
        Insert: {
          assets?: string[] | null
          colors?: string[] | null
          created_at?: string
          description?: string | null
          file_name?: string | null
          id: string
          name?: string | null
          theme?: string | null
          url?: string | null
          wcid?: number | null
        }
        Update: {
          assets?: string[] | null
          colors?: string[] | null
          created_at?: string
          description?: string | null
          file_name?: string | null
          id?: string
          name?: string | null
          theme?: string | null
          url?: string | null
          wcid?: number | null
        }
        Relationships: []
      }
      remix_orders: {
        Row: {
          billing_address_1: string | null
          billing_address_2: string | null
          billing_church_name: string | null
          billing_church_size: string | null
          billing_church_website: string | null
          billing_city: string | null
          billing_company: string | null
          billing_country: string | null
          billing_current_role: string | null
          billing_email: string | null
          billing_first_name: string | null
          billing_last_name: string | null
          billing_phone: string | null
          billing_postcode: string | null
          billing_state: string | null
          billing_work_for_church: string | null
          cart_hash: string | null
          cart_tax: number | null
          coupon_lines: string | null
          created_via: string | null
          currency: string | null
          currency_symbol: string | null
          customer_id: number | null
          customer_ip_address: string | null
          customer_note: string | null
          customer_user_agent: string | null
          date_completed: string | null
          date_completed_gmt: string | null
          date_created: string | null
          date_created_gmt: string | null
          date_modified: string | null
          date_modified_gmt: string | null
          date_paid: string | null
          date_paid_gmt: string | null
          discount_tax: number | null
          discount_total: number | null
          fee_lines: string | null
          id: number
          is_editable: boolean | null
          line_items: string | null
          meta_data: string | null
          needs_payment: boolean | null
          needs_processing: boolean | null
          number: string | null
          order_key: string | null
          parent_id: number | null
          payment_method: string | null
          payment_method_title: string | null
          payment_url: string | null
          prices_include_tax: boolean | null
          refunds: string | null
          shipping_address_1: string | null
          shipping_address_2: string | null
          shipping_city: string | null
          shipping_company: string | null
          shipping_country: string | null
          shipping_first_name: string | null
          shipping_last_name: string | null
          shipping_lines: string | null
          shipping_phone: string | null
          shipping_postcode: string | null
          shipping_state: string | null
          shipping_tax: number | null
          shipping_total: number | null
          status: string | null
          tax_lines: string | null
          total: number | null
          total_tax: number | null
          transaction_id: string | null
          version: string | null
        }
        Insert: {
          billing_address_1?: string | null
          billing_address_2?: string | null
          billing_church_name?: string | null
          billing_church_size?: string | null
          billing_church_website?: string | null
          billing_city?: string | null
          billing_company?: string | null
          billing_country?: string | null
          billing_current_role?: string | null
          billing_email?: string | null
          billing_first_name?: string | null
          billing_last_name?: string | null
          billing_phone?: string | null
          billing_postcode?: string | null
          billing_state?: string | null
          billing_work_for_church?: string | null
          cart_hash?: string | null
          cart_tax?: number | null
          coupon_lines?: string | null
          created_via?: string | null
          currency?: string | null
          currency_symbol?: string | null
          customer_id?: number | null
          customer_ip_address?: string | null
          customer_note?: string | null
          customer_user_agent?: string | null
          date_completed?: string | null
          date_completed_gmt?: string | null
          date_created?: string | null
          date_created_gmt?: string | null
          date_modified?: string | null
          date_modified_gmt?: string | null
          date_paid?: string | null
          date_paid_gmt?: string | null
          discount_tax?: number | null
          discount_total?: number | null
          fee_lines?: string | null
          id: number
          is_editable?: boolean | null
          line_items?: string | null
          meta_data?: string | null
          needs_payment?: boolean | null
          needs_processing?: boolean | null
          number?: string | null
          order_key?: string | null
          parent_id?: number | null
          payment_method?: string | null
          payment_method_title?: string | null
          payment_url?: string | null
          prices_include_tax?: boolean | null
          refunds?: string | null
          shipping_address_1?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_company?: string | null
          shipping_country?: string | null
          shipping_first_name?: string | null
          shipping_last_name?: string | null
          shipping_lines?: string | null
          shipping_phone?: string | null
          shipping_postcode?: string | null
          shipping_state?: string | null
          shipping_tax?: number | null
          shipping_total?: number | null
          status?: string | null
          tax_lines?: string | null
          total?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          version?: string | null
        }
        Update: {
          billing_address_1?: string | null
          billing_address_2?: string | null
          billing_church_name?: string | null
          billing_church_size?: string | null
          billing_church_website?: string | null
          billing_city?: string | null
          billing_company?: string | null
          billing_country?: string | null
          billing_current_role?: string | null
          billing_email?: string | null
          billing_first_name?: string | null
          billing_last_name?: string | null
          billing_phone?: string | null
          billing_postcode?: string | null
          billing_state?: string | null
          billing_work_for_church?: string | null
          cart_hash?: string | null
          cart_tax?: number | null
          coupon_lines?: string | null
          created_via?: string | null
          currency?: string | null
          currency_symbol?: string | null
          customer_id?: number | null
          customer_ip_address?: string | null
          customer_note?: string | null
          customer_user_agent?: string | null
          date_completed?: string | null
          date_completed_gmt?: string | null
          date_created?: string | null
          date_created_gmt?: string | null
          date_modified?: string | null
          date_modified_gmt?: string | null
          date_paid?: string | null
          date_paid_gmt?: string | null
          discount_tax?: number | null
          discount_total?: number | null
          fee_lines?: string | null
          id?: number
          is_editable?: boolean | null
          line_items?: string | null
          meta_data?: string | null
          needs_payment?: boolean | null
          needs_processing?: boolean | null
          number?: string | null
          order_key?: string | null
          parent_id?: number | null
          payment_method?: string | null
          payment_method_title?: string | null
          payment_url?: string | null
          prices_include_tax?: boolean | null
          refunds?: string | null
          shipping_address_1?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_company?: string | null
          shipping_country?: string | null
          shipping_first_name?: string | null
          shipping_last_name?: string | null
          shipping_lines?: string | null
          shipping_phone?: string | null
          shipping_postcode?: string | null
          shipping_state?: string | null
          shipping_tax?: number | null
          shipping_total?: number | null
          status?: string | null
          tax_lines?: string | null
          total?: number | null
          total_tax?: number | null
          transaction_id?: string | null
          version?: string | null
        }
        Relationships: []
      }
      remix_products: {
        Row: {
          attributes: Json | null
          average_rating: number | null
          backordered: boolean | null
          backorders: string | null
          backorders_allowed: boolean | null
          catalog_visibility: string | null
          categories: Json | null
          created_at: string | null
          cross_sell_ids: Json | null
          date_created: string | null
          date_modified: string | null
          default_attributes: Json | null
          description: string | null
          dimensions: Json | null
          download_expiry: number | null
          download_limit: number | null
          downloadable: boolean | null
          downloads: Json | null
          featured: boolean | null
          grouped_products: Json | null
          id: number
          images: Json | null
          manage_stock: boolean | null
          menu_order: number | null
          meta_data: Json | null
          name: string
          on_sale: boolean | null
          parent_id: number | null
          price: number | null
          purchasable: boolean | null
          purchase_note: string | null
          rating_count: number | null
          regular_price: number | null
          related_ids: Json | null
          reviews_allowed: boolean | null
          sale_price: number | null
          shipping_class: string | null
          shipping_class_id: number | null
          shipping_required: boolean | null
          shipping_taxable: boolean | null
          short_description: string | null
          sku: string | null
          slug: string | null
          sold_individually: boolean | null
          status: string | null
          stock_quantity: number | null
          stock_status: string | null
          tags: Json | null
          tax_class: string | null
          tax_status: string | null
          total_sales: number | null
          type: string | null
          updated_at: string | null
          upsell_ids: Json | null
          variations: Json | null
          virtual: boolean | null
          weight: string | null
        }
        Insert: {
          attributes?: Json | null
          average_rating?: number | null
          backordered?: boolean | null
          backorders?: string | null
          backorders_allowed?: boolean | null
          catalog_visibility?: string | null
          categories?: Json | null
          created_at?: string | null
          cross_sell_ids?: Json | null
          date_created?: string | null
          date_modified?: string | null
          default_attributes?: Json | null
          description?: string | null
          dimensions?: Json | null
          download_expiry?: number | null
          download_limit?: number | null
          downloadable?: boolean | null
          downloads?: Json | null
          featured?: boolean | null
          grouped_products?: Json | null
          id: number
          images?: Json | null
          manage_stock?: boolean | null
          menu_order?: number | null
          meta_data?: Json | null
          name: string
          on_sale?: boolean | null
          parent_id?: number | null
          price?: number | null
          purchasable?: boolean | null
          purchase_note?: string | null
          rating_count?: number | null
          regular_price?: number | null
          related_ids?: Json | null
          reviews_allowed?: boolean | null
          sale_price?: number | null
          shipping_class?: string | null
          shipping_class_id?: number | null
          shipping_required?: boolean | null
          shipping_taxable?: boolean | null
          short_description?: string | null
          sku?: string | null
          slug?: string | null
          sold_individually?: boolean | null
          status?: string | null
          stock_quantity?: number | null
          stock_status?: string | null
          tags?: Json | null
          tax_class?: string | null
          tax_status?: string | null
          total_sales?: number | null
          type?: string | null
          updated_at?: string | null
          upsell_ids?: Json | null
          variations?: Json | null
          virtual?: boolean | null
          weight?: string | null
        }
        Update: {
          attributes?: Json | null
          average_rating?: number | null
          backordered?: boolean | null
          backorders?: string | null
          backorders_allowed?: boolean | null
          catalog_visibility?: string | null
          categories?: Json | null
          created_at?: string | null
          cross_sell_ids?: Json | null
          date_created?: string | null
          date_modified?: string | null
          default_attributes?: Json | null
          description?: string | null
          dimensions?: Json | null
          download_expiry?: number | null
          download_limit?: number | null
          downloadable?: boolean | null
          downloads?: Json | null
          featured?: boolean | null
          grouped_products?: Json | null
          id?: number
          images?: Json | null
          manage_stock?: boolean | null
          menu_order?: number | null
          meta_data?: Json | null
          name?: string
          on_sale?: boolean | null
          parent_id?: number | null
          price?: number | null
          purchasable?: boolean | null
          purchase_note?: string | null
          rating_count?: number | null
          regular_price?: number | null
          related_ids?: Json | null
          reviews_allowed?: boolean | null
          sale_price?: number | null
          shipping_class?: string | null
          shipping_class_id?: number | null
          shipping_required?: boolean | null
          shipping_taxable?: boolean | null
          short_description?: string | null
          sku?: string | null
          slug?: string | null
          sold_individually?: boolean | null
          status?: string | null
          stock_quantity?: number | null
          stock_status?: string | null
          tags?: Json | null
          tax_class?: string | null
          tax_status?: string | null
          total_sales?: number | null
          type?: string | null
          updated_at?: string | null
          upsell_ids?: Json | null
          variations?: Json | null
          virtual?: boolean | null
          weight?: string | null
        }
        Relationships: []
      }
      remix_subscriptions: {
        Row: {
          customer: number | null
          monthly_cost: number | null
          order_date: string | null
          order_id: number | null
          product_id: number | null
          product_variation_id: number | null
          row_created: string
          row_updated: string | null
          status: string | null
          subscription_cancalled_date: string | null
          subscription_expired_date: string | null
          subscription_id: number
          subscription_interval: string | null
          subscription_renewal_date: string | null
          subscription_start: string | null
        }
        Insert: {
          customer?: number | null
          monthly_cost?: number | null
          order_date?: string | null
          order_id?: number | null
          product_id?: number | null
          product_variation_id?: number | null
          row_created?: string
          row_updated?: string | null
          status?: string | null
          subscription_cancalled_date?: string | null
          subscription_expired_date?: string | null
          subscription_id?: number
          subscription_interval?: string | null
          subscription_renewal_date?: string | null
          subscription_start?: string | null
        }
        Update: {
          customer?: number | null
          monthly_cost?: number | null
          order_date?: string | null
          order_id?: number | null
          product_id?: number | null
          product_variation_id?: number | null
          row_created?: string
          row_updated?: string | null
          status?: string | null
          subscription_cancalled_date?: string | null
          subscription_expired_date?: string | null
          subscription_id?: number
          subscription_interval?: string | null
          subscription_renewal_date?: string | null
          subscription_start?: string | null
        }
        Relationships: []
      }
      remix_users: {
        Row: {
          _application_passwords: string | null
          _asenha_viewing_admin_as: string | null
          _bwfan_header_notification: string | null
          _church_name: string | null
          "_links.collection.0.href": string | null
          "_links.self.0.href": string | null
          _order_count: string | null
          _woocommerce_persistent_cart_1: string | null
          _woocommerce_tracks_anon_id: string | null
          acf_user_settings: string | null
          additional_profile_urls: string | null
          admin_color: string | null
          asenha_last_login_on: string | null
          "avatar_urls.24": string | null
          "avatar_urls.48": string | null
          "avatar_urls.96": string | null
          billing_address_1: string | null
          billing_address_2: string | null
          billing_church_name: string | null
          billing_church_size: string | null
          billing_church_website: string | null
          billing_city: string | null
          billing_company: string | null
          billing_country: string | null
          billing_email: string | null
          billing_first_name: string | null
          billing_information: string | null
          billing_last_name: string | null
          billing_password: string | null
          billing_phone: string | null
          billing_postcode: string | null
          billing_state: string | null
          billing_what_is_your_average_weekly_attendance: number | null
          billing_your_church_name: string | null
          billing_your_church_website: string | null
          church_name: string | null
          closedpostboxes_acf_taxonomy: string | null
          closedpostboxes_asenha_code_snippet: string | null
          closedpostboxes_bricks_template: string | null
          closedpostboxes_dashboard: string | null
          closedpostboxes_page: string | null
          closedpostboxes_product: string | null
          closedpostboxes_yith_wcmbs_plan: string | null
          comment_shortcuts: boolean | null
          community_events_location: string | null
          default_password_nag: string | null
          description: string | null
          dismissed_redirect_download_method_notice: string | null
          dismissed_template_files_notice: string | null
          dismissed_wp_pointers: string | null
          dismissed_ywsbs_staging_notice: string | null
          edit_acf_ui_options_page_per_page: number | null
          edit_bricks_template_per_page: number | null
          edit_product_cat_per_page: number | null
          edit_product_per_page: number | null
          edit_product_tag_per_page: number | null
          facebook: string | null
          happyfiles_open_ids: string | null
          id: number
          is_super_admin: boolean | null
          jetpack_tracks_anon_id: string | null
          jetpack_tracks_wpcom_id: string | null
          last_update: number | null
          link: string | null
          manageedit_acf_post_typecolumnshidden: string | null
          manageedit_acf_taxonomycolumnshidden: string | null
          manageedit_acf_ui_options_pagecolumnshidden: string | null
          manageedit_bricks_templatecolumnshidden: string | null
          manageedit_bricks_templatecolumnshidden_default: string | null
          manageedit_inspire_invoicecolumnshidden: string | null
          manageedit_pagecolumnshidden: string | null
          manageedit_pagecolumnshidden_default: string | null
          manageedit_postcolumnshidden: string | null
          manageedit_postcolumnshidden_default: string | null
          manageedit_productcolumnshidden: string | null
          manageedit_productcolumnshidden_default: string | null
          manageedit_shop_ordercolumnshidden: string | null
          manageedit_yaymail_templatecolumnshidden: string | null
          manageedit_yaymail_templatecolumnshidden_default: string | null
          managenav_menuscolumnshidden: string | null
          meta_box_order_bricks_template: string | null
          meta_box_order_dashboard: string | null
          meta_box_order_page: string | null
          meta_box_order_post: string | null
          meta_box_order_product: string | null
          "meta.billing_address_1": string | null
          "meta.billing_address_2": string | null
          "meta.billing_church_name": string | null
          "meta.billing_church_size": string | null
          "meta.billing_church_website": string | null
          "meta.billing_city": string | null
          "meta.billing_company": string | null
          "meta.billing_country": string | null
          "meta.billing_email": string | null
          "meta.billing_first_name": string | null
          "meta.billing_last_name": string | null
          "meta.billing_postcode": string | null
          "meta.billing_state": string | null
          "meta.billing_what_is_your_average_weekly_attendance": number | null
          "meta.billing_your_church_name": string | null
          "meta.billing_your_church_website": string | null
          "meta.church_name": string | null
          metaboxhidden_acf_taxonomy: string | null
          metaboxhidden_asenha_code_snippet: string | null
          metaboxhidden_bricks_template: string | null
          metaboxhidden_dashboard: string | null
          metaboxhidden_nav_menus: string | null
          metaboxhidden_page: string | null
          metaboxhidden_product: string | null
          metaboxhidden_yith_wcmbs_plan: string | null
          my_jetpack_cache: string | null
          my_jetpack_cache_date: string | null
          name: string | null
          nav_menu_recently_edited: string | null
          paying_customer: string | null
          protect_cache: string | null
          protect_cache_date: string | null
          rich_editing: boolean | null
          screen_layout_dashboard: number | null
          screen_layout_inspire_invoice: number | null
          screen_layout_product: number | null
          searchwp_settings_view_config: string | null
          seedprod_personalization_preferences: string | null
          session_tokens: Json | null
          shipping_address_1: string | null
          shipping_address_2: string | null
          shipping_city: string | null
          shipping_company: string | null
          shipping_country: string | null
          shipping_first_name: string | null
          shipping_last_name: string | null
          shipping_method: string | null
          shipping_phone: string | null
          shipping_postcode: string | null
          shipping_state: string | null
          show_admin_bar_front: boolean | null
          show_welcome_panel: string | null
          slug: string | null
          syntax_highlighting: boolean | null
          twitter: string | null
          uip_prefs: string | null
          url: string | null
          use_ssl: number | null
          videopress_cache: string | null
          videopress_cache_date: string | null
          wc_last_active: number | null
          "woocommerce_meta.activity_panel_inbox_last_read": string | null
          "woocommerce_meta.activity_panel_reviews_last_read": string | null
          "woocommerce_meta.android_app_banner_dismissed": string | null
          "woocommerce_meta.categories_report_columns": string | null
          "woocommerce_meta.coming_soon_banner_dismissed": string | null
          "woocommerce_meta.coupons_report_columns": string | null
          "woocommerce_meta.customers_report_columns": string | null
          "woocommerce_meta.dashboard_chart_interval": string | null
          "woocommerce_meta.dashboard_chart_type": string | null
          "woocommerce_meta.dashboard_leaderboard_rows": string | null
          "woocommerce_meta.dashboard_sections": string | null
          "woocommerce_meta.homepage_layout": string | null
          "woocommerce_meta.homepage_stats": string | null
          "woocommerce_meta.launch_your_store_tour_hidden": string | null
          "woocommerce_meta.orders_report_columns": string | null
          "woocommerce_meta.products_report_columns": string | null
          "woocommerce_meta.revenue_report_columns": string | null
          "woocommerce_meta.task_list_tracked_started_tasks": string | null
          "woocommerce_meta.taxes_report_columns": string | null
          "woocommerce_meta.variable_product_tour_shown": string | null
          "woocommerce_meta.variations_report_columns": string | null
          wp_asenha_media_order: string | null
          wp_asenha_media_orderby: string | null
          "wp_capabilities.all_access": string | null
          "wp_capabilities.all_access_sqd": string | null
          "wp_capabilities.customer": string | null
          wp_media_library_mode: string | null
          wp_persisted_preferences: string | null
          wp_product_import_error_log: string | null
          wp_stripe_customer_id: string | null
          wp_user_level: number | null
          wp_user_settings: string | null
          wp_user_settings_time: string | null
          wp_wcpay_customer_id_test: string | null
          wp_woocommerce_product_import_mapping: string | null
          yaymail_default_email_test: string | null
          ywsbs_subscription_ids: string | null
        }
        Insert: {
          _application_passwords?: string | null
          _asenha_viewing_admin_as?: string | null
          _bwfan_header_notification?: string | null
          _church_name?: string | null
          "_links.collection.0.href"?: string | null
          "_links.self.0.href"?: string | null
          _order_count?: string | null
          _woocommerce_persistent_cart_1?: string | null
          _woocommerce_tracks_anon_id?: string | null
          acf_user_settings?: string | null
          additional_profile_urls?: string | null
          admin_color?: string | null
          asenha_last_login_on?: string | null
          "avatar_urls.24"?: string | null
          "avatar_urls.48"?: string | null
          "avatar_urls.96"?: string | null
          billing_address_1?: string | null
          billing_address_2?: string | null
          billing_church_name?: string | null
          billing_church_size?: string | null
          billing_church_website?: string | null
          billing_city?: string | null
          billing_company?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_first_name?: string | null
          billing_information?: string | null
          billing_last_name?: string | null
          billing_password?: string | null
          billing_phone?: string | null
          billing_postcode?: string | null
          billing_state?: string | null
          billing_what_is_your_average_weekly_attendance?: number | null
          billing_your_church_name?: string | null
          billing_your_church_website?: string | null
          church_name?: string | null
          closedpostboxes_acf_taxonomy?: string | null
          closedpostboxes_asenha_code_snippet?: string | null
          closedpostboxes_bricks_template?: string | null
          closedpostboxes_dashboard?: string | null
          closedpostboxes_page?: string | null
          closedpostboxes_product?: string | null
          closedpostboxes_yith_wcmbs_plan?: string | null
          comment_shortcuts?: boolean | null
          community_events_location?: string | null
          default_password_nag?: string | null
          description?: string | null
          dismissed_redirect_download_method_notice?: string | null
          dismissed_template_files_notice?: string | null
          dismissed_wp_pointers?: string | null
          dismissed_ywsbs_staging_notice?: string | null
          edit_acf_ui_options_page_per_page?: number | null
          edit_bricks_template_per_page?: number | null
          edit_product_cat_per_page?: number | null
          edit_product_per_page?: number | null
          edit_product_tag_per_page?: number | null
          facebook?: string | null
          happyfiles_open_ids?: string | null
          id: number
          is_super_admin?: boolean | null
          jetpack_tracks_anon_id?: string | null
          jetpack_tracks_wpcom_id?: string | null
          last_update?: number | null
          link?: string | null
          manageedit_acf_post_typecolumnshidden?: string | null
          manageedit_acf_taxonomycolumnshidden?: string | null
          manageedit_acf_ui_options_pagecolumnshidden?: string | null
          manageedit_bricks_templatecolumnshidden?: string | null
          manageedit_bricks_templatecolumnshidden_default?: string | null
          manageedit_inspire_invoicecolumnshidden?: string | null
          manageedit_pagecolumnshidden?: string | null
          manageedit_pagecolumnshidden_default?: string | null
          manageedit_postcolumnshidden?: string | null
          manageedit_postcolumnshidden_default?: string | null
          manageedit_productcolumnshidden?: string | null
          manageedit_productcolumnshidden_default?: string | null
          manageedit_shop_ordercolumnshidden?: string | null
          manageedit_yaymail_templatecolumnshidden?: string | null
          manageedit_yaymail_templatecolumnshidden_default?: string | null
          managenav_menuscolumnshidden?: string | null
          meta_box_order_bricks_template?: string | null
          meta_box_order_dashboard?: string | null
          meta_box_order_page?: string | null
          meta_box_order_post?: string | null
          meta_box_order_product?: string | null
          "meta.billing_address_1"?: string | null
          "meta.billing_address_2"?: string | null
          "meta.billing_church_name"?: string | null
          "meta.billing_church_size"?: string | null
          "meta.billing_church_website"?: string | null
          "meta.billing_city"?: string | null
          "meta.billing_company"?: string | null
          "meta.billing_country"?: string | null
          "meta.billing_email"?: string | null
          "meta.billing_first_name"?: string | null
          "meta.billing_last_name"?: string | null
          "meta.billing_postcode"?: string | null
          "meta.billing_state"?: string | null
          "meta.billing_what_is_your_average_weekly_attendance"?: number | null
          "meta.billing_your_church_name"?: string | null
          "meta.billing_your_church_website"?: string | null
          "meta.church_name"?: string | null
          metaboxhidden_acf_taxonomy?: string | null
          metaboxhidden_asenha_code_snippet?: string | null
          metaboxhidden_bricks_template?: string | null
          metaboxhidden_dashboard?: string | null
          metaboxhidden_nav_menus?: string | null
          metaboxhidden_page?: string | null
          metaboxhidden_product?: string | null
          metaboxhidden_yith_wcmbs_plan?: string | null
          my_jetpack_cache?: string | null
          my_jetpack_cache_date?: string | null
          name?: string | null
          nav_menu_recently_edited?: string | null
          paying_customer?: string | null
          protect_cache?: string | null
          protect_cache_date?: string | null
          rich_editing?: boolean | null
          screen_layout_dashboard?: number | null
          screen_layout_inspire_invoice?: number | null
          screen_layout_product?: number | null
          searchwp_settings_view_config?: string | null
          seedprod_personalization_preferences?: string | null
          session_tokens?: Json | null
          shipping_address_1?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_company?: string | null
          shipping_country?: string | null
          shipping_first_name?: string | null
          shipping_last_name?: string | null
          shipping_method?: string | null
          shipping_phone?: string | null
          shipping_postcode?: string | null
          shipping_state?: string | null
          show_admin_bar_front?: boolean | null
          show_welcome_panel?: string | null
          slug?: string | null
          syntax_highlighting?: boolean | null
          twitter?: string | null
          uip_prefs?: string | null
          url?: string | null
          use_ssl?: number | null
          videopress_cache?: string | null
          videopress_cache_date?: string | null
          wc_last_active?: number | null
          "woocommerce_meta.activity_panel_inbox_last_read"?: string | null
          "woocommerce_meta.activity_panel_reviews_last_read"?: string | null
          "woocommerce_meta.android_app_banner_dismissed"?: string | null
          "woocommerce_meta.categories_report_columns"?: string | null
          "woocommerce_meta.coming_soon_banner_dismissed"?: string | null
          "woocommerce_meta.coupons_report_columns"?: string | null
          "woocommerce_meta.customers_report_columns"?: string | null
          "woocommerce_meta.dashboard_chart_interval"?: string | null
          "woocommerce_meta.dashboard_chart_type"?: string | null
          "woocommerce_meta.dashboard_leaderboard_rows"?: string | null
          "woocommerce_meta.dashboard_sections"?: string | null
          "woocommerce_meta.homepage_layout"?: string | null
          "woocommerce_meta.homepage_stats"?: string | null
          "woocommerce_meta.launch_your_store_tour_hidden"?: string | null
          "woocommerce_meta.orders_report_columns"?: string | null
          "woocommerce_meta.products_report_columns"?: string | null
          "woocommerce_meta.revenue_report_columns"?: string | null
          "woocommerce_meta.task_list_tracked_started_tasks"?: string | null
          "woocommerce_meta.taxes_report_columns"?: string | null
          "woocommerce_meta.variable_product_tour_shown"?: string | null
          "woocommerce_meta.variations_report_columns"?: string | null
          wp_asenha_media_order?: string | null
          wp_asenha_media_orderby?: string | null
          "wp_capabilities.all_access"?: string | null
          "wp_capabilities.all_access_sqd"?: string | null
          "wp_capabilities.customer"?: string | null
          wp_media_library_mode?: string | null
          wp_persisted_preferences?: string | null
          wp_product_import_error_log?: string | null
          wp_stripe_customer_id?: string | null
          wp_user_level?: number | null
          wp_user_settings?: string | null
          wp_user_settings_time?: string | null
          wp_wcpay_customer_id_test?: string | null
          wp_woocommerce_product_import_mapping?: string | null
          yaymail_default_email_test?: string | null
          ywsbs_subscription_ids?: string | null
        }
        Update: {
          _application_passwords?: string | null
          _asenha_viewing_admin_as?: string | null
          _bwfan_header_notification?: string | null
          _church_name?: string | null
          "_links.collection.0.href"?: string | null
          "_links.self.0.href"?: string | null
          _order_count?: string | null
          _woocommerce_persistent_cart_1?: string | null
          _woocommerce_tracks_anon_id?: string | null
          acf_user_settings?: string | null
          additional_profile_urls?: string | null
          admin_color?: string | null
          asenha_last_login_on?: string | null
          "avatar_urls.24"?: string | null
          "avatar_urls.48"?: string | null
          "avatar_urls.96"?: string | null
          billing_address_1?: string | null
          billing_address_2?: string | null
          billing_church_name?: string | null
          billing_church_size?: string | null
          billing_church_website?: string | null
          billing_city?: string | null
          billing_company?: string | null
          billing_country?: string | null
          billing_email?: string | null
          billing_first_name?: string | null
          billing_information?: string | null
          billing_last_name?: string | null
          billing_password?: string | null
          billing_phone?: string | null
          billing_postcode?: string | null
          billing_state?: string | null
          billing_what_is_your_average_weekly_attendance?: number | null
          billing_your_church_name?: string | null
          billing_your_church_website?: string | null
          church_name?: string | null
          closedpostboxes_acf_taxonomy?: string | null
          closedpostboxes_asenha_code_snippet?: string | null
          closedpostboxes_bricks_template?: string | null
          closedpostboxes_dashboard?: string | null
          closedpostboxes_page?: string | null
          closedpostboxes_product?: string | null
          closedpostboxes_yith_wcmbs_plan?: string | null
          comment_shortcuts?: boolean | null
          community_events_location?: string | null
          default_password_nag?: string | null
          description?: string | null
          dismissed_redirect_download_method_notice?: string | null
          dismissed_template_files_notice?: string | null
          dismissed_wp_pointers?: string | null
          dismissed_ywsbs_staging_notice?: string | null
          edit_acf_ui_options_page_per_page?: number | null
          edit_bricks_template_per_page?: number | null
          edit_product_cat_per_page?: number | null
          edit_product_per_page?: number | null
          edit_product_tag_per_page?: number | null
          facebook?: string | null
          happyfiles_open_ids?: string | null
          id?: number
          is_super_admin?: boolean | null
          jetpack_tracks_anon_id?: string | null
          jetpack_tracks_wpcom_id?: string | null
          last_update?: number | null
          link?: string | null
          manageedit_acf_post_typecolumnshidden?: string | null
          manageedit_acf_taxonomycolumnshidden?: string | null
          manageedit_acf_ui_options_pagecolumnshidden?: string | null
          manageedit_bricks_templatecolumnshidden?: string | null
          manageedit_bricks_templatecolumnshidden_default?: string | null
          manageedit_inspire_invoicecolumnshidden?: string | null
          manageedit_pagecolumnshidden?: string | null
          manageedit_pagecolumnshidden_default?: string | null
          manageedit_postcolumnshidden?: string | null
          manageedit_postcolumnshidden_default?: string | null
          manageedit_productcolumnshidden?: string | null
          manageedit_productcolumnshidden_default?: string | null
          manageedit_shop_ordercolumnshidden?: string | null
          manageedit_yaymail_templatecolumnshidden?: string | null
          manageedit_yaymail_templatecolumnshidden_default?: string | null
          managenav_menuscolumnshidden?: string | null
          meta_box_order_bricks_template?: string | null
          meta_box_order_dashboard?: string | null
          meta_box_order_page?: string | null
          meta_box_order_post?: string | null
          meta_box_order_product?: string | null
          "meta.billing_address_1"?: string | null
          "meta.billing_address_2"?: string | null
          "meta.billing_church_name"?: string | null
          "meta.billing_church_size"?: string | null
          "meta.billing_church_website"?: string | null
          "meta.billing_city"?: string | null
          "meta.billing_company"?: string | null
          "meta.billing_country"?: string | null
          "meta.billing_email"?: string | null
          "meta.billing_first_name"?: string | null
          "meta.billing_last_name"?: string | null
          "meta.billing_postcode"?: string | null
          "meta.billing_state"?: string | null
          "meta.billing_what_is_your_average_weekly_attendance"?: number | null
          "meta.billing_your_church_name"?: string | null
          "meta.billing_your_church_website"?: string | null
          "meta.church_name"?: string | null
          metaboxhidden_acf_taxonomy?: string | null
          metaboxhidden_asenha_code_snippet?: string | null
          metaboxhidden_bricks_template?: string | null
          metaboxhidden_dashboard?: string | null
          metaboxhidden_nav_menus?: string | null
          metaboxhidden_page?: string | null
          metaboxhidden_product?: string | null
          metaboxhidden_yith_wcmbs_plan?: string | null
          my_jetpack_cache?: string | null
          my_jetpack_cache_date?: string | null
          name?: string | null
          nav_menu_recently_edited?: string | null
          paying_customer?: string | null
          protect_cache?: string | null
          protect_cache_date?: string | null
          rich_editing?: boolean | null
          screen_layout_dashboard?: number | null
          screen_layout_inspire_invoice?: number | null
          screen_layout_product?: number | null
          searchwp_settings_view_config?: string | null
          seedprod_personalization_preferences?: string | null
          session_tokens?: Json | null
          shipping_address_1?: string | null
          shipping_address_2?: string | null
          shipping_city?: string | null
          shipping_company?: string | null
          shipping_country?: string | null
          shipping_first_name?: string | null
          shipping_last_name?: string | null
          shipping_method?: string | null
          shipping_phone?: string | null
          shipping_postcode?: string | null
          shipping_state?: string | null
          show_admin_bar_front?: boolean | null
          show_welcome_panel?: string | null
          slug?: string | null
          syntax_highlighting?: boolean | null
          twitter?: string | null
          uip_prefs?: string | null
          url?: string | null
          use_ssl?: number | null
          videopress_cache?: string | null
          videopress_cache_date?: string | null
          wc_last_active?: number | null
          "woocommerce_meta.activity_panel_inbox_last_read"?: string | null
          "woocommerce_meta.activity_panel_reviews_last_read"?: string | null
          "woocommerce_meta.android_app_banner_dismissed"?: string | null
          "woocommerce_meta.categories_report_columns"?: string | null
          "woocommerce_meta.coming_soon_banner_dismissed"?: string | null
          "woocommerce_meta.coupons_report_columns"?: string | null
          "woocommerce_meta.customers_report_columns"?: string | null
          "woocommerce_meta.dashboard_chart_interval"?: string | null
          "woocommerce_meta.dashboard_chart_type"?: string | null
          "woocommerce_meta.dashboard_leaderboard_rows"?: string | null
          "woocommerce_meta.dashboard_sections"?: string | null
          "woocommerce_meta.homepage_layout"?: string | null
          "woocommerce_meta.homepage_stats"?: string | null
          "woocommerce_meta.launch_your_store_tour_hidden"?: string | null
          "woocommerce_meta.orders_report_columns"?: string | null
          "woocommerce_meta.products_report_columns"?: string | null
          "woocommerce_meta.revenue_report_columns"?: string | null
          "woocommerce_meta.task_list_tracked_started_tasks"?: string | null
          "woocommerce_meta.taxes_report_columns"?: string | null
          "woocommerce_meta.variable_product_tour_shown"?: string | null
          "woocommerce_meta.variations_report_columns"?: string | null
          wp_asenha_media_order?: string | null
          wp_asenha_media_orderby?: string | null
          "wp_capabilities.all_access"?: string | null
          "wp_capabilities.all_access_sqd"?: string | null
          "wp_capabilities.customer"?: string | null
          wp_media_library_mode?: string | null
          wp_persisted_preferences?: string | null
          wp_product_import_error_log?: string | null
          wp_stripe_customer_id?: string | null
          wp_user_level?: number | null
          wp_user_settings?: string | null
          wp_user_settings_time?: string | null
          wp_wcpay_customer_id_test?: string | null
          wp_woocommerce_product_import_mapping?: string | null
          yaymail_default_email_test?: string | null
          ywsbs_subscription_ids?: string | null
        }
        Relationships: []
      }
      scheduling_blackouts: {
        Row: {
          created_at: string
          cut_off: string
          end_date: string
          reason: string
          row_id: string | null
          start_date: string
        }
        Insert: {
          created_at?: string
          cut_off: string
          end_date: string
          reason: string
          row_id?: string | null
          start_date: string
        }
        Update: {
          created_at?: string
          cut_off?: string
          end_date?: string
          reason?: string
          row_id?: string | null
          start_date?: string
        }
        Relationships: []
      }
      sis_n8n_logs: {
        Row: {
          created_at: string | null
          execution_id: string
          id: number
          response_data: Json | null
        }
        Insert: {
          created_at?: string | null
          execution_id: string
          id?: number
          response_data?: Json | null
        }
        Update: {
          created_at?: string | null
          execution_id?: string
          id?: number
          response_data?: Json | null
        }
        Relationships: []
      }
      sis_requests_logs: {
        Row: {
          created_at: string | null
          id: number
          raw_data: Json
        }
        Insert: {
          created_at?: string | null
          id?: number
          raw_data: Json
        }
        Update: {
          created_at?: string | null
          id?: number
          raw_data?: Json
        }
        Relationships: []
      }
      sis_workflows: {
        Row: {
          active: string | null
          created_at: string
          id: string
          last_udpated_at: string | null
          link: string | null
          name: string | null
          owner_cu_id: number | null
          owner_email: string | null
          platform: string | null
          server: string | null
          wing: string | null
        }
        Insert: {
          active?: string | null
          created_at: string
          id: string
          last_udpated_at?: string | null
          link?: string | null
          name?: string | null
          owner_cu_id?: number | null
          owner_email?: string | null
          platform?: string | null
          server?: string | null
          wing?: string | null
        }
        Update: {
          active?: string | null
          created_at?: string
          id?: string
          last_udpated_at?: string | null
          link?: string | null
          name?: string | null
          owner_cu_id?: number | null
          owner_email?: string | null
          platform?: string | null
          server?: string | null
          wing?: string | null
        }
        Relationships: []
      }
      sms_client_data: {
        Row: {
          account: number
          airtable_id: string | null
          airtable_raw_data: Json | null
          bible_translation: string | null
          created_at: string
          most_recent_sermon_recap: string | null
          notion_dashboard: Json | null
          notion_internal_notes: Json | null
          photos_link: string | null
          primary_sms_contact: string[] | null
          sermon_notes: string | null
          sms_db_id: string | null
          sms_db_link: string | null
          sms_notes: string | null
          updated_at: string | null
        }
        Insert: {
          account?: number
          airtable_id?: string | null
          airtable_raw_data?: Json | null
          bible_translation?: string | null
          created_at?: string
          most_recent_sermon_recap?: string | null
          notion_dashboard?: Json | null
          notion_internal_notes?: Json | null
          photos_link?: string | null
          primary_sms_contact?: string[] | null
          sermon_notes?: string | null
          sms_db_id?: string | null
          sms_db_link?: string | null
          sms_notes?: string | null
          updated_at?: string | null
        }
        Update: {
          account?: number
          airtable_id?: string | null
          airtable_raw_data?: Json | null
          bible_translation?: string | null
          created_at?: string
          most_recent_sermon_recap?: string | null
          notion_dashboard?: Json | null
          notion_internal_notes?: Json | null
          photos_link?: string | null
          primary_sms_contact?: string[] | null
          sermon_notes?: string | null
          sms_db_id?: string | null
          sms_db_link?: string | null
          sms_notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_client_data_bible_translation_fkey"
            columns: ["bible_translation"]
            isOneToOne: false
            referencedRelation: "bible_translations"
            referencedColumns: ["translation"]
          },
        ]
      }
      sms_coaches: {
        Row: {
          account: number
          coach_email: string
          created_at: string
          current: boolean | null
          row_id: string
          updated_at: string | null
        }
        Insert: {
          account: number
          coach_email: string
          created_at?: string
          current?: boolean | null
          row_id: string
          updated_at?: string | null
        }
        Update: {
          account?: number
          coach_email?: string
          created_at?: string
          current?: boolean | null
          row_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sms_sermon_recap: {
        Row: {
          account_at_id: string | null
          bg_music: string | null
          created_at: string
          deliverables: string | null
          design_link: string | null
          member_id: number | null
          series_title: string | null
          sermon_date: string | null
          speaker: string | null
          submission_id: string
          title: string | null
          user_email: string | null
        }
        Insert: {
          account_at_id?: string | null
          bg_music?: string | null
          created_at?: string
          deliverables?: string | null
          design_link?: string | null
          member_id?: number | null
          series_title?: string | null
          sermon_date?: string | null
          speaker?: string | null
          submission_id: string
          title?: string | null
          user_email?: string | null
        }
        Update: {
          account_at_id?: string | null
          bg_music?: string | null
          created_at?: string
          deliverables?: string | null
          design_link?: string | null
          member_id?: number | null
          series_title?: string | null
          sermon_date?: string | null
          speaker?: string | null
          submission_id?: string
          title?: string | null
          user_email?: string | null
        }
        Relationships: []
      }
      sms_task_content: {
        Row: {
          content: string | null
          submission_id: string
          task_id: string | null
        }
        Insert: {
          content?: string | null
          submission_id: string
          task_id?: string | null
        }
        Update: {
          content?: string | null
          submission_id?: string
          task_id?: string | null
        }
        Relationships: []
      }
      sms_video_files: {
        Row: {
          accountid: string | null
          clickup_task_id: string | null
          created_at: string
          dropbox_main_folder: string | null
          file_s3url: string | null
          formid: string | null
          moved_to_dropbox: boolean | null
          sermontitle: string | null
          slack_thread: string | null
          submissionid: string | null
          uuid: string
        }
        Insert: {
          accountid?: string | null
          clickup_task_id?: string | null
          created_at?: string
          dropbox_main_folder?: string | null
          file_s3url?: string | null
          formid?: string | null
          moved_to_dropbox?: boolean | null
          sermontitle?: string | null
          slack_thread?: string | null
          submissionid?: string | null
          uuid?: string
        }
        Update: {
          accountid?: string | null
          clickup_task_id?: string | null
          created_at?: string
          dropbox_main_folder?: string | null
          file_s3url?: string | null
          formid?: string | null
          moved_to_dropbox?: boolean | null
          sermontitle?: string | null
          slack_thread?: string | null
          submissionid?: string | null
          uuid?: string
        }
        Relationships: []
      }
      sms_vista_social: {
        Row: {
          account: number | null
          coach: string | null
          connected_date: string | null
          image: string | null
          link: string | null
          name: string | null
          platform: string | null
          profile_group: string | null
          row_id: string
          status: string | null
          username: string | null
        }
        Insert: {
          account?: number | null
          coach?: string | null
          connected_date?: string | null
          image?: string | null
          link?: string | null
          name?: string | null
          platform?: string | null
          profile_group?: string | null
          row_id?: string
          status?: string | null
          username?: string | null
        }
        Update: {
          account?: number | null
          coach?: string | null
          connected_date?: string | null
          image?: string | null
          link?: string | null
          name?: string | null
          platform?: string | null
          profile_group?: string | null
          row_id?: string
          status?: string | null
          username?: string | null
        }
        Relationships: []
      }
      sqd_email_templates: {
        Row: {
          created_at: string
          department: string | null
          html_content: string | null
          id: string
          is_global: boolean | null
          subject_line: string | null
          text_content: string | null
          title: string | null
          updated_at: string | null
          variables: string[] | null
        }
        Insert: {
          created_at?: string
          department?: string | null
          html_content?: string | null
          id?: string
          is_global?: boolean | null
          subject_line?: string | null
          text_content?: string | null
          title?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Update: {
          created_at?: string
          department?: string | null
          html_content?: string | null
          id?: string
          is_global?: boolean | null
          subject_line?: string | null
          text_content?: string | null
          title?: string | null
          updated_at?: string | null
          variables?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "sqd_email_templates_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      stats_turnaround_times: {
        Row: {
          avg_wait_business_days: number | null
          avg_wait_days: number | null
          avg_wait_days_queued: number | null
          department: string | null
          median_wait_business_days: number | null
          median_wait_days: number | null
          selected_date: string | null
          task_count: number | null
        }
        Insert: {
          avg_wait_business_days?: number | null
          avg_wait_days?: number | null
          avg_wait_days_queued?: number | null
          department?: string | null
          median_wait_business_days?: number | null
          median_wait_days?: number | null
          selected_date?: string | null
          task_count?: number | null
        }
        Update: {
          avg_wait_business_days?: number | null
          avg_wait_days?: number | null
          avg_wait_days_queued?: number | null
          department?: string | null
          median_wait_business_days?: number | null
          median_wait_days?: number | null
          selected_date?: string | null
          task_count?: number | null
        }
        Relationships: []
      }
      status_history: {
        Row: {
          change_id: string | null
          changed_at: string
          changed_by: string
          row_id: string
          status_after: string | null
          status_before: string | null
          task_id: string
          temp_airtable_update_ran: string | null
          temp_airtable_updated: string | null
        }
        Insert: {
          change_id?: string | null
          changed_at?: string
          changed_by: string
          row_id?: string
          status_after?: string | null
          status_before?: string | null
          task_id: string
          temp_airtable_update_ran?: string | null
          temp_airtable_updated?: string | null
        }
        Update: {
          change_id?: string | null
          changed_at?: string
          changed_by?: string
          row_id?: string
          status_after?: string | null
          status_before?: string | null
          task_id?: string
          temp_airtable_update_ran?: string | null
          temp_airtable_updated?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "status_history_status_after_fkey"
            columns: ["status_after"]
            isOneToOne: false
            referencedRelation: "clickup_statuses"
            referencedColumns: ["status"]
          },
          {
            foreignKeyName: "status_history_status_before_fkey"
            columns: ["status_before"]
            isOneToOne: false
            referencedRelation: "clickup_statuses"
            referencedColumns: ["status"]
          },
        ]
      }
      stripe_coupons: {
        Row: {
          amount_off: number | null
          created_at: string
          currency: string | null
          duration: string
          duration_in_months: number | null
          id: number
          max_redemptions: number | null
          name: string | null
          percent_off: number | null
          raw_data: Json | null
          stripe_coupon_id: string
          times_redeemed: number | null
          valid: boolean | null
        }
        Insert: {
          amount_off?: number | null
          created_at?: string
          currency?: string | null
          duration: string
          duration_in_months?: number | null
          id?: never
          max_redemptions?: number | null
          name?: string | null
          percent_off?: number | null
          raw_data?: Json | null
          stripe_coupon_id: string
          times_redeemed?: number | null
          valid?: boolean | null
        }
        Update: {
          amount_off?: number | null
          created_at?: string
          currency?: string | null
          duration?: string
          duration_in_months?: number | null
          id?: never
          max_redemptions?: number | null
          name?: string | null
          percent_off?: number | null
          raw_data?: Json | null
          stripe_coupon_id?: string
          times_redeemed?: number | null
          valid?: boolean | null
        }
        Relationships: []
      }
      stripe_customer_history: {
        Row: {
          email: string | null
          id: number
          metadata: Json | null
          name: string | null
          raw_data: Json | null
          recorded_at: string | null
          stripe_customer_id: string
        }
        Insert: {
          email?: string | null
          id?: never
          metadata?: Json | null
          name?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          stripe_customer_id: string
        }
        Update: {
          email?: string | null
          id?: never
          metadata?: Json | null
          name?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          stripe_customer_id?: string
        }
        Relationships: []
      }
      stripe_customers: {
        Row: {
          address: Json | null
          created_at: string
          default_payment_method: string | null
          email: string
          id: number
          metadata: Json | null
          name: string | null
          phone: string | null
          raw_data: Json | null
          stripe_customer_id: string
        }
        Insert: {
          address?: Json | null
          created_at?: string
          default_payment_method?: string | null
          email: string
          id?: never
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          raw_data?: Json | null
          stripe_customer_id: string
        }
        Update: {
          address?: Json | null
          created_at?: string
          default_payment_method?: string | null
          email?: string
          id?: never
          metadata?: Json | null
          name?: string | null
          phone?: string | null
          raw_data?: Json | null
          stripe_customer_id?: string
        }
        Relationships: []
      }
      stripe_invoices: {
        Row: {
          amount_due: number | null
          amount_paid: number | null
          created_at: string
          currency: string
          customer_id: string | null
          due_date: string | null
          id: number
          invoice_pdf: string | null
          paid_at: string | null
          raw_data: Json | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: string | null
          subtotal: number | null
          total: number | null
        }
        Insert: {
          amount_due?: number | null
          amount_paid?: number | null
          created_at?: string
          currency: string
          customer_id?: string | null
          due_date?: string | null
          id?: never
          invoice_pdf?: string | null
          paid_at?: string | null
          raw_data?: Json | null
          status: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          subtotal?: number | null
          total?: number | null
        }
        Update: {
          amount_due?: number | null
          amount_paid?: number | null
          created_at?: string
          currency?: string
          customer_id?: string | null
          due_date?: string | null
          id?: never
          invoice_pdf?: string | null
          paid_at?: string | null
          raw_data?: Json | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          subtotal?: number | null
          total?: number | null
        }
        Relationships: []
      }
      stripe_prices: {
        Row: {
          billing_scheme: string | null
          created_at: string
          currency: string
          id: number
          metadata: Json | null
          nickname: string | null
          product_id: string | null
          raw_data: Json | null
          recurring_interval: string | null
          recurring_usage_type: string | null
          stripe_price_id: string
          unit_amount: number
        }
        Insert: {
          billing_scheme?: string | null
          created_at?: string
          currency: string
          id?: never
          metadata?: Json | null
          nickname?: string | null
          product_id?: string | null
          raw_data?: Json | null
          recurring_interval?: string | null
          recurring_usage_type?: string | null
          stripe_price_id: string
          unit_amount: number
        }
        Update: {
          billing_scheme?: string | null
          created_at?: string
          currency?: string
          id?: never
          metadata?: Json | null
          nickname?: string | null
          product_id?: string | null
          raw_data?: Json | null
          recurring_interval?: string | null
          recurring_usage_type?: string | null
          stripe_price_id?: string
          unit_amount?: number
        }
        Relationships: []
      }
      stripe_product_history: {
        Row: {
          active: boolean | null
          description: string | null
          id: number
          images: string[] | null
          metadata: Json | null
          name: string | null
          raw_data: Json | null
          recorded_at: string | null
          statement_descriptor: string | null
          stripe_product_id: string
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id?: never
          images?: string[] | null
          metadata?: Json | null
          name?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          statement_descriptor?: string | null
          stripe_product_id: string
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: never
          images?: string[] | null
          metadata?: Json | null
          name?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          statement_descriptor?: string | null
          stripe_product_id?: string
        }
        Relationships: []
      }
      stripe_products: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          id: number
          images: string[] | null
          metadata: Json | null
          name: string
          raw_data: Json | null
          statement_descriptor: string | null
          stripe_product_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: never
          images?: string[] | null
          metadata?: Json | null
          name: string
          raw_data?: Json | null
          statement_descriptor?: string | null
          stripe_product_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          id?: never
          images?: string[] | null
          metadata?: Json | null
          name?: string
          raw_data?: Json | null
          statement_descriptor?: string | null
          stripe_product_id?: string
        }
        Relationships: []
      }
      stripe_subscription_history: {
        Row: {
          cancel_at: string | null
          canceled_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string | null
          id: number
          metadata: Json | null
          price_id: string | null
          raw_data: Json | null
          recorded_at: string | null
          status: string
          stripe_subscription_id: string
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: never
          metadata?: Json | null
          price_id?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          status: string
          stripe_subscription_id: string
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: never
          metadata?: Json | null
          price_id?: string | null
          raw_data?: Json | null
          recorded_at?: string | null
          status?: string
          stripe_subscription_id?: string
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: []
      }
      stripe_subscriptions: {
        Row: {
          cancel_at: string | null
          canceled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          customer_id: string | null
          id: number
          metadata: Json | null
          price_id: string | null
          raw_data: Json | null
          status: string
          stripe_subscription_id: string
          trial_end: string | null
          trial_start: string | null
        }
        Insert: {
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: never
          metadata?: Json | null
          price_id?: string | null
          raw_data?: Json | null
          status: string
          stripe_subscription_id: string
          trial_end?: string | null
          trial_start?: string | null
        }
        Update: {
          cancel_at?: string | null
          canceled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          customer_id?: string | null
          id?: never
          metadata?: Json | null
          price_id?: string | null
          raw_data?: Json | null
          status?: string
          stripe_subscription_id?: string
          trial_end?: string | null
          trial_start?: string | null
        }
        Relationships: []
      }
      tag_grouping: {
        Row: {
          created_at: string
          grouping: string
          row_id: string
          tag: string
        }
        Insert: {
          created_at?: string
          grouping: string
          row_id?: string
          tag: string
        }
        Update: {
          created_at?: string
          grouping?: string
          row_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "tag_grouping_tag_fkey"
            columns: ["tag"]
            isOneToOne: false
            referencedRelation: "clickup_tags"
            referencedColumns: ["name"]
          },
        ]
      }
      tag_history: {
        Row: {
          created_at: string
          row_id: string
          tag_after: string | null
          tag_before: string | null
          task_id: string
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          row_id?: string
          tag_after?: string | null
          tag_before?: string | null
          task_id: string
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          row_id?: string
          tag_after?: string | null
          tag_before?: string | null
          task_id?: string
          updated_by?: number | null
        }
        Relationships: []
      }
      task_audit_log: {
        Row: {
          comment_sent: string | null
          created_at: string
          data: Json
          reason: string
          row_id: string
          row_updated: string | null
          task_id: string
        }
        Insert: {
          comment_sent?: string | null
          created_at?: string
          data: Json
          reason: string
          row_id?: string
          row_updated?: string | null
          task_id: string
        }
        Update: {
          comment_sent?: string | null
          created_at?: string
          data?: Json
          reason?: string
          row_id?: string
          row_updated?: string | null
          task_id?: string
        }
        Relationships: []
      }
      task_deletions: {
        Row: {
          deleted_at: string
          id: string
        }
        Insert: {
          deleted_at?: string
          id: string
        }
        Update: {
          deleted_at?: string
          id?: string
        }
        Relationships: []
      }
      task_dependencies: {
        Row: {
          created_at: string
          link: string | null
          row_id: string
          task_id: string | null
          type: string | null
        }
        Insert: {
          created_at?: string
          link?: string | null
          row_id: string
          task_id?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string
          link?: string | null
          row_id?: string
          task_id?: string | null
          type?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string | null
          linked_tasks: string[] | null
          list_id: number | null
          name: string
          row_created: string
          task_archived: boolean | null
          task_id: string
        }
        Insert: {
          created_at?: string | null
          linked_tasks?: string[] | null
          list_id?: number | null
          name: string
          row_created?: string
          task_archived?: boolean | null
          task_id: string
        }
        Update: {
          created_at?: string | null
          linked_tasks?: string[] | null
          list_id?: number | null
          name?: string
          row_created?: string
          task_archived?: boolean | null
          task_id?: string
        }
        Relationships: []
      }
      time_estimate_history: {
        Row: {
          created_at: string
          estimate_mins_after: number | null
          estimate_mins_before: number | null
          row_id: string
          task_id: string
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          estimate_mins_after?: number | null
          estimate_mins_before?: number | null
          row_id?: string
          task_id: string
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          estimate_mins_after?: number | null
          estimate_mins_before?: number | null
          row_id?: string
          task_id?: string
          updated_by?: number | null
        }
        Relationships: []
      }
      time_tracking_history: {
        Row: {
          created_at: string
          end_time: string
          row_id: string
          start_time: string
          task_id: string
          total_minutes: number
          tracking_id: string | null
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          end_time: string
          row_id?: string
          start_time: string
          task_id: string
          total_minutes: number
          tracking_id?: string | null
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          end_time?: string
          row_id?: string
          start_time?: string
          task_id?: string
          total_minutes?: number
          tracking_id?: string | null
          updated_by?: number | null
        }
        Relationships: []
      }
      time_tracking_summary: {
        Row: {
          avg_session_length: number | null
          creator_id: number | null
          first_tracked_at: string | null
          last_tracked_at: string | null
          task_id: string
          total_minutes: number
          total_sessions: number | null
          updated_at: string | null
        }
        Insert: {
          avg_session_length?: number | null
          creator_id?: number | null
          first_tracked_at?: string | null
          last_tracked_at?: string | null
          task_id: string
          total_minutes?: number
          total_sessions?: number | null
          updated_at?: string | null
        }
        Update: {
          avg_session_length?: number | null
          creator_id?: number | null
          first_tracked_at?: string | null
          last_tracked_at?: string | null
          task_id?: string
          total_minutes?: number
          total_sessions?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      turnaround_time_stats: {
        Row: {
          created_date: string
          department: string | null
          estimates_avg_days_out: number | null
          estimates_avg_outside_range: boolean | null
          estimates_avg_time: number | null
          estimates_max_days_out: number | null
          estimates_max_outside_range: boolean | null
          estimates_max_time: number | null
          estimates_min_days_out: number | null
          estimates_min_outside_range: boolean | null
          estimates_min_time: number | null
          id: number
          raw_data: string | null
          tag_name: string | null
          target_max: string | null
          target_min: string | null
        }
        Insert: {
          created_date: string
          department?: string | null
          estimates_avg_days_out?: number | null
          estimates_avg_outside_range?: boolean | null
          estimates_avg_time?: number | null
          estimates_max_days_out?: number | null
          estimates_max_outside_range?: boolean | null
          estimates_max_time?: number | null
          estimates_min_days_out?: number | null
          estimates_min_outside_range?: boolean | null
          estimates_min_time?: number | null
          id?: never
          raw_data?: string | null
          tag_name?: string | null
          target_max?: string | null
          target_min?: string | null
        }
        Update: {
          created_date?: string
          department?: string | null
          estimates_avg_days_out?: number | null
          estimates_avg_outside_range?: boolean | null
          estimates_avg_time?: number | null
          estimates_max_days_out?: number | null
          estimates_max_outside_range?: boolean | null
          estimates_max_time?: number | null
          estimates_min_days_out?: number | null
          estimates_min_outside_range?: boolean | null
          estimates_min_time?: number | null
          id?: never
          raw_data?: string | null
          tag_name?: string | null
          target_max?: string | null
          target_min?: string | null
        }
        Relationships: []
      }
      user_associations: {
        Row: {
          created_at: string
          object_id: number | null
          row_id: string
          type: string | null
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string
          object_id?: number | null
          row_id: string
          type?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string
          object_id?: number | null
          row_id?: string
          type?: string | null
          updated_at?: string | null
          user_id?: number | null
        }
        Relationships: []
      }
      user_tokens: {
        Row: {
          access_token: string | null
          team_id: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          team_id?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          team_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      active_projects: {
        Row: {
          aa_queued: number | null
          aa_trigger: boolean | null
          account: number | null
          active_products: string[] | null
          active_task_ids: string[] | null
          active_tasks: number | null
          cap: number | null
          church: string | null
          cu_queued: number | null
          mmq_max: number | null
          products: string[] | null
          room: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      active_projects_mv: {
        Row: {
          aa_queued: number | null
          aa_trigger: boolean | null
          account: number | null
          active_products: string[] | null
          active_task_ids: string[] | null
          active_tasks: number | null
          cap: number | null
          church: string | null
          cu_queued: number | null
          last_activated: string | null
          last_activated_by: string | null
          last_activated_by_name: string | null
          last_activated_task_id: string | null
          last_deactivated: string | null
          last_deactivated_by: string | null
          last_deactivated_by_name: string | null
          last_deactivated_task_id: string | null
          mmq_max: number | null
          products: string[] | null
          room: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      column_usage_stats: {
        Row: {
          column_name: unknown | null
          data_type: string | null
          has_index: boolean | null
          in_queries_count: number | null
          is_nullable: boolean | null
          query_usage_ratio: number | null
          schema: unknown | null
          table_name: unknown | null
        }
        Relationships: []
      }
      database_summary_view: {
        Row: {
          mat_views_count: number | null
          stats_reset_date: string | null
          tables_count: number | null
          total_database_size: string | null
          total_indexes_size: string | null
          unused_columns_count: number | null
          unused_columns_percentage: number | null
          unused_indexes_count: number | null
          unused_indexes_percentage: number | null
          unused_tables_count: number | null
          unused_tables_percentage: number | null
          views_count: number | null
        }
        Relationships: []
      }
      formatted_time_summary: {
        Row: {
          avg_session_minutes: number | null
          first_tracked_at: string | null
          formatted_time: string | null
          last_tracked_at: string | null
          recently_updated: boolean | null
          rounded_minutes: number | null
          task_id: string | null
          task_name: string | null
          total_minutes: number | null
          total_sessions: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      function_usage_stats: {
        Row: {
          avg_time: number | null
          calls: number | null
          function_name: unknown | null
          function_type: string | null
          schema: unknown | null
          source_size: number | null
          total_time: number | null
        }
        Relationships: []
      }
      index_usage_stats: {
        Row: {
          index_columns: string[] | null
          index_name: unknown | null
          index_scans: number | null
          index_size: string | null
          is_primary: boolean | null
          is_unique: boolean | null
          schema: unknown | null
          table_name: unknown | null
        }
        Relationships: []
      }
      local_stripe_customers: {
        Row: {
          attrs: Json | null
          created: string | null
          description: string | null
          email: string | null
          id: string | null
          name: string | null
        }
        Relationships: []
      }
      local_stripe_subscriptions: {
        Row: {
          attrs: Json | null
          currency: string | null
          current_period_end: string | null
          current_period_start: string | null
          customer: string | null
          id: string | null
        }
        Relationships: []
      }
      master_project_view: {
        Row: {
          aa_exclude: boolean | null
          account: number | null
          assignee: number | null
          assignee_name: string | null
          auto_assign_override: boolean | null
          auto_assign_status: string | null
          date_auto_assigned: string | null
          date_created: string | null
          due_date: string | null
          name: string | null
          resp_department: string | null
          space_name: string | null
          status: string | null
          status_color: string | null
          tags: string[] | null
          task_dependencies: Json | null
          task_id: string | null
          time_estimate_mins: number | null
        }
        Relationships: [
          {
            foreignKeyName: "status_history_status_after_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "clickup_statuses"
            referencedColumns: ["status"]
          },
        ]
      }
      master_project_view_mv: {
        Row: {
          aa_exclude: boolean | null
          account: number | null
          assignee: number | null
          assignee_name: string | null
          auto_assign_override: boolean | null
          auto_assign_status: string | null
          date_auto_assigned: string | null
          date_created: string | null
          due_date: string | null
          name: string | null
          resp_department: string | null
          space_name: string | null
          status: string | null
          status_color: string | null
          tags: string[] | null
          task_dependencies: Json | null
          task_id: string | null
          time_estimate_mins: number | null
        }
        Relationships: [
          {
            foreignKeyName: "status_history_status_after_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "clickup_statuses"
            referencedColumns: ["status"]
          },
        ]
      }
      mv_active_projects: {
        Row: {
          aa_queued: number | null
          aa_trigger: boolean | null
          account: number | null
          active_products: string[] | null
          active_task_ids: string[] | null
          active_tasks: number | null
          cap: number | null
          church: string | null
          cu_queued: number | null
          mmq_max: number | null
          products: string[] | null
          room: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
        ]
      }
      mv_all_designers: {
        Row: {
          assignee: string | null
          assignee_user_id: number | null
          day_num: number | null
          email: string | null
          minutes_per_day: number | null
        }
        Relationships: []
      }
      mv_all_designers_scheduling: {
        Row: {
          assignee: string | null
          assignee_user_id: number | null
          day_num: number | null
          department: string | null
          email: string | null
          minutes_per_day: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_fkey"
            columns: ["department"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      mv_current_task_assignees: {
        Row: {
          assignee: number | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_employee_assigned_tasks: {
        Row: {
          task_id: string | null
        }
        Relationships: []
      }
      mv_future_dates: {
        Row: {
          future_date: string | null
        }
        Relationships: []
      }
      mv_future_dates_mysquad_pm: {
        Row: {
          future_date: string | null
        }
        Relationships: []
      }
      mv_latest_assignee_status: {
        Row: {
          assignee: number | null
          change_type:
            | Database["public"]["Enums"]["assignee_change_type"]
            | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_latest_due_date: {
        Row: {
          due_date_after: string | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_latest_due_dates: {
        Row: {
          due_date_after: string | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_latest_estimates: {
        Row: {
          estimate_mins_after: number | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_latest_task_status: {
        Row: {
          status_after: string | null
          task_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "status_history_status_after_fkey"
            columns: ["status_after"]
            isOneToOne: false
            referencedRelation: "clickup_statuses"
            referencedColumns: ["status"]
          },
        ]
      }
      mv_latest_time_estimate: {
        Row: {
          estimate_mins_after: number | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_task_departments: {
        Row: {
          department: string | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_task_tag_data: {
        Row: {
          departments: string[] | null
          primary_department: string | null
          primary_tag_grouping: string | null
          tag_groupings: string[] | null
          tags: string[] | null
          task_id: string | null
        }
        Relationships: []
      }
      mv_task_tags: {
        Row: {
          tags: string[] | null
          task_id: string | null
        }
        Relationships: []
      }
      mysquad_pm_acc_mgmt: {
        Row: {
          account: number | null
          auto_assign_override: boolean | null
          cap: number | null
          church_name: string | null
          high_usage: boolean | null
          status: Database["public"]["Enums"]["account_status"] | null
        }
        Relationships: []
      }
      query_pattern_stats: {
        Row: {
          delete_count: number | null
          insert_count: number | null
          joined_tables: string[] | null
          most_used_columns: Json | null
          schema: string | null
          select_count: number | null
          table_name: string | null
          total_queries: number | null
          update_count: number | null
        }
        Relationships: []
      }
      table_usage_stats: {
        Row: {
          deletes: number | null
          index_scans: number | null
          inserts: number | null
          row_count: number | null
          schema: unknown | null
          sequential_scans: number | null
          table_name: unknown | null
          total_scans: number | null
          total_size: string | null
          updates: number | null
        }
        Relationships: []
      }
      tag_stats_view: {
        Row: {
          avg_days_off_target_month: number | null
          avg_days_off_target_week: number | null
          avg_days_to_draft_past_month: number | null
          avg_days_to_draft_past_week: number | null
          ideal_max_days: number | null
          ideal_min_days: number | null
          month_in_range: number | null
          month_percent_in_range: number | null
          month_total: number | null
          past_week_percent_in_range: number | null
          tag_grouping: string | null
          week_in_range: number | null
          week_percent_in_range: number | null
          week_total: number | null
        }
        Relationships: []
      }
      time_to_draft_view: {
        Row: {
          account: number | null
          assignee_name: string | null
          avg_revision_cycle_mins: number | null
          created_at: string | null
          dept: string | null
          first_ffd: string | null
          mins_to_draft: number | null
          name: string | null
          revisions: number | null
          tag_grouping: string | null
          task_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_folders_account_fkey"
            columns: ["account"]
            isOneToOne: false
            referencedRelation: "mysquad_pm_acc_mgmt"
            referencedColumns: ["account"]
          },
          {
            foreignKeyName: "clickup_tags_department_fkey"
            columns: ["dept"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["name"]
          },
        ]
      }
      trigger_usage_stats: {
        Row: {
          activation_count: number | null
          last_triggered: string | null
          schema: unknown | null
          table_name: unknown | null
          trigger_function: unknown | null
          trigger_name: unknown | null
        }
        Relationships: []
      }
      v_active_subscriptions: {
        Row: {
          current_period_end: string | null
          current_period_start: string | null
          customer_email: string | null
          customer_metadata: Json | null
          customer_name: string | null
          price_id: string | null
          status: string | null
          stripe_subscription_id: string | null
          subscription_metadata: Json | null
        }
        Relationships: []
      }
      v_customer_subscriptions: {
        Row: {
          active_subscriptions: number | null
          customer_name: string | null
          email: string | null
          first_subscription_date: string | null
          latest_subscription_end: string | null
          stripe_customer_id: string | null
          total_subscriptions: number | null
        }
        Relationships: []
      }
      v_product_subscriptions: {
        Row: {
          active_subscriptions_count: number | null
          product_active: boolean | null
          product_name: string | null
          stripe_product_id: string | null
          unique_customers_count: number | null
        }
        Relationships: []
      }
      v_subscription_status_timeline: {
        Row: {
          customer_email: string | null
          customer_name: string | null
          status: string | null
          status_end: string | null
          status_start: string | null
          stripe_subscription_id: string | null
        }
        Relationships: []
      }
      view_usage_stats: {
        Row: {
          estimated_rows: number | null
          scans: number | null
          schema: unknown | null
          view_name: unknown | null
        }
        Relationships: []
      }
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      business_days_between: {
        Args: {
          date_from: string
          date_to: string
        }
        Returns: number
      }
      check_and_notify_tasks_jacob_n8n: {
        Args: {
          task_id_input: string
        }
        Returns: undefined
      }
      check_table_access: {
        Args: Record<PropertyKey, never>
        Returns: {
          table_name: string
          can_read: boolean
          sample_count: number
        }[]
      }
      check_tasks_policies: {
        Args: Record<PropertyKey, never>
        Returns: {
          policy_name: string
          command: string
          permissive: string
          roles: string[]
          qual: string
          with_check: string
        }[]
      }
      create_account_without_activity: {
        Args: {
          p_name: string
          p_owner_id: string
          p_primary_email: string
        }
        Returns: undefined
      }
      create_designer_preferences_dsq: {
        Args: {
          recommended_designers: string[]
          not_recommended_designers: string[]
          member_number: number
        }
        Returns: undefined
      }
      debug_assigned_tasks: {
        Args: {
          assignee_id: number
        }
        Returns: {
          step: string
          count: number
        }[]
      }
      designer_change_func: {
        Args: {
          p_email: string
          p_task_id: string
          p_employee: boolean
          p_work_again: boolean
          p_feedback: string
          p_revisions: number
        }
        Returns: {
          created_at: string
          designer_email: string | null
          employee: boolean | null
          feedback: string | null
          id: string
          revisions: number | null
          task_id: string
          work_again: boolean | null
        }
      }
      execute_database_script: {
        Args: {
          script_text: string
        }
        Returns: boolean
      }
      get_account_capacity: {
        Args: {
          input_account_number: number
        }
        Returns: {
          account: number
          active_tasks: number
          cap: number
          room: number
          queued_count: number
        }[]
      }
      get_assigned_tasks: {
        Args: {
          assignee_id: number
        }
        Returns: {
          task_id: string
          task_name: string
          assignee: number
          assignee_name: string
          due_date_after: string
          current_status: string
          account: string
          church_name: string
          task_type: string
        }[]
      }
      get_assignee_details: {
        Args: {
          task_ids: string[]
        }
        Returns: {
          task_id: string
          assignees: Json
        }[]
      }
      get_auth_account_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_column_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          table_name: string
          column_name: string
          data_type: string
          is_nullable: boolean
          has_index: boolean
          in_queries_count: number
          query_usage_ratio: number
        }[]
      }
      get_daily_metrics: {
        Args: Record<PropertyKey, never>
        Returns: {
          count: number
          type: string
        }[]
      }
      get_database_summary: {
        Args: Record<PropertyKey, never>
        Returns: {
          tables_count: number
          views_count: number
          mat_views_count: number
          unused_tables_count: number
          unused_tables_percentage: number
          unused_columns_count: number
          unused_columns_percentage: number
          unused_indexes_count: number
          unused_indexes_percentage: number
          total_database_size: string
          total_indexes_size: string
          stats_reset_date: string
        }[]
      }
      get_decrypted_secret_by_name: {
        Args: {
          secret_name: string
        }
        Returns: {
          id: string
          name: string
          description: string
          decrypted_secret: string
          key_id: string
          nonce: string
          created_at: string
          updated_at: string
        }[]
      }
      get_department_task_ids: {
        Args: {
          p_department?: string
          days_ago?: number
          space_ids?: number[]
        }
        Returns: {
          task_id: string
        }[]
      }
      get_department_tasks: {
        Args: {
          department: string
          days_ago: number
          space_ids: number[]
        }
        Returns: {
          task_id: string
          name: string
          list_id: number
          date_created: string
        }[]
      }
      get_designer_schedule: {
        Args: {
          time_estimate?: number
          limit_count?: number
          designer_id?: number
          target_date?: string
          target_days_out?: number
          task_id?: string
          resp_department?: string
        }
        Returns: {
          assignee_id: number
          assignee: string
          draft_date: string
          total_estimated_minutes: number
          task_ids: string[]
          minutes_per_day: number
          capacity: number
          time_avail: number
          days_out: number
        }[]
      }
      get_function_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          function_name: string
          calls: number
          total_time: number
          avg_time: number
          function_type: string
          source_size: number
        }[]
      }
      get_future_date: {
        Args: {
          workdays: number
        }
        Returns: string
      }
      get_future_dates: {
        Args: {
          min_workdays: number
          max_workdays: number
        }
        Returns: {
          future_date: string
        }[]
      }
      get_index_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          table_name: string
          index_name: string
          index_size: string
          index_scans: number
          is_unique: boolean
          is_primary: boolean
          index_columns: string[]
        }[]
      }
      get_next_account_count: {
        Args: {
          account_number: number
        }
        Returns: number
      }
      get_pm_queue_tasks:
        | {
            Args: {
              department?: string
              days_ago?: number
              space_ids?: number[]
            }
            Returns: {
              id: string
              name: string
              account: number
              status: string
              status_color: string
              assignees: Json
              due_date: string
              date_created: string
            }[]
          }
        | {
            Args: {
              p_department?: string
              days_ago?: number
              space_ids?: number[]
              percent?: number
            }
            Returns: {
              id: string
              name: string
              account: number
              status: string
              status_color: string
              assignees: Json
              due_date: string
              date_created: string
            }[]
          }
      get_project_submissions_by_giid: {
        Args: {
          p_giid: string
        }
        Returns: {
          project_submission_id: string
          project_type: number
          project_name: string
          raw_data: Json
          created_at: string
          clickup_id: string
        }[]
      }
      get_query_pattern_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          table_name: string
          total_queries: number
          select_count: number
          insert_count: number
          update_count: number
          delete_count: number
          joined_tables: string[]
          most_used_columns: Json
        }[]
      }
      get_recent_time_summaries: {
        Args: {
          minutes_ago?: number
        }
        Returns: {
          task_id: string
          task_name: string
          total_minutes: number
          rounded_minutes: number
          formatted_time: string
          total_sessions: number
          avg_session_minutes: number
          first_tracked_at: string
          last_tracked_at: string
          updated_at: string
        }[]
      }
      get_sample_data: {
        Args: {
          p_table_name: string
          p_column_name: string
        }
        Returns: string
      }
      get_scheduling_data: {
        Args: {
          account_number: string
          time_estimate: number
        }
        Returns: {
          user_id: string
          username: string
          draft_date: string
          sched: number
          minutes_day: number
          capacity: number
          time_avail: number
          days_out: number
          preference_score: number
        }[]
      }
      get_table_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          table_name: string
          sequential_scans: number
          index_scans: number
          total_scans: number
          inserts: number
          updates: number
          deletes: number
          row_count: number
          total_size: string
        }[]
      }
      get_task: {
        Args: {
          task_id_input: string
        }
        Returns: {
          id: string
          name: string
          church_name: string
          account: string
          status: string
          assignees: string[]
          tags: string[]
          time_estimate: number
          time_tracked: number
          go_live_date: string
          due_date: string
          responsible_dept: string
          db_folder_id: string
          date_created: string
        }[]
      }
      get_task_details: {
        Args: {
          p_task_id: string
        }
        Returns: {
          task_id: string
          name: string
          account: number
          status: string
          color: string
          assignees: Json
          tags: string[]
          time_estimate: number
          time_tracked: number
          go_live_date: string
          due_date: string
          responsible_dept: string
          db_folder_id: string
          row_created: string
          auto_assign_status: string
          auto_assign_date: string
          decision_log_array: Json
        }[]
      }
      get_task_due_dates: {
        Args: {
          task_ids: string[]
        }
        Returns: {
          task_id: string
          due_date: string
        }[]
      }
      get_task_history_for_ids: {
        Args: {
          task_ids: string[]
        }
        Returns: {
          task_id: string
          task_name: string
          change_date: string
          new_value: string
          changed_by_name: string
          change_type: string
        }[]
      }
      get_task_statuses: {
        Args: {
          task_ids: string[]
        }
        Returns: {
          task_id: string
          status: string
        }[]
      }
      get_task_trends: {
        Args: {
          days?: number
        }
        Returns: {
          date: string
          task_count: number
          type: string
        }[]
      }
      get_trigger_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          table_name: string
          trigger_name: string
          trigger_function: string
          activation_count: number
          last_triggered: string
        }[]
      }
      get_trml_data: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_tasks: {
        Args: {
          user_id: number
          space_ids?: number[]
        }
        Returns: {
          task_id: string
          task_name: string
          assignee: number
          assignee_name: string
          due_date_after: string
          current_status: string
          account: string
          church_name: string
          task_type: string
          relevant_date: string
        }[]
      }
      get_view_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          schema: string
          view_name: string
          scans: number
          estimated_rows: number
        }[]
      }
      gtrgm_compress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_in: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      gtrgm_options: {
        Args: {
          "": unknown
        }
        Returns: undefined
      }
      gtrgm_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      initialize_plan_requirements: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_super_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      project_increment_counter: {
        Args: {
          account_number: string
          general_id: string
        }
        Returns: undefined
      }
      refresh_active_projects_mv: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_database_statistics: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      search_table: {
        Args: {
          search_text: string
          table_to_search: string
        }
        Returns: {
          column_name: string
          row_id: string
          match_type: string
          similarity: number
          matched_value: string
        }[]
      }
      search_text_in_table: {
        Args: {
          p_table_name: string
          p_search_text: string
        }
        Returns: {
          result_row: Json
        }[]
      }
      set_accid: {
        Args: {
          accid: string
        }
        Returns: undefined
      }
      set_limit: {
        Args: {
          "": number
        }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: {
          "": string
        }
        Returns: string[]
      }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      sync_stripe_customers:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              batch_size?: number
            }
            Returns: number
          }
      sync_stripe_data:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              batch_size?: number
            }
            Returns: string
          }
      sync_stripe_products:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              batch_size?: number
            }
            Returns: number
          }
      sync_stripe_subscriptions:
        | {
            Args: Record<PropertyKey, never>
            Returns: number
          }
        | {
            Args: {
              batch_size?: number
            }
            Returns: number
          }
      time_estimate_processor_v2: {
        Args: {
          task_id_input: string
        }
        Returns: undefined
      }
      urlencode:
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      aa_status: "complete" | "triggered" | "error"
      account_status:
        | "Active"
        | "Trial"
        | "Paused"
        | "In Payment Recovery"
        | "Non-Renewing"
        | "Cancelled"
        | "Bootcamp"
        | "Unknown"
        | "Pre-Trial"
      assignee_change_type: "assignee_add" | "assignee_rem"
      automation_form_platforms:
        | "airtable"
        | "fillout"
        | "make"
        | "n8n"
        | "paperform"
        | "zapier"
      automation_form_status: "live" | "disabled"
      comment_category:
        | "Longer Revision"
        | "N/A"
        | "Other"
        | "Quick Edit"
        | "New Concept"
        | "Question"
        | "Urgent!"
      contact_type:
        | "Primary"
        | "Secondary"
        | "Billing"
        | "Other - See Notes"
        | "Prior Primary"
        | "Prospect"
      day_of_week: "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
      location_type: "folder" | "list" | "space"
      preference_type:
        | "recommended"
        | "preferred"
        | "not_preferred"
        | "not_recommended"
      product_type: "plan" | "add_on"
      sentiment: "Positive" | "Negative" | "N/A" | "Neutral"
      tag_type: "task_type" | "filtering" | "plan" | "project_management"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
