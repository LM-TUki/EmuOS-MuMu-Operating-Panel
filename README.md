# MuMu Configurator

![Version](https://img.shields.io/badge/version-6.25.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/react-19.0-61dafb.svg)

**MuMu Configurator** 是专为 MuMu AI Core 设计的现代化可视化配置终端。它提供了一个直观的 Web 界面，用于管理复杂的 LLM 机器人配置、编排多模型任务流以及微调拟人化人格参数。

## 📖 项目背景

本项目的设计理念与核心人格（MuMu）灵感来源于 **《世界计划：缤纷舞台！》** 中的角色 **凤笑梦 (Emu Otori)**。

我们致力于探索 LLM 在情感陪伴与拟人化交互领域的可能性，通过先进的模型编排技术，构建一个既具备高逻辑推理能力，又拥有温暖、活力性格特征的 AI 智能体。

> *Disclaimer: 本项目代码为开源实现，角色形象版权归 SEGA / Colorful Palette 所有。*

## ⚡ 核心特性

本控制台旨在降低 AI 机器人的部署与调试门槛，核心功能包括：

*   **多模型协同编排 (Model Orchestration)**
    *   支持异构模型接入：集成 **DeepSeek (R1/V3)**、**OpenAI (GPT-4o)**、**Google Gemini** 等主流 API。
    *   **智能任务路由**：基于任务复杂度自动分流。将逻辑规划 (Planner) 分配给推理模型，将文本生成 (Replyer) 分配给高情商模型，将基础处理 (Utils) 分配给低成本模型，实现性能与成本的最优平衡。

*   **可视化配置管理 (Visual Configuration)**
    *   提供结构化的表单界面，替代繁琐的 YAML/TOML 手动编辑。
    *   支持一键生成适配 MuMu Python Core 的 `config.toml` 与 `model_config.toml` 配置文件。

*   **拟人化与记忆系统 (Persona & Memory)**
    *   **LPMM (Long-term Persona Memory Module)**：可视化的长期记忆与知识库开关配置。
    *   **动态情绪引擎**：支持配置情绪波动阈值、性格状态 (States) 切换概率及文本风格微调。

## 🛠️ 技术栈

*   **Core**: React 19, TypeScript
*   **Build**: Vite
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React

## 🚀 快速开始

### 环境要求
*   Node.js >= 18.0.0
*   npm 或 yarn

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/LM-TUki/mumu-configurator.git

# 进入目录
cd mumu-configurator

# 安装依赖
npm install

# 启动本地开发服务器
npm run dev
```

启动后，访问 `http://localhost:5173` 即可进入配置终端。

## 📖 使用指南

1.  **模型配置**：在“思维核心”模块中配置 API Provider（如 DeepSeek、OpenAI）及各任务对应的模型列表。
2.  **人格设定**：在“身份设定”模块中微调 System Prompt、回复风格及安全白名单。
3.  **部署生成**：进入“配置文件”页面，系统将自动校验数据并生成标准化的 TOML 配置文件。
4.  **核心对接**：将生成的配置文件覆盖至 MuMu Python Core 的根目录及 `config/` 目录下，即可完成部署。

## 🤝 贡献与支持

欢迎提交 Issue 或 Pull Request 改进本项目。

*   **Author**: LM-TUki
*   **Contact**: QQ 3374364602

---
© 2024 MuMu Bot Project. All Rights Reserved.