import { AppState } from './types';
import { Brain, Eye, Database, Wrench } from 'lucide-react';

export const TASK_DESCRIPTIONS: Record<string, string> = {
  utils: "通用工具 - 处理简单的格式化、提取信息等杂活。",
  utils_small: "小型工具 - 处理极简单的逻辑判断，速度优先。",
  tool_use: "工具调用 - 决定何时使用搜索、画图等功能，需要高智商模型。",
  replyer: "回复生成 - MuMu的喉咙，负责最终的对话生成，决定说话好不好听。",
  planner: "逻辑规划 - MuMu的大脑，负责思考复杂的任务流程，决定聪不聪明。",
  vlm: "视觉识别 - MuMu的眼睛，用于看图说话。",
  voice: "语音识别 - MuMu的耳朵 (ASR)。",
  embedding: "记忆检索 - 用于从长期记忆库中查找相关资料。",
  lpmm_entity_extract: "记忆整理 - 从对话中提取实体信息存入记忆。",
  lpmm_rdf_build: "知识构建 - 构建知识图谱。",
  lpmm_qa: "记忆问答 - 基于记忆回答问题。"
};

// UI Groups for Task Configuration
export const TASK_GROUPS = [
    { 
      id: 'core', 
      name: '核心大脑 (Core)', 
      description: '决定 MuMu 是否聪明、说话是否好听的核心模块',
      icon: Brain, 
      tasks: ['replyer', 'planner', 'tool_use'] 
    },
    { 
      id: 'perception', 
      name: '感知模组 (Perception)', 
      description: '视觉与听觉处理能力',
      icon: Eye, 
      tasks: ['vlm', 'voice'] 
    },
    { 
      id: 'memory', 
      name: '记忆与知识 (Memory)', 
      description: '长期记忆库的读写与检索配置',
      icon: Database, 
      tasks: ['embedding', 'lpmm_entity_extract', 'lpmm_rdf_build', 'lpmm_qa'] 
    },
    { 
      id: 'utility', 
      name: '工具杂活 (Utility)', 
      description: '处理格式化、简单逻辑判断的低成本模块',
      icon: Wrench, 
      tasks: ['utils', 'utils_small'] 
    },
];

export const INITIAL_STATE: AppState = {
  bot: {
    platform: "qq",
    qq_account: "",
    nickname: "MuMu",
    alias_names: ["姆姆", "MuMu", "小可爱"],
    personality: "是一个充满活力、乐于助人的贴心伙伴！性格开朗，喜欢和群友们互动，总是希望能帮上大家的忙。虽然偶尔会犯迷糊，但会努力改正！",
    reply_style: "说话轻松自然，偶尔使用可爱的语气词。对待问题认真负责，但在闲聊时会展现幽默的一面。",
    interest: "喜欢聊天、帮助别人解决问题、学习新知识，也喜欢听音乐和看有趣的图片。",
    plan_style: "1.在每次对话里，都要思考如何最有效地帮助伙伴解决问题。\n2.如果相同内容已经执行过，就不要再重复啦～\n3.保持逻辑清晰，步骤明确。",
    visual_style: "请用中文描述这张图片的内容。如果有文字，请把文字描述概括出来，请留意其主题，直观感受，输出为一段平文本，最多30字。",
    talk_value: 0.5,
    states: [
      "是一个活力满满、随时准备提供帮助的伙伴！",
      "是一个正在认真学习人类知识、偶尔也会好奇的小可爱！",
      "是一个温柔耐心、希望能成为大家朋友的倾听者！"
    ],
    state_probability: 0.3,
    allowed_groups: [],
    allowed_users: [],
    ban_words: [],
    
    enable_talk_value_rules: true,
    talk_value_rules: [
        { target: "", time: "00:00-08:59", value: 0.1 },
        { target: "", time: "09:00-22:59", value: 0.8 }
    ],
    mentioned_bot_reply: true,
    max_context_size: 30,
    planner_smooth: 2,
    
    enable_group_learning: true,
    enable_private_learning: true,
    
    emoji_chance: 0.4,
    steal_emoji: true,
    check_interval: 120,
    
    enable_mood: true,
    mood_update_threshold: 1,
    emotion_style: "情绪较为稳定，但遭遇特定事件的时候起伏较大",
    
    enable_typo: true,
    typo_error_rate: 0.01,
    enable_splitter: true,
    splitter_max_length: 512,
    
    enable_knowledge: true,
    enable_asr: false
  },
  providers: [
    {
      id: "prov_deepseek",
      name: "DeepSeek (官方)",
      base_url: "https://api.deepseek.com/v1",
      api_key: "sk-在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_openai",
      name: "OpenAI (官方)",
      base_url: "https://api.openai.com/v1",
      api_key: "sk-在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_google",
      name: "Google Gemini",
      base_url: "https://generativelanguage.googleapis.com/v1beta/openai",
      api_key: "在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_silicon",
      name: "SiliconFlow (硅基流动)",
      base_url: "https://api.siliconflow.cn/v1",
      api_key: "sk-在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_moonshot",
      name: "Kimi (月之暗面)",
      base_url: "https://api.moonshot.cn/v1",
      api_key: "sk-在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_zhipu",
      name: "ZhipuGLM (智谱清言)",
      base_url: "https://open.bigmodel.cn/api/paas/v4/",
      api_key: "在此填入Key",
      client_type: "openai"
    },
    {
      id: "prov_ollama",
      name: "Ollama (本地运行)",
      base_url: "http://localhost:11434/v1",
      api_key: "ollama",
      client_type: "openai"
    }
  ],
  models: [
    // --- DeepSeek Official ---
    {
      id: "mod_ds_v3",
      model_identifier: "deepseek-chat",
      name: "DeepSeek-V3",
      api_provider_name: "DeepSeek (官方)",
      enable_thinking: false,
      price_in: 2.0,
      price_out: 8.0,
      description: "官方V3，性价比极高，聪明且便宜"
    },
    {
      id: "mod_ds_r1",
      model_identifier: "deepseek-reasoner",
      name: "DeepSeek-R1",
      api_provider_name: "DeepSeek (官方)",
      enable_thinking: true,
      price_in: 4.0,
      price_out: 16.0,
      description: "官方R1，最强推理模型，适合做规划"
    },

    // --- OpenAI ---
    {
      id: "mod_gpt4o",
      model_identifier: "gpt-4o",
      name: "GPT-4o",
      api_provider_name: "OpenAI (官方)",
      enable_thinking: false,
      price_in: 30.0,
      price_out: 60.0,
      description: "综合能力最强的模型之一"
    },
    {
      id: "mod_gpt4o_mini",
      model_identifier: "gpt-4o-mini",
      name: "GPT-4o-mini",
      api_provider_name: "OpenAI (官方)",
      enable_thinking: false,
      price_in: 1.0,
      price_out: 2.0,
      description: "OpenAI的高性价比小模型"
    },
    {
      id: "mod_o1",
      model_identifier: "o1-preview",
      name: "OpenAI-o1",
      api_provider_name: "OpenAI (官方)",
      enable_thinking: true,
      price_in: 100.0,
      price_out: 400.0,
      description: "OpenAI的推理模型，极度昂贵"
    },

    // --- Google ---
    {
      id: "mod_gemini_15_pro",
      model_identifier: "gemini-1.5-pro",
      name: "Gemini-1.5-Pro",
      api_provider_name: "Google Gemini",
      enable_thinking: false,
      price_in: 25.0,
      price_out: 75.0,
      description: "Google最强模型，超长上下文"
    },
    {
      id: "mod_gemini_15_flash",
      model_identifier: "gemini-1.5-flash",
      name: "Gemini-1.5-Flash",
      api_provider_name: "Google Gemini",
      enable_thinking: false,
      price_in: 0.5,
      price_out: 1.5,
      description: "Google的高速模型，免费额度多"
    },
    
    // --- SiliconFlow ---
    {
      id: "mod_sf_v3",
      model_identifier: "deepseek-ai/DeepSeek-V3",
      name: "SF-DeepSeek-V3",
      api_provider_name: "SiliconFlow (硅基流动)",
      enable_thinking: false,
      price_in: 1.0,
      price_out: 2.0,
      description: "硅基流动的V3，速度快"
    },
    {
      id: "mod_sf_r1",
      model_identifier: "deepseek-ai/DeepSeek-R1",
      name: "SF-DeepSeek-R1",
      api_provider_name: "SiliconFlow (硅基流动)",
      enable_thinking: true,
      price_in: 4.0,
      price_out: 16.0,
      description: "硅基流动的R1"
    },
    {
      id: "mod_sf_qwen_72b",
      model_identifier: "Qwen/Qwen2.5-72B-Instruct",
      name: "SF-Qwen2.5-72B",
      api_provider_name: "SiliconFlow (硅基流动)",
      enable_thinking: false,
      price_in: 4.0,
      price_out: 14.0,
      description: "开源界最强之一，性能平衡"
    },
    {
      id: "mod_sf_qwen_7b",
      model_identifier: "Qwen/Qwen2.5-7B-Instruct",
      name: "SF-Qwen2.5-7B (免费)",
      api_provider_name: "SiliconFlow (硅基流动)",
      enable_thinking: false,
      price_in: 0.0,
      price_out: 0.0,
      description: "完全免费，适合处理杂活"
    },

    // --- Kimi ---
    {
      id: "mod_kimi_8k",
      model_identifier: "moonshot-v1-8k",
      name: "Kimi-V1 (8k)",
      api_provider_name: "Kimi (月之暗面)",
      enable_thinking: false,
      price_in: 12.0,
      price_out: 12.0
    },

    // --- Zhipu ---
    {
      id: "mod_glm_4_flash",
      model_identifier: "glm-4-flash",
      name: "GLM-4-Flash (免费)",
      api_provider_name: "ZhipuGLM (智谱清言)",
      enable_thinking: false,
      price_in: 0.0,
      price_out: 0.0,
      description: "智谱免费模型，速度极快"
    },
    {
      id: "mod_glm_4v_flash",
      model_identifier: "glm-4v-flash",
      name: "GLM-4V-Flash (免费)",
      api_provider_name: "ZhipuGLM (智谱清言)",
      enable_thinking: false,
      is_vision: true,
      price_in: 0.0,
      price_out: 0.0,
      description: "免费的视觉模型"
    },

    // --- Ollama ---
    {
      id: "mod_ollama_r1_7b",
      model_identifier: "deepseek-r1:7b",
      name: "本地-DS-R1-7B",
      api_provider_name: "Ollama (本地运行)",
      enable_thinking: true,
      price_in: 0.0,
      price_out: 0.0,
      description: "本地运行，完全免费，需要好显卡"
    },
    {
      id: "mod_ollama_qwen_7b",
      model_identifier: "qwen2.5:7b",
      name: "本地-Qwen2.5-7B",
      api_provider_name: "Ollama (本地运行)",
      enable_thinking: false,
      price_in: 0.0,
      price_out: 0.0
    }
  ],
  tasks: {
    utils: { model_list: ["SF-Qwen2.5-7B (免费)", "GLM-4-Flash (免费)"], temperature: 0.3, max_tokens: 4096 },
    utils_small: { model_list: ["SF-Qwen2.5-7B (免费)", "GLM-4-Flash (免费)"], temperature: 0.3, max_tokens: 4096 },
    tool_use: { model_list: ["SF-DeepSeek-V3", "DeepSeek-V3", "GPT-4o", "SF-Qwen2.5-72B"], temperature: 0.5, max_tokens: 2048 },
    replyer: { model_list: ["SF-DeepSeek-V3", "DeepSeek-V3", "GPT-4o-mini", "Kimi-V1 (8k)"], temperature: 1.0, max_tokens: 4096 },
    planner: { model_list: ["SF-DeepSeek-R1", "DeepSeek-R1", "OpenAI-o1", "SF-DeepSeek-V3"], temperature: 0.5, max_tokens: 2048 },
    vlm: { model_list: ["GLM-4V-Flash (免费)", "GPT-4o", "Gemini-1.5-Flash"], temperature: 0.5, max_tokens: 512 },
    voice: { model_list: ["sensevoice-small"], temperature: 0.1, max_tokens: 1024 },
    embedding: { model_list: ["bge-m3"], temperature: 0.1, max_tokens: 1024 },
    lpmm_entity_extract: { model_list: ["SF-DeepSeek-V3", "DeepSeek-V3", "GPT-4o-mini"], temperature: 0.1, max_tokens: 4096 },
    lpmm_rdf_build: { model_list: ["SF-DeepSeek-V3", "DeepSeek-V3"], temperature: 0.1, max_tokens: 4096 },
    lpmm_qa: { model_list: ["SF-DeepSeek-V3", "DeepSeek-V3"], temperature: 0.5, max_tokens: 4096 },
  }
};