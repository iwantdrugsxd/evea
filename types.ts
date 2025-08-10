
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
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
  public: {
    Tables: {
      admin_reviews: {
        Row: {
          admin_id: string
          business_info_reviewed: boolean | null
          created_at: string | null
          documents_reviewed: boolean | null
          id: string
          review_notes: string | null
          review_status: string | null
          services_reviewed: boolean | null
          vendor_id: string
        }
        Insert: {
          admin_id: string
          business_info_reviewed?: boolean | null
          created_at?: string | null
          documents_reviewed?: boolean | null
          id?: string
          review_notes?: string | null
          review_status?: string | null
          services_reviewed?: boolean | null
          vendor_id: string
        }
        Update: {
          admin_id?: string
          business_info_reviewed?: boolean | null
          created_at?: string | null
          documents_reviewed?: boolean | null
          id?: string
          review_notes?: string | null
          review_status?: string | null
          services_reviewed?: boolean | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_reviews_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "marketplace_cards"
            referencedColumns: ["category_id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: string[] | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_read: boolean | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          order_id: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          attachments?: string[] | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          order_id?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          attachments?: string[] | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          order_id?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          customizations: Json | null
          id: string
          order_id: string
          quantity: number
          total_price: number
          unit_price: number
          vendor_card_id: string
        }
        Insert: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          order_id: string
          quantity?: number
          total_price: number
          unit_price: number
          vendor_card_id: string
        }
        Update: {
          created_at?: string | null
          customizations?: Json | null
          id?: string
          order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          vendor_card_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_vendor_card_id_fkey"
            columns: ["vendor_card_id"]
            isOneToOne: false
            referencedRelation: "marketplace_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_vendor_card_id_fkey"
            columns: ["vendor_card_id"]
            isOneToOne: false
            referencedRelation: "vendor_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_id: string
          event_date: string
          event_duration: number | null
          event_location: string
          event_time: string | null
          guest_count: number | null
          id: string
          order_number: string
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          platform_fee: number
          special_requirements: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          customer_id: string
          event_date: string
          event_duration?: number | null
          event_location: string
          event_time?: string | null
          guest_count?: number | null
          id?: string
          order_number: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee: number
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal: number
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          customer_id?: string
          event_date?: string
          event_duration?: number | null
          event_location?: string
          event_time?: string | null
          guest_count?: number | null
          id?: string
          order_number?: string
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          platform_fee?: number
          special_requirements?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          subtotal?: number
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          gateway: Database["public"]["Enums"]["payment_gateway"]
          gateway_response: Json | null
          id: string
          order_id: string
          payment_intent_id: string
          payment_method: string
          processed_at: string | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          gateway: Database["public"]["Enums"]["payment_gateway"]
          gateway_response?: Json | null
          id?: string
          order_id: string
          payment_intent_id: string
          payment_method: string
          processed_at?: string | null
          status: Database["public"]["Enums"]["payment_status"]
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          gateway?: Database["public"]["Enums"]["payment_gateway"]
          gateway_response?: Json | null
          id?: string
          order_id?: string
          payment_intent_id?: string
          payment_method?: string
          processed_at?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          customer_id: string
          helpful_count: number | null
          id: string
          images: string[] | null
          is_verified: boolean | null
          order_id: string
          rating: number
          title: string | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          customer_id: string
          helpful_count?: number | null
          id?: string
          images?: string[] | null
          is_verified?: boolean | null
          order_id: string
          rating: number
          title?: string | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          customer_id?: string
          helpful_count?: number | null
          id?: string
          images?: string[] | null
          is_verified?: boolean | null
          order_id?: string
          rating?: number
          title?: string | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          communication_preferences: Json | null
          created_at: string | null
          email: string
          email_verified: boolean | null
          first_name: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          mobile_verification_code: string | null
          mobile_verification_sent_at: string | null
          mobile_verified: boolean | null
          password_hash: string
          phone: string | null
          phone_verified: boolean | null
          preferred_language: string | null
          profile_completion_percentage: number | null
          role: Database["public"]["Enums"]["user_role"]
          token_expires_at: string | null
          updated_at: string | null
          verification_token: string | null
        }
        Insert: {
          communication_preferences?: Json | null
          created_at?: string | null
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          mobile_verification_code?: string | null
          mobile_verification_sent_at?: string | null
          mobile_verified?: boolean | null
          password_hash: string
          phone?: string | null
          phone_verified?: boolean | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          token_expires_at?: string | null
          updated_at?: string | null
          verification_token?: string | null
        }
        Update: {
          communication_preferences?: Json | null
          created_at?: string | null
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          mobile_verification_code?: string | null
          mobile_verification_sent_at?: string | null
          mobile_verified?: boolean | null
          password_hash?: string
          phone?: string | null
          phone_verified?: boolean | null
          preferred_language?: string | null
          profile_completion_percentage?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          token_expires_at?: string | null
          updated_at?: string | null
          verification_token?: string | null
        }
        Relationships: []
      }
      vendor_availability: {
        Row: {
          availability_date: string
          availability_type: string | null
          available_from: string | null
          available_until: string | null
          blocked_reason: string | null
          booking_status: string | null
          created_at: string | null
          id: string
          is_available: boolean | null
          max_events_per_day: number | null
          notes: string | null
          pricing_multiplier: number | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          availability_date: string
          availability_type?: string | null
          available_from?: string | null
          available_until?: string | null
          blocked_reason?: string | null
          booking_status?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          max_events_per_day?: number | null
          notes?: string | null
          pricing_multiplier?: number | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          availability_date?: string
          availability_type?: string | null
          available_from?: string | null
          available_until?: string | null
          blocked_reason?: string | null
          booking_status?: string | null
          created_at?: string | null
          id?: string
          is_available?: boolean | null
          max_events_per_day?: number | null
          notes?: string | null
          pricing_multiplier?: number | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_availability_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_cards: {
        Row: {
          advance_booking_days: number | null
          average_rating: number | null
          base_price: number
          cancellation_policy: string | null
          category_id: string
          created_at: string | null
          description: string
          equipment_provided: string[] | null
          exclusions: string[] | null
          featured: boolean | null
          id: string
          images: string[] | null
          inclusions: string[] | null
          is_active: boolean | null
          max_booking_time: number | null
          max_capacity: number | null
          min_booking_time: number | null
          portfolio_images: Json | null
          price_type: Database["public"]["Enums"]["price_type_enum"] | null
          service_area: string[]
          starting_price: number | null
          subcategory_id: string | null
          title: string
          total_reviews: number | null
          updated_at: string | null
          vendor_id: string
          videos: string[] | null
        }
        Insert: {
          advance_booking_days?: number | null
          average_rating?: number | null
          base_price: number
          cancellation_policy?: string | null
          category_id: string
          created_at?: string | null
          description: string
          equipment_provided?: string[] | null
          exclusions?: string[] | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_active?: boolean | null
          max_booking_time?: number | null
          max_capacity?: number | null
          min_booking_time?: number | null
          portfolio_images?: Json | null
          price_type?: Database["public"]["Enums"]["price_type_enum"] | null
          service_area: string[]
          starting_price?: number | null
          subcategory_id?: string | null
          title: string
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id: string
          videos?: string[] | null
        }
        Update: {
          advance_booking_days?: number | null
          average_rating?: number | null
          base_price?: number
          cancellation_policy?: string | null
          category_id?: string
          created_at?: string | null
          description?: string
          equipment_provided?: string[] | null
          exclusions?: string[] | null
          featured?: boolean | null
          id?: string
          images?: string[] | null
          inclusions?: string[] | null
          is_active?: boolean | null
          max_booking_time?: number | null
          max_capacity?: number | null
          min_booking_time?: number | null
          portfolio_images?: Json | null
          price_type?: Database["public"]["Enums"]["price_type_enum"] | null
          service_area?: string[]
          starting_price?: number | null
          subcategory_id?: string | null
          title?: string
          total_reviews?: number | null
          updated_at?: string | null
          vendor_id?: string
          videos?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_cards_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_cards_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_cards"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "vendor_cards_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_cards_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "marketplace_cards"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "vendor_cards_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_documents: {
        Row: {
          created_at: string | null
          document_quality_score: number | null
          document_subcategory: string | null
          document_type: string
          drive_download_link: string | null
          drive_view_link: string | null
          expiry_date: string | null
          file_name: string
          file_size: number | null
          google_drive_file_id: string
          google_drive_folder_id: string | null
          id: string
          mime_type: string | null
          ocr_extracted_data: Json | null
          rejection_reason: string | null
          requires_manual_review: boolean | null
          updated_at: string | null
          validity_status: string | null
          vendor_id: string
          verification_method: string | null
          verification_response: Json | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string | null
          document_quality_score?: number | null
          document_subcategory?: string | null
          document_type: string
          drive_download_link?: string | null
          drive_view_link?: string | null
          expiry_date?: string | null
          file_name: string
          file_size?: number | null
          google_drive_file_id: string
          google_drive_folder_id?: string | null
          id?: string
          mime_type?: string | null
          ocr_extracted_data?: Json | null
          rejection_reason?: string | null
          requires_manual_review?: boolean | null
          updated_at?: string | null
          validity_status?: string | null
          vendor_id: string
          verification_method?: string | null
          verification_response?: Json | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string | null
          document_quality_score?: number | null
          document_subcategory?: string | null
          document_type?: string
          drive_download_link?: string | null
          drive_view_link?: string | null
          expiry_date?: string | null
          file_name?: string
          file_size?: number | null
          google_drive_file_id?: string
          google_drive_folder_id?: string | null
          id?: string
          mime_type?: string | null
          ocr_extracted_data?: Json | null
          rejection_reason?: string | null
          requires_manual_review?: boolean | null
          updated_at?: string | null
          validity_status?: string | null
          vendor_id?: string
          verification_method?: string | null
          verification_response?: Json | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_documents_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_onboarding_progress: {
        Row: {
          abandonment_reason: string | null
          abandonment_stage: number | null
          completed_at: string | null
          created_at: string | null
          current_stage: number
          device_type: string | null
          form_version: string | null
          id: string
          last_updated_at: string | null
          stage_1_data: Json | null
          stage_2_data: Json | null
          stage_3_data: Json | null
          stage_4_data: Json | null
          stage_5_data: Json | null
          stage_completion_times: Json | null
          started_at: string | null
          total_time_spent_minutes: number | null
          vendor_id: string
        }
        Insert: {
          abandonment_reason?: string | null
          abandonment_stage?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_stage?: number
          device_type?: string | null
          form_version?: string | null
          id?: string
          last_updated_at?: string | null
          stage_1_data?: Json | null
          stage_2_data?: Json | null
          stage_3_data?: Json | null
          stage_4_data?: Json | null
          stage_5_data?: Json | null
          stage_completion_times?: Json | null
          started_at?: string | null
          total_time_spent_minutes?: number | null
          vendor_id: string
        }
        Update: {
          abandonment_reason?: string | null
          abandonment_stage?: number | null
          completed_at?: string | null
          created_at?: string | null
          current_stage?: number
          device_type?: string | null
          form_version?: string | null
          id?: string
          last_updated_at?: string | null
          stage_1_data?: Json | null
          stage_2_data?: Json | null
          stage_3_data?: Json | null
          stage_4_data?: Json | null
          stage_5_data?: Json | null
          stage_completion_times?: Json | null
          started_at?: string | null
          total_time_spent_minutes?: number | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_onboarding_progress_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_portfolio_items: {
        Row: {
          ai_analysis: Json | null
          created_at: string | null
          description: string | null
          display_order: number
          event_type: string | null
          file_path: string
          file_size_bytes: number | null
          google_drive_file_id: string | null
          id: string
          image_dimensions: string | null
          is_active: boolean | null
          is_approved: boolean | null
          is_featured: boolean | null
          item_type: string
          original_filename: string | null
          quality_score: number | null
          service_category: string | null
          tags: Json | null
          title: string | null
          updated_at: string | null
          upload_timestamp: string | null
          vendor_id: string
          view_count: number | null
        }
        Insert: {
          ai_analysis?: Json | null
          created_at?: string | null
          description?: string | null
          display_order?: number
          event_type?: string | null
          file_path: string
          file_size_bytes?: number | null
          google_drive_file_id?: string | null
          id?: string
          image_dimensions?: string | null
          is_active?: boolean | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          item_type?: string
          original_filename?: string | null
          quality_score?: number | null
          service_category?: string | null
          tags?: Json | null
          title?: string | null
          updated_at?: string | null
          upload_timestamp?: string | null
          vendor_id: string
          view_count?: number | null
        }
        Update: {
          ai_analysis?: Json | null
          created_at?: string | null
          description?: string | null
          display_order?: number
          event_type?: string | null
          file_path?: string
          file_size_bytes?: number | null
          google_drive_file_id?: string | null
          id?: string
          image_dimensions?: string | null
          is_active?: boolean | null
          is_approved?: boolean | null
          is_featured?: boolean | null
          item_type?: string
          original_filename?: string | null
          quality_score?: number | null
          service_category?: string | null
          tags?: Json | null
          title?: string | null
          updated_at?: string | null
          upload_timestamp?: string | null
          vendor_id?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_portfolio_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_services: {
        Row: {
          additional_services: string[] | null
          additional_services_offered: string | null
          advance_booking_required_days: number | null
          advance_payment_percentage: number | null
          ai_pricing_suggestions: Json | null
          basic_package_details: string | null
          basic_package_price: number | null
          birthday_price_max: number | null
          birthday_price_min: number | null
          cancellation_policy: string | null
          category_id: string
          competitive_analysis: Json | null
          corporate_price_max: number | null
          corporate_price_min: number | null
          created_at: string | null
          festival_price_max: number | null
          festival_price_min: number | null
          id: string
          last_pricing_update: string | null
          max_booking_time_hours: number | null
          min_booking_time_hours: number | null
          portfolio_images: Json | null
          premium_package_details: string | null
          premium_package_price: number | null
          pricing_structure: string | null
          secondary_services: string[] | null
          service_description: string | null
          service_specializations: Json | null
          service_type: string | null
          standard_package_details: string | null
          standard_package_price: number | null
          subcategory: string | null
          updated_at: string | null
          vendor_id: string
          wedding_price_max: number | null
          wedding_price_min: number | null
        }
        Insert: {
          additional_services?: string[] | null
          additional_services_offered?: string | null
          advance_booking_required_days?: number | null
          advance_payment_percentage?: number | null
          ai_pricing_suggestions?: Json | null
          basic_package_details?: string | null
          basic_package_price?: number | null
          birthday_price_max?: number | null
          birthday_price_min?: number | null
          cancellation_policy?: string | null
          category_id: string
          competitive_analysis?: Json | null
          corporate_price_max?: number | null
          corporate_price_min?: number | null
          created_at?: string | null
          festival_price_max?: number | null
          festival_price_min?: number | null
          id?: string
          last_pricing_update?: string | null
          max_booking_time_hours?: number | null
          min_booking_time_hours?: number | null
          portfolio_images?: Json | null
          premium_package_details?: string | null
          premium_package_price?: number | null
          pricing_structure?: string | null
          secondary_services?: string[] | null
          service_description?: string | null
          service_specializations?: Json | null
          service_type?: string | null
          standard_package_details?: string | null
          standard_package_price?: number | null
          subcategory?: string | null
          updated_at?: string | null
          vendor_id: string
          wedding_price_max?: number | null
          wedding_price_min?: number | null
        }
        Update: {
          additional_services?: string[] | null
          additional_services_offered?: string | null
          advance_booking_required_days?: number | null
          advance_payment_percentage?: number | null
          ai_pricing_suggestions?: Json | null
          basic_package_details?: string | null
          basic_package_price?: number | null
          birthday_price_max?: number | null
          birthday_price_min?: number | null
          cancellation_policy?: string | null
          category_id?: string
          competitive_analysis?: Json | null
          corporate_price_max?: number | null
          corporate_price_min?: number | null
          created_at?: string | null
          festival_price_max?: number | null
          festival_price_min?: number | null
          id?: string
          last_pricing_update?: string | null
          max_booking_time_hours?: number | null
          min_booking_time_hours?: number | null
          portfolio_images?: Json | null
          premium_package_details?: string | null
          premium_package_price?: number | null
          pricing_structure?: string | null
          secondary_services?: string[] | null
          service_description?: string | null
          service_specializations?: Json | null
          service_type?: string | null
          standard_package_details?: string | null
          standard_package_price?: number | null
          subcategory?: string | null
          updated_at?: string | null
          vendor_id?: string
          wedding_price_max?: number | null
          wedding_price_min?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "marketplace_cards"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "vendor_services_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          aadhar_number: string | null
          aadhar_verification_code: string | null
          aadhar_verification_sent_at: string | null
          aadhar_verified: boolean | null
          address: string
          approved_at: string | null
          approved_by: string | null
          average_rating: number | null
          bank_account_number: string | null
          bank_holder_name: string | null
          bank_ifsc: string | null
          business_email: string | null
          business_name: string
          business_registration_type: string | null
          business_type: string | null
          business_website: string | null
          city: string
          coordinates: unknown | null
          created_at: string | null
          description: string | null
          email_verified_at: string | null
          equipment_provided: string | null
          facebook_page: string | null
          gst_number: string | null
          id: string
          instagram_handle: string | null
          max_events_per_month: number | null
          mobile_number: string | null
          monthly_booking_target: number | null
          monthly_revenue_target: number | null
          onboarding_completed_at: string | null
          pan_number: string | null
          payout_frequency: string | null
          portfolio_quality_score: number | null
          postal_code: string
          preferred_payment_method: string | null
          primary_business_goal: string | null
          primary_contact_name: string | null
          registration_step: number | null
          secondary_contact_name: string | null
          secondary_contact_phone: string | null
          secondary_contact_role: string | null
          service_area_radius: number | null
          service_coverage_areas: Json | null
          state: string
          total_reviews: number | null
          travel_willingness: string | null
          updated_at: string | null
          user_id: string
          venue_restrictions: string | null
          verification_documents: Json | null
          verification_status:
            | Database["public"]["Enums"]["vendor_verification_status"]
            | null
          verification_tier: number | null
          verification_token: string | null
          years_in_business: string | null
        }
        Insert: {
          aadhar_number?: string | null
          aadhar_verification_code?: string | null
          aadhar_verification_sent_at?: string | null
          aadhar_verified?: boolean | null
          address: string
          approved_at?: string | null
          approved_by?: string | null
          average_rating?: number | null
          bank_account_number?: string | null
          bank_holder_name?: string | null
          bank_ifsc?: string | null
          business_email?: string | null
          business_name: string
          business_registration_type?: string | null
          business_type?: string | null
          business_website?: string | null
          city: string
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          email_verified_at?: string | null
          equipment_provided?: string | null
          facebook_page?: string | null
          gst_number?: string | null
          id?: string
          instagram_handle?: string | null
          max_events_per_month?: number | null
          mobile_number?: string | null
          monthly_booking_target?: number | null
          monthly_revenue_target?: number | null
          onboarding_completed_at?: string | null
          pan_number?: string | null
          payout_frequency?: string | null
          portfolio_quality_score?: number | null
          postal_code: string
          preferred_payment_method?: string | null
          primary_business_goal?: string | null
          primary_contact_name?: string | null
          registration_step?: number | null
          secondary_contact_name?: string | null
          secondary_contact_phone?: string | null
          secondary_contact_role?: string | null
          service_area_radius?: number | null
          service_coverage_areas?: Json | null
          state: string
          total_reviews?: number | null
          travel_willingness?: string | null
          updated_at?: string | null
          user_id: string
          venue_restrictions?: string | null
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["vendor_verification_status"]
            | null
          verification_tier?: number | null
          verification_token?: string | null
          years_in_business?: string | null
        }
        Update: {
          aadhar_number?: string | null
          aadhar_verification_code?: string | null
          aadhar_verification_sent_at?: string | null
          aadhar_verified?: boolean | null
          address?: string
          approved_at?: string | null
          approved_by?: string | null
          average_rating?: number | null
          bank_account_number?: string | null
          bank_holder_name?: string | null
          bank_ifsc?: string | null
          business_email?: string | null
          business_name?: string
          business_registration_type?: string | null
          business_type?: string | null
          business_website?: string | null
          city?: string
          coordinates?: unknown | null
          created_at?: string | null
          description?: string | null
          email_verified_at?: string | null
          equipment_provided?: string | null
          facebook_page?: string | null
          gst_number?: string | null
          id?: string
          instagram_handle?: string | null
          max_events_per_month?: number | null
          mobile_number?: string | null
          monthly_booking_target?: number | null
          monthly_revenue_target?: number | null
          onboarding_completed_at?: string | null
          pan_number?: string | null
          payout_frequency?: string | null
          portfolio_quality_score?: number | null
          postal_code?: string
          preferred_payment_method?: string | null
          primary_business_goal?: string | null
          primary_contact_name?: string | null
          registration_step?: number | null
          secondary_contact_name?: string | null
          secondary_contact_phone?: string | null
          secondary_contact_role?: string | null
          service_area_radius?: number | null
          service_coverage_areas?: Json | null
          state?: string
          total_reviews?: number | null
          travel_willingness?: string | null
          updated_at?: string | null
          user_id?: string
          venue_restrictions?: string | null
          verification_documents?: Json | null
          verification_status?:
            | Database["public"]["Enums"]["vendor_verification_status"]
            | null
          verification_tier?: number | null
          verification_token?: string | null
          years_in_business?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vendors_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendors_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      marketplace_cards: {
        Row: {
          average_rating: number | null
          base_price: number | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          description: string | null
          equipment_provided: string[] | null
          exclusions: string[] | null
          featured: boolean | null
          id: string | null
          images: string[] | null
          inclusions: string[] | null
          is_active: boolean | null
          max_capacity: number | null
          portfolio_images: Json | null
          price_type: Database["public"]["Enums"]["price_type_enum"] | null
          service_area: string[] | null
          title: string | null
          total_reviews: number | null
          updated_at: string | null
          vendor_id: string | null
          vendor_name: string | null
          vendor_type: string | null
          verification_status:
            | Database["public"]["Enums"]["vendor_verification_status"]
            | null
          videos: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_cards_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      generate_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      message_type: "text" | "image" | "document" | "system"
      notification_type:
        | "order_created"
        | "order_confirmed"
        | "payment_received"
        | "review_received"
        | "message_received"
        | "system_announcement"
        | "vendor_approved"
        | "vendor_rejected"
        | "refund_processed"
      order_status:
        | "pending"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "refunded"
      payment_gateway: "stripe" | "razorpay" | "paypal"
      payment_status:
        | "pending"
        | "paid"
        | "partially_paid"
        | "failed"
        | "refunded"
      price_type_enum:
        | "fixed"
        | "per_hour"
        | "per_day"
        | "per_person"
        | "custom"
      user_role: "customer" | "vendor" | "admin"
      vendor_verification_status:
        | "pending"
        | "verified"
        | "rejected"
        | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      message_type: ["text", "image", "document", "system"],
      notification_type: [
        "order_created",
        "order_confirmed",
        "payment_received",
        "review_received",
        "message_received",
        "system_announcement",
        "vendor_approved",
        "vendor_rejected",
        "refund_processed",
      ],
      order_status: [
        "pending",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "refunded",
      ],
      payment_gateway: ["stripe", "razorpay", "paypal"],
      payment_status: [
        "pending",
        "paid",
        "partially_paid",
        "failed",
        "refunded",
      ],
      price_type_enum: ["fixed", "per_hour", "per_day", "per_person", "custom"],
      user_role: ["customer", "vendor", "admin"],
      vendor_verification_status: [
        "pending",
        "verified",
        "rejected",
        "suspended",
      ],
    },
  },
} as const
