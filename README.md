# ✨ MuMu Configurator | MuMuBot 配置终端

<div align="center">
  <br/>
  <h1>🍬 WONDERHOY! 🍬</h1>
  <p>
    <b>一个充满活力、可爱治愈的 AI 机器人配置面板</b>
  </p>
  <p>
    让 AI 不再冰冷，打造你专属的“姆姆”贴心伙伴！
  </p>
  <br/>
</div>

## 📖 项目背景 (Inspiration)

本项目 **MuMu** 的灵感来源于 **SEGA × Colorful Palette** 旗下游戏 **《世界计划：缤纷舞台！ feat. 初音未来》 (Project SEKAI)** 中的角色 —— **凤笑梦 (Emu Otori / 鳳えむ)**。

我们被 Emu 那种**“Wonderhoy (哇哈哈)”**的无限活力、天马行空的想象力以及想要“让全世界绽放笑容”的纯真愿望所打动。因此，我们开发了这个项目，旨在通过先进的 LLM (大语言模型) 技术，在数字世界中还原一位像 Emu 一样温暖、有趣、偶尔有点小迷糊的 AI 伙伴。

> *⚠️ 声明：本项目为粉丝同人作品，与《世界计划》官方无关。角色形象版权归原版权方所有。*

## 🚀 功能亮点 (Features)

**MuMu Configurator** 是 MuMu AI 核心的可视化控制台，它让复杂的 AI 配置变得像玩游戏一样简单：

*   **🧠 思维核心 (Model Core)**
    *   支持 **DeepSeek (R1/V3)**、**OpenAI (GPT-4o)**、**Google Gemini** 等顶尖模型。
    *   独创的**任务分流系统**：让高智商模型负责思考（Planner），高情商模型负责回复（Replyer），免费模型处理杂活，实现**超高性价比**。

*   **🎭 性格调校 (Personality)**
    *   内置 Emu 风格的 Prompt 模板，预设了“活力满满”、“甚至会偷表情包”的可爱性格。
    *   支持自定义昵称、说话风格、兴趣爱好，打造独一无二的人设。

*   **🔧 傻瓜式部署 (Easy Deploy)**
    *   告别枯燥的代码修改！在网页上点点选选，即可一键生成 Python 核心所需的 `config.toml` 配置文件。
    *   内置详细的 **唤醒教程**，手把手教你从安装 Python 到配置 NapCatQQ。

*   **💖 情绪与记忆 (Mood & Memory)**
    *   **LPMM 记忆系统**：她会记得你们之前的聊天内容，建立长期羁绊。
    *   **拟人化情绪**：拥有独立的情绪波动系统，会开心也会委屈（甚至会用可爱的语气反驳你！）。

## 🛠️ 技术栈 (Tech Stack)

本项目前端采用现代化的 Web 技术构建：

*   **框架**: [React 19](https://react.dev/)
*   **构建工具**: [Vite](https://vitejs.dev/)
*   **样式**: [Tailwind CSS](https://tailwindcss.com/) (配合 Emu 主题色 `pink-500` & `yellow-400`)
*   **图标**: [Lucide React](https://lucide.dev/)

## 🏃‍♂️ 快速开始 (Quick Start)

### 1. 启动配置面板

确保你安装了 Node.js 环境，然后执行：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问 `http://localhost:5173`，你将看到可爱的开屏动画！

### 2. 导出配置

1.  在网页左侧菜单选择 **“思维核心”**，填入你的 API Key。
2.  在 **“身份设定”** 中调整你喜欢的性格。
3.  进入 **“配置文件”** 页面，点击复制 `config.toml` 和 `model_config.toml`。

### 3. 唤醒 MuMu (Python 核心)

请下载本项目的 Python 后端核心（MuMu Core），将复制的配置文件覆盖到项目根目录，然后运行：

```bash
# 安装 Python 依赖
pip install -r requirements.txt

# 启动机器人
python main.py
```

*详细步骤请参考网页内的【唤醒教程】模块。*

## 🤝 参与贡献

如果你也喜欢 Emu，或者对 AI 开发感兴趣，欢迎提交 Issue 或 PR！让我们一起让 MuMu 变得更聪明、更可爱！

## 📞 联系作者

*   **QQ**: 3374364602
*   **交流群**: 1050548419

---

<div align="center">
  <p>Made with ❤️ and Wonderhoy!</p>
</div>
