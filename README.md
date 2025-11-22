
<div align="center">
  <h1>MuMu Configurator</h1>
</div>

<div align="center">

![Version](https://img.shields.io/badge/Version-6.25.0-ff2e85?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![React](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)

</div>

**MuMu Configurator** 是专为 **MuMu AI Core** 打造的现代化可视化配置终端。

通过直观的 Web 界面，您可以轻松管理复杂的 LLM 机器人配置、编排多模型任务流，并对拟人化人格参数进行精细微调。

## ⚡ 核心特性

*   **多模型协同 (Model Orchestration)**
    *   **智能分流**：基于任务复杂度，自动将逻辑规划 (Planner)、文本生成 (Replyer) 和 基础处理 (Utils) 分配给 DeepSeek、GPT-4o 或 Gemini 等不同模型，实现成本与效果的最优平衡。
    *   **全平台支持**：完美兼容 DeepSeek (R1/V3)、OpenAI、SiliconFlow、Google Gemini 等主流 API。

*   **可视化配置 (Visual Configuration)**
    *   提供结构化的表单界面，替代繁琐的 YAML/TOML 手动编辑。
    *   支持一键生成适配 MuMu Python Core 的标准化配置文件 (`config.toml`)。

*   **拟人化系统 (Persona & Memory)**
    *   **LPMM 记忆模块**：可视化的长期记忆与知识库配置。
    *   **动态情绪引擎**：支持配置情绪波动阈值、性格状态 (States) 切换概率及文本风格微调。

## 🎨 灵感与设定 (Character Inspiration)

MuMu 的人格原型来自《世界计划》中的 **凤 笑梦 (Otori Emu)**。
Wonderhoy！🍬

## 🚀 快速开始

### 1. 安装与运行

```bash
# 克隆项目
git clone https://github.com/LM-TUki/mumu-configurator.git

# 进入目录
cd mumu-configurator

# 安装依赖
npm install

# 启动控制台
npm run dev
```

### 2. 使用指南

1.  **准备环境**：访问 `http://localhost:5173` 进入控制台。
2.  **配置模型**：在“思维核心”中填入 API Key 并分配模型任务。
3.  **部署**：在“配置文件”页面生成代码，覆盖 MuMu Core 的 `config.toml`。
4.  **唤醒**：运行 MuMu Core，开始对话。

---

*   **Author**: LM-TUki
*   **Contact**: QQ 3374364602
*   **Disclaimer**: 角色形象 (Emu Otori) 版权归 SEGA / Colorful Palette 所有。
