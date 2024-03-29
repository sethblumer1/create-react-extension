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
      companies: {
        Row: {
          address: Json | null
          created_at: string | null
          id: number
          linkedin_url: string | null
          name: string | null
          num_employees: number | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string | null
          id: number
          linkedin_url?: string | null
          name?: string | null
          num_employees?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string | null
          id?: number
          linkedin_url?: string | null
          name?: string | null
          num_employees?: number | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          city: string | null
          company: string | null
          contact_saved_by: string | null
          country: string | null
          created_at: string | null
          emails: string[] | null
          first_name: string | null
          full_name: string | null
          headline: string | null
          id: number
          last_name: string | null
          linked_url: string | null
          notes: string | null
          occupation: string | null
          phone_numbers: string[] | null
          profile_pic: string | null
          state: string | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          company?: string | null
          contact_saved_by?: string | null
          country?: string | null
          created_at?: string | null
          emails?: string[] | null
          first_name?: string | null
          full_name?: string | null
          headline?: string | null
          id: number
          last_name?: string | null
          linked_url?: string | null
          notes?: string | null
          occupation?: string | null
          phone_numbers?: string[] | null
          profile_pic?: string | null
          state?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          company?: string | null
          contact_saved_by?: string | null
          country?: string | null
          created_at?: string | null
          emails?: string[] | null
          first_name?: string | null
          full_name?: string | null
          headline?: string | null
          id?: number
          last_name?: string | null
          linked_url?: string | null
          notes?: string | null
          occupation?: string | null
          phone_numbers?: string[] | null
          profile_pic?: string | null
          state?: string | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_contact_saved_by_fkey"
            columns: ["contact_saved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      job_applications: {
        Row: {
          application_status_id: number | null
          created_at: string | null
          id: number
          job_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          application_status_id?: number | null
          created_at?: string | null
          id: number
          job_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          application_status_id?: number | null
          created_at?: string | null
          id?: number
          job_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      job_excitement_level: {
        Row: {
          created_at: string
          id: number
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      job_status: {
        Row: {
          created_at: string | null
          id: number
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      jobs: {
        Row: {
          company_id: number | null
          company_name: string | null
          created_at: string | null
          excitement_level_id: number | null
          id: number
          job_status: string | null
          position: string | null
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          company_id?: number | null
          company_name?: string | null
          created_at?: string | null
          excitement_level_id?: number | null
          id?: number
          job_status?: string | null
          position?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          company_id?: number | null
          company_name?: string | null
          created_at?: string | null
          excitement_level_id?: number | null
          id?: number
          job_status?: string | null
          position?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          college: string | null
          created_at: string | null
          email: string | null
          id: string
          industry: string | null
          major: string | null
          name: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          college?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          industry?: string | null
          major?: string | null
          name?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          college?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          major?: string | null
          name?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      task_priority: {
        Row: {
          created_at: string | null
          id: number
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      task_status: {
        Row: {
          created_at: string | null
          id: number
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      task_type: {
        Row: {
          created_at: string | null
          id: number
          label: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: number
          label?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          alert_time: string | null
          contact_id: number | null
          created_at: string | null
          id: number
          job_id: number | null
          priority_id: number | null
          status_id: number | null
          title: string | null
          type_id: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          alert_time?: string | null
          contact_id?: number | null
          created_at?: string | null
          id: number
          job_id?: number | null
          priority_id?: number | null
          status_id?: number | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          alert_time?: string | null
          contact_id?: number | null
          created_at?: string | null
          id?: number
          job_id?: number | null
          priority_id?: number | null
          status_id?: number | null
          title?: string | null
          type_id?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_priority_id_fkey"
            columns: ["priority_id"]
            isOneToOne: false
            referencedRelation: "task_priority"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "task_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "task_type"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_saved_contacts: {
        Args: {
          user_id: string
          json_data: Json
        }
        Returns: undefined
      }
      get_all_contacts: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
