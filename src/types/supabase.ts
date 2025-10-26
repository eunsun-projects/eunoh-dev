export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "12.2.3 (519615d)";
	};
	public: {
		Tables: {
			posts: {
				Row: {
					category: string | null;
					created_at: string;
					engTitle: string | null;
					id: string;
					isView: boolean;
					keywords: string[] | null;
					markdown: string | null;
					posted_at: string | null;
					summary: string | null;
					title: string | null;
				};
				Insert: {
					category?: string | null;
					created_at?: string;
					engTitle?: string | null;
					id?: string;
					isView?: boolean;
					keywords?: string[] | null;
					markdown?: string | null;
					posted_at?: string | null;
					summary?: string | null;
					title?: string | null;
				};
				Update: {
					category?: string | null;
					created_at?: string;
					engTitle?: string | null;
					id?: string;
					isView?: boolean;
					keywords?: string[] | null;
					markdown?: string | null;
					posted_at?: string | null;
					summary?: string | null;
					title?: string | null;
				};
				Relationships: [];
			};
			projects: {
				Row: {
					created_at: string;
					decisions: Json[] | null;
					description: string | null;
					ended_at: string | null;
					engTitle: string | null;
					features: string[] | null;
					github_link: string | null;
					id: string;
					images: string[] | null;
					isView: boolean | null;
					keywords: string[] | null;
					link: string | null;
					number: number | null;
					stacks: Json[] | null;
					started_at: string | null;
					title: string | null;
					troubles: Json[] | null;
				};
				Insert: {
					created_at?: string;
					decisions?: Json[] | null;
					description?: string | null;
					ended_at?: string | null;
					engTitle?: string | null;
					features?: string[] | null;
					github_link?: string | null;
					id?: string;
					images?: string[] | null;
					isView?: boolean | null;
					keywords?: string[] | null;
					link?: string | null;
					number?: number | null;
					stacks?: Json[] | null;
					started_at?: string | null;
					title?: string | null;
					troubles?: Json[] | null;
				};
				Update: {
					created_at?: string;
					decisions?: Json[] | null;
					description?: string | null;
					ended_at?: string | null;
					engTitle?: string | null;
					features?: string[] | null;
					github_link?: string | null;
					id?: string;
					images?: string[] | null;
					isView?: boolean | null;
					keywords?: string[] | null;
					link?: string | null;
					number?: number | null;
					stacks?: Json[] | null;
					started_at?: string | null;
					title?: string | null;
					troubles?: Json[] | null;
				};
				Relationships: [];
			};
			sonnygoals: {
				Row: {
					created_at: string;
					goals: number | null;
					id: number;
				};
				Insert: {
					created_at?: string;
					goals?: number | null;
					id?: number;
				};
				Update: {
					created_at?: string;
					goals?: number | null;
					id?: number;
				};
				Relationships: [];
			};
			timecapsules: {
				Row: {
					color: string;
					created_at: string;
					description: string | null;
					id: string;
					password: string | null;
					position: number[];
					title: string | null;
					updated_at: string | null;
					user_email: string;
				};
				Insert: {
					color: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					password?: string | null;
					position: number[];
					title?: string | null;
					updated_at?: string | null;
					user_email: string;
				};
				Update: {
					color?: string;
					created_at?: string;
					description?: string | null;
					id?: string;
					password?: string | null;
					position?: number[];
					title?: string | null;
					updated_at?: string | null;
					user_email?: string;
				};
				Relationships: [
					{
						foreignKeyName: "timecapsule_user_email_fkey";
						columns: ["user_email"];
						isOneToOne: false;
						referencedRelation: "users";
						referencedColumns: ["email"];
					},
				];
			};
			users: {
				Row: {
					avatar: string | null;
					created_at: string;
					email: string;
					id: string;
					isAdmin: boolean;
					nickname: string | null;
				};
				Insert: {
					avatar?: string | null;
					created_at?: string;
					email: string;
					id?: string;
					isAdmin?: boolean;
					nickname?: string | null;
				};
				Update: {
					avatar?: string | null;
					created_at?: string;
					email?: string;
					id?: string;
					isAdmin?: boolean;
					nickname?: string | null;
				};
				Relationships: [];
			};
			viewer: {
				Row: {
					author: string;
					created_at: string;
					id: string;
					img: string;
					material: string;
					nick: string;
					number: number | null;
					objurl: string;
					size: string;
					thumb: string;
					title: string;
					year: number;
				};
				Insert: {
					author?: string;
					created_at?: string;
					id?: string;
					img?: string;
					material?: string;
					nick?: string;
					number?: number | null;
					objurl?: string;
					size?: string;
					thumb?: string;
					title?: string;
					year?: number;
				};
				Update: {
					author?: string;
					created_at?: string;
					id?: string;
					img?: string;
					material?: string;
					nick?: string;
					number?: number | null;
					objurl?: string;
					size?: string;
					thumb?: string;
					title?: string;
					year?: number;
				};
				Relationships: [];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
