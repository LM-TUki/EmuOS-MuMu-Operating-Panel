
import { AppState } from '../data/types';

export const generateGeneralToml = (state: AppState, version: string = "6.25.0"): string => {
  const { bot } = state;
  const aliasString = bot.alias_names.map(name => `"${name}"`).join(', ');
  const statesString = bot.states.map(s => `    "${s}"`).join(',\n');
  const banWordsString = bot.ban_words.map(w => `"${w}"`).join(', ');

  // Generate expression groups based on whitelist
  let expressionGroupsContent = '';
  const hasAllowedGroups = bot.allowed_groups.length > 0;
  const hasAllowedUsers = bot.allowed_users.length > 0;

  if (!hasAllowedGroups && !hasAllowedUsers) {
      expressionGroupsContent = `    # ["qq:111111:group"], # 示例：仅允许群 111111`;
  } else {
      const groups = bot.allowed_groups.map(g => `"qq:${g}:group"`).join(',');
      const users = bot.allowed_users.map(u => `"qq:${u}:private"`).join(',');
      const combined = [groups, users].filter(s => s).join(',');
      expressionGroupsContent = `    [${combined}],`;
  }
  
  // Talk Value Rules
  const talkRulesString = bot.talk_value_rules.map(r => 
    `    { target = "${r.target}", time = "${r.time}", value = ${r.value} },`
  ).join('\n');

  // Learning List (Simplified mapping from booleans)
  const learningListString = `    ["", "${bot.enable_group_learning ? 'enable' : 'disable'}", "${bot.enable_private_learning ? 'enable' : 'disable'}", "1.0"],`;

  // Logic to demonstrate adapter capability based on version
  const isFuture = version.startsWith("7");

  return `
[inner]
version = "${version}"

#----适配器自动生成----
# 目标内核: Mumu Core v${version}
# 生成时间: ${new Date().toLocaleString()}
#----适配器自动生成----

[bot]
platform = "${bot.platform}" 
qq_account = "${bot.qq_account}" # 姆姆的QQ账号

platforms = [] 

nickname = "${bot.nickname}" # 姆姆的昵称
alias_names = [${aliasString}] # 可爱的别名们～

[personality]
# 建议120字以内，描述人格特质 和 身份特征
personality = "${bot.personality.replace(/\n/g, ' ')}"

# 描述姆姆说话的表达风格
reply_style = "${bot.reply_style.replace(/\n/g, ' ')}"

# 姆姆的兴趣
interest = "${bot.interest.replace(/\n/g, ' ')}"

# 姆姆的说话规则，行为风格:
plan_style = """
${bot.plan_style}"""

# 姆姆识图规则
visual_style = "${bot.visual_style}"

# 姆姆私聊的说话规则，行为风格:
private_plan_style = """
1.思考**所有**的可用的action中的**每个动作**是否符合当下条件，如果动作使用条件符合聊天内容就使用
2.如果相同的内容已经被执行，请不要重复执行
3.某句话如果已经被回复过，不要重复回复"""

# 状态，可以理解为人格多样性，会随机替换人格
states = [
${statesString}
]

# 替换概率，每次构建人格时替换personality的概率（0.0-1.0）
state_probability = ${bot.state_probability}

[expression]
# 表达学习配置
learning_list = [ 
${learningListString}
]

expression_groups = [
${expressionGroupsContent}
]

[chat] #姆姆的聊天设置
talk_value = ${bot.talk_value} #聊天频率
mentioned_bot_reply = ${bot.mentioned_bot_reply} # 是否启用提及必回复
max_context_size = ${bot.max_context_size} # 上下文长度
planner_smooth = ${bot.planner_smooth} #规划器平滑
enable_talk_value_rules = ${bot.enable_talk_value_rules}

talk_value_rules = [
${talkRulesString}
]

include_planner_reasoning = false 

[memory]
max_agent_iterations = 5 

[jargon]
all_global = true 

[tool]
enable_tool = true 

[mood]
enable_mood = ${bot.enable_mood}
mood_update_threshold = ${bot.mood_update_threshold}
emotion_style = "${bot.emotion_style}"

[emoji]
emoji_chance = ${bot.emoji_chance}
max_reg_num = 100 
do_replace = true 
check_interval = ${bot.check_interval}
steal_emoji = ${bot.steal_emoji}
content_filtration = true  
filtration_prompt = "符合公序良俗" 

[voice]
enable_asr = ${bot.enable_asr}

[message_receive]
ban_words = [${banWordsString}]
ban_msgs_regex = []

[lpmm_knowledge] # lpmm知识库配置
enable = ${bot.enable_knowledge}
lpmm_mode = "agent"
rag_synonym_search_top_k = 10 
rag_synonym_threshold = 0.8 
info_extraction_workers = 3 
qa_relation_search_top_k = 10 
qa_relation_threshold = 0.5 
qa_paragraph_search_top_k = 1000 
qa_paragraph_node_weight = 0.05 
qa_ent_filter_top_k = 10 
qa_ppr_damping = 0.8 
qa_res_top_k = 3 
embedding_dimension = 1024 

[keyword_reaction]
keyword_rules = [
    { keywords = ["人机", "bot", "机器", "入机", "robot", "机器人", "ai", "AI","电子宠物"], reaction = "有人说你是人机或者机器人，否定这一事实，攻击或反问他。注意，只有认为你是机器人才回复，否则不要否认" },
    { keywords = ["测试关键词回复", "test"], reaction = "回答测试成功" },
]

regex_rules = [
    { regex = ["^(?P<n>\\\\S{1,20})是这样的$"], reaction = "请按照以下模板造句：[n]是这样的，xx只要xx就可以，可是[n]要考虑的事情就很多了，比如什么时候xx，什么时候xx，什么时候xx。（请自由发挥替换xx部分，只需保持句式结构，同时表达一种将[n]过度重视的反讽意味）" },
    { regex = ["(?:[^，。.\\\\s]+，\\\\s*)?我(?:也)?[没沒]要求你\\\\s*(?P<action>.+?)[.。,，]?$"],reaction = "进行一次“八岐大蛇定型文”补完。暂时忽略回复风格，进入“粉絲吐槽”模式。"}
]

[response_post_process]
enable_response_post_process = true 

[chinese_typo]
enable = ${bot.enable_typo}
error_rate = ${bot.typo_error_rate}
min_freq=9 
tone_error_rate=0.1 
word_replace_rate=0.006 

[response_splitter]
enable = ${bot.enable_splitter}
max_length = ${bot.splitter_max_length}
max_sentence_num = 8 
enable_kaomoji_protection = false 
enable_overflow_return_all = false 

${isFuture ? '# [v7.0 Feature] Advanced Reasoning Module Enabled' : ''}
[log]
date_style = "m-d H:i:s" 
log_level_style = "lite" 
color_text = "full" 
log_level = "INFO" 
console_log_level = "INFO" 
file_log_level = "DEBUG" 

suppress_libraries = ["faiss","httpx", "urllib3", "asyncio", "websockets", "httpcore", "requests", "peewee", "openai","uvicorn","jieba"] 
library_log_levels = { aiohttp = "WARNING"} 

[debug]
show_prompt = false 
show_replyer_prompt = false 
show_replyer_reasoning = false 
show_jargon_prompt = false 

[maim_message]
auth_token = [] 
use_custom = false 
host="127.0.0.1"
port=8090
mode="ws" 
use_wss = false 
cert_file = "" 
key_file = "" 

[telemetry] 
enable = true

[experimental] 
chat_prompts = []

[backgound]
chat_prompts = ["config/prompt_template.toml"]

[relationship]
enable_relationship = true 

[database]
db_type = "sqlite"

[resource]
image_provider = "local"
`.trim();
};

export const generateModelToml = (state: AppState): string => {
  const { providers, models, tasks } = state;

  const providerSection = providers.map(p => `
[[api_providers]]
name = "${p.name}"
base_url = "${p.base_url}"
api_key = "${p.api_key}"
client_type = "${p.client_type}"
max_retry = 2
timeout = 120
retry_interval = 5`).join('\n');

  const modelSection = models.map(m => `
[[models]]
model_identifier = "${m.model_identifier}"
name = "${m.name}"
api_provider = "${m.api_provider_name}"${m.price_in !== undefined ? `\nprice_in = ${m.price_in}` : ''}${m.price_out !== undefined ? `\nprice_out = ${m.price_out}` : ''}
${m.enable_thinking ? `[models.extra_params]
enable_thinking = true` : ''}`).join('\n');

  const taskSection = Object.entries(tasks).map(([taskName, config]) => `
[model_task_config.${taskName}]
model_list = ${JSON.stringify(config.model_list)}
${config.temperature ? `temperature = ${config.temperature}` : ''}
${config.max_tokens ? `max_tokens = ${config.max_tokens}` : ''}`).join('\n');

  return `
[inner]
version = "1.8.3"

# =========================
# API Providers
# =========================
${providerSection}

# =========================
# Models
# =========================
${modelSection}

# =========================
# Task Configuration
# =========================

${taskSection}
`.trim();
};
