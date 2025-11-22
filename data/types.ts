
export interface TalkValueRule {
  target: string;
  time: string;
  value: number;
}

export interface BotConfig {
  // Basic
  platform: string;
  qq_account: string;
  nickname: string;
  alias_names: string[];
  
  // Personality
  personality: string;
  reply_style: string;
  interest: string;
  plan_style: string;
  visual_style: string;
  
  // States
  states: string[];
  state_probability: number;

  // Security
  allowed_groups: string[];
  allowed_users: string[];
  ban_words: string[];

  // Chat Behavior
  talk_value: number; // Base talk value
  enable_talk_value_rules: boolean;
  talk_value_rules: TalkValueRule[];
  mentioned_bot_reply: boolean;
  max_context_size: number;
  planner_smooth: number;

  // Learning & Expression
  enable_group_learning: boolean;
  enable_private_learning: boolean;
  
  // Emoji
  emoji_chance: number;
  steal_emoji: boolean;
  check_interval: number; // seconds

  // Mood
  enable_mood: boolean;
  mood_update_threshold: number;
  emotion_style: string;

  // Humanization
  enable_typo: boolean;
  typo_error_rate: number;
  enable_splitter: boolean;
  splitter_max_length: number;

  // Knowledge
  enable_knowledge: boolean; // LPMM
  
  // Other
  enable_asr: boolean;
}

export interface ApiProvider {
  id: string;
  name: string;
  base_url: string;
  api_key: string;
  client_type: string;
}

export interface ModelDef {
  id: string;
  model_identifier: string;
  name: string;
  api_provider_name: string;
  enable_thinking: boolean;
  price_in?: number;
  price_out?: number;
  description?: string;
  is_vision?: boolean;
}

export interface TaskSetting {
  model_list: string[];
  temperature: number;
  max_tokens: number;
}

export interface TaskConfig {
  utils: TaskSetting;
  utils_small: TaskSetting;
  tool_use: TaskSetting;
  replyer: TaskSetting;
  planner: TaskSetting;
  vlm: TaskSetting;
  voice: TaskSetting;
  embedding: TaskSetting;
  lpmm_entity_extract: TaskSetting;
  lpmm_rdf_build: TaskSetting;
  lpmm_qa: TaskSetting;
  [key: string]: TaskSetting;
}

export interface AppState {
  bot: BotConfig;
  providers: ApiProvider[];
  models: ModelDef[];
  tasks: TaskConfig;
}
