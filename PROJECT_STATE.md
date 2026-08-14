# AI桌游项目交接状态

> 本文档是 Codex 新旧对话之间的长期交接入口。开始开发前先阅读本文档，再以当前仓库代码和 `git status` 复核；若两者冲突，以仓库实际状态为准，并在阶段稳定后更新本文档。

## 1. 文档快照

- 最后更新：2026-08-15（Asia/Shanghai）
- 本地项目：`F:\AI\ai-tabletop-universe`
- 产品展示名：**AI桌游**（早期 PRD 名称为“AI桌游宇宙”）
- npm 包名：`ai-tabletop-universe`
- 当前稳定产品版本：**五子棋本地双人 v0.1**
- 当前开发阶段：**五子棋 AI 对战 v0.2 已完成规划，尚未开始编码**
- 当前稳定提交：`4c469868169eb641f30e95efb89238fe376e16a8`
- 提交说明：`feat: add playable gomoku v0.1`

## 2. 产品目标

本项目不是普通小游戏合集，而是面向普通桌游玩家的 **AI Native 桌游 Web 平台**。用户最终应能与 AI 或好友玩桌游，并用自然语言提出玩法或规则变化，由系统转成可校验、可执行的结构化规则。

项目同时承担作品集目标，重点证明两类能力：

1. **AI 产品经理能力**：用户问题洞察、MVP 取舍、功能和流程设计、指标与迭代判断、真实产品落地。
2. **AI Agent 产品能力**：Agent 角色和工作流、结构化输入输出、状态管理、确定性系统与大模型的权限边界。

当前推进原则：

- 先做稳定、真实可玩的游戏底座，再叠加 AI、联机和动态规则。
- 稳定性优先于功能数量，功能数量优先于视觉特效。
- 面向游客快速体验；复杂账号、商业化和社区能力不属于当前阶段。
- 五子棋是第一优先级；UNO、好友在线对战和 Rule Agent 属于后续路线。

## 3. 当前技术栈

以 `package.json` 为准：

- Next.js `16.3.0`，App Router，Turbopack 构建
- React / React DOM `19.2.8`
- TypeScript `^5`
- Tailwind CSS `^4`，通过 `@tailwindcss/postcss`
- ESLint `^9` + `eslint-config-next 16.3.0`
- npm + `package-lock.json`
- Node.js 内置 `node:test`，没有额外测试框架
- Git + GitHub

本次快照验证环境：Node.js `v26.5.0`，npm `11.17.0`。这些是本机版本，不是项目声明的强制版本；当前尚未配置 `engines` 或版本管理文件。

## 4. Git / GitHub 状态

- 当前分支：`main`
- 上游分支：`origin/main`
- 本次创建文档前，工作区干净。
- 本地 `HEAD` 与本地远程跟踪引用 `origin/main` 均为 `4c469868169eb641f30e95efb89238fe376e16a8`。
- 远程仓库：`https://github.com/ZIO-sys/ai-tabletop`
- `origin` fetch / push 地址均为上述仓库。
- 当前没有 Git tag。
- 创建本文档后，预期唯一未提交改动是新增 `PROJECT_STATE.md`；业务代码不应有变化。
- 本次任务不 commit、不 push。后续也不要在没有用户明确确认时自动 commit 或 push。

注意：上述“与 `origin/main` 一致”来自本地 Git 远程跟踪状态；开始新的发布操作前仍应根据需要联网 fetch 后复核。

## 5. 已完成：五子棋本地双人 v0.1

### 5.1 页面与体验

- 首页 `/` 与游戏大厅 `/games` 已存在。
- 游戏大厅已提供五子棋入口；UNO 仍为“即将开放”。
- `/games/gomoku` 当前直接进入本地双人对局。
- 15×15 木质棋盘，PC 端采用“棋盘 + 右侧规则/AI 区域”，手机端可纵向排列。
- 黑棋先手，黑白双方在同一设备轮流落子。
- 当前回合和已落子步数可见。
- 最后一步有视觉标记，落子有轻量动画。
- 支持悔棋和带确认弹窗的重新开始。
- 获胜后立即锁定棋盘；五连棋子同步放大、弹跳并高亮约 1.2 秒，再显示胜利弹窗。
- 胜利弹窗支持再来一局、返回大厅，以及撤销最后一步后继续。

### 5.2 游戏规则与引擎

- 使用自由五子棋：横、竖、两条斜线任一方向连续 5 颗或以上即获胜。
- 当前不实现黑棋禁手、三三、四四或长连禁手。
- 核心状态包含 `board`、`currentPlayer`、`history`、`lastMove`、`winner`、`winningCells`。
- `src/lib/gomoku/game.ts` 使用纯函数处理建盘、落子、胜负检测、悔棋和重开。
- 游戏逻辑与 React UI 已分离，为 AI Player、联机和 Rule Engine 留出扩展空间。

### 5.3 右侧预留能力

- “当前规则”卡片展示自由五子棋规则。
- “AI 助手”目前只是产品化占位，不会分析或落子。
- “告诉 AI 你想怎么玩”可以输入并提交，但只显示“后续开放”提示，不修改真实规则，也不调用外部 API。

### 5.4 主要代码位置

```text
src/app/games/gomoku/page.tsx
src/components/gomoku/
  GomokuGame.tsx
  GomokuBoard.tsx
  GameStatus.tsx
  GameControls.tsx
  RulePanel.tsx
  AiAssistantPanel.tsx
  RuleInput.tsx
  RestartDialog.tsx
  WinDialog.tsx
src/lib/gomoku/
  types.ts
  game.ts
  game.test.ts
```

### 5.5 验证基线

2026-08-15 在提交 `4c46986` 上重新验证：

- `npm test`：10/10 通过。
- `npm run lint`：通过。
- `npm run build`：通过；静态路由为 `/`、`/games`、`/games/gomoku`。

此前的 v0.1 人工验收还确认了页面布局、落子、横向五连反馈、悔棋和重新开始。新的阶段仍需重新做与改动范围相称的浏览器人工验收。

## 6. 已确认规划：五子棋 AI 对战 v0.2

### 6.1 v0.2 的产品目标

v0.2 不只是加入“电脑玩家”，而是完成第一个能清楚展示 **AI Agent 产品能力** 的可玩版本：玩家能与算法 AI 完整对弈，并看到可解释、可展开、可验证的 Agent 阶段结果。

v0.2 第一版只有一个默认难度，不提前做难度分档。

### 6.2 最终权限边界

> **AI 算法负责决策，Game Engine 负责裁决，大模型负责理解和解释。**

- 启发式评分 + Minimax 决定最终落点。
- Game Engine 在执行前再次校验落点是否合法。
- DeepSeek 不拥有修改棋盘状态或改变最终落点的权限。
- DeepSeek 故障、超时、限流或余额异常时，对局仍须正常继续；只有解释能力降级。
- 不展示冗长内部推理或思维链，只展示简短、可验证的阶段结果。

### 6.3 目标路由

```text
/games
  -> 五子棋入口

/games/gomoku
  -> 模式选择页
     - AI 对战（开放）
     - 本地双人（开放）
     - 好友对战（即将开放）

/games/gomoku/ai
  -> AI 对战

/games/gomoku/local
  -> 本地双人

/games/gomoku/online
  -> 未来的好友在线对战，v0.2 不实现
```

### 6.4 AI 对战开局

进入 `/games/gomoku/ai` 后先选择棋色：

- 玩家执黑：玩家先手。
- 玩家执白：AI 执黑先手；先完整展示 Agent 开局工作流，再自动落第一颗棋，不能直接无反馈落子。

### 6.5 AI 决策算法

第一层用启发式评分缩小搜索范围，至少考虑：

- 自己或玩家是否能直接五连；
- 活四、冲四、活三、双三；
- 进攻、防守和阻断价值；
- 中心位置价值。

从全部空位筛出约 Top 6～10 候选点，再用 Minimax + Alpha-Beta 剪枝向后搜索，兼顾棋力与响应速度。不要在 15×15 全棋盘上无差别暴力搜索。

算法应输出结构化决策摘要，例如：

```json
{
  "decisionType": "defense",
  "selectedMove": { "row": 7, "col": 10 },
  "threats": [{ "type": "open_three", "priority": "high" }],
  "candidateCount": 6
}
```

该摘要与完整 Game State 一起交给解释服务，降低“算法在防守、文案却说在进攻”一类不一致。

### 6.6 Agent Workflow UI

AI 回合右侧显示完整步骤列表：

1. 分析棋盘状态
2. 识别进攻与防守威胁
3. 评估候选落点
4. 搜索最佳策略
5. 执行落子

每步状态：等待、执行中、已完成。当前步骤高亮，已完成步骤打勾；步骤完成后可展开查看简短阶段结果，例如“检测到 1 个高优先级横向威胁”或“筛选出 6 个高价值候选点”。

### 6.7 两层 DeepSeek 解释

1. **自动短解释**：AI 每次落子后显示 1～2 句话，速度和成本优先。
2. **按需深度解释**：用户点击“为什么这样下？”后再请求，固定展示：当前局势、主要威胁、为什么选择这里、其他可选落点、下一步建议。

快速解释和深度分析计划使用两个层级的模型。具体官方模型名称在 v0.2.4 接 API 时根据当时的 DeepSeek 官方文档确认，不提前写死。

### 6.8 DeepSeek 安全与配置

- API Key 只能放在本地 `.env.local`，不得写入页面、源码、README、本文档或 GitHub。
- 当前 `.gitignore` 的 `.env*` 已覆盖 `.env.local`。
- 计划使用环境变量：`DEEPSEEK_API_KEY`、`DEEPSEEK_FAST_MODEL`、`DEEPSEEK_REASONING_MODEL`。
- 所有 DeepSeek 请求从服务端路由发起，客户端不得接触 Key。

### 6.9 分阶段交付

#### v0.2.1：路由重构与阵营选择

- 建立模式选择页。
- 将当前本地双人迁移到 `/games/gomoku/local`。
- 建立 `/games/gomoku/ai` 与黑白棋选择。
- 暂不实现真实 AI、Minimax 或 DeepSeek。

#### v0.2.2：可完整对弈的算法 AI

- 完成启发式评分、候选点生成、Minimax 和 Alpha-Beta 剪枝。
- 玩家可以与电脑完整下一局。
- 不接 DeepSeek。

#### v0.2.3：Agent Workflow UI

- 将算法执行映射为“分析 → 威胁 → 候选 → 搜索 → 落子”。
- 展示阶段状态与可展开的阶段结果。

#### v0.2.4：DeepSeek 解释

- 接入自动短解释。
- 接入“为什么这样下？”结构化深度分析。
- 做好超时、失败和降级处理。

每个小版本完成后都应先运行测试、Lint、Build 和必要的浏览器人工验收，再由用户决定是否建立独立 Git 稳定点。

### 6.10 建议的目标代码结构

```text
src/
  app/games/gomoku/
    page.tsx
    local/page.tsx
    ai/page.tsx
  app/api/ai/gomoku/
    explain/route.ts
    analyze/route.ts
  components/gomoku/
    GomokuBoard.tsx
    GameStatus.tsx
    GameControls.tsx
    ai/
      SideSelector.tsx
      AgentWorkflow.tsx
      AgentStep.tsx
      AiExplanation.tsx
      DeepAnalysis.tsx
  lib/gomoku/
    game.ts
    types.ts
    ai/
      heuristic.ts
      candidate.ts
      minimax.ts
      ai-player.ts
      analysis.ts
```

这是方向性结构，不要求机械照搬；重点是保持 Game Engine、AI Engine、LLM Service 和 UI 的职责边界，不要把 AI 算法全部写进 React 页面。

## 7. 后续产品路线（不属于当前 v0.2 范围）

- 五子棋好友在线房间与邀请链接。
- UNO 游戏及其 AI / 好友模式。
- 游客记录、登录与持久化。
- Rule Agent：自然语言转受限的 Rule JSON，经 Schema / Rule Validator 校验后由 Rule Engine 执行。
- AI 陪练、玩法分享和基于现有游戏模板的 AI 变体创造。

长期仍坚持：LLM 负责理解和建议，确定性系统负责校验和执行。MVP 不允许 LLM 任意生成代码后直接注入运行时。

## 8. 当前已知缺口

- v0.2 的新路由、算法、Agent UI 和 DeepSeek 均未编码。
- 当前只有本地双人模式，没有 AI、好友联机、后端、数据库、账号或持久化。
- AI 助手和规则输入只是占位能力。
- 当前 GameState 没有显式“和棋/棋盘已满”状态。
- 单元测试只覆盖核心游戏引擎，没有组件测试或端到端测试。
- README 仍是 create-next-app 默认内容，尚未承担项目说明职责。
- 尚未配置 CI、部署地址、版本 tag、Node 版本约束或正式环境变量模板。

这些缺口是状态记录，不代表应在下一次任务中一次性全部处理；始终以当前小版本范围为准。

## 9. 新对话接手清单

1. 阅读本文档。
2. 在 `F:\AI\ai-tabletop-universe` 执行 `git status --short --branch`，确认没有意外改动。
3. 检查当前 `HEAD`、`package.json` 和相关源码；仓库实际状态优先于本文档。
4. 明确本次只做哪个小版本，避免把算法、Agent UI、DeepSeek 和路由一次性混做。
5. 修改前阅读仓库根目录 `AGENTS.md`；涉及 Next.js 行为时遵循其中对本地版本文档的要求。
6. 不覆盖用户已有改动，不提交密钥，不把 DeepSeek Key 发到聊天或写入仓库。
7. 完成后至少运行与风险相称的测试；稳定节点默认运行：

   ```bash
   npm test
   npm run lint
   npm run build
   ```

8. 报告修改文件、功能、验证结果和遗留问题；先等待用户人工验收。
9. 未经明确授权，不 commit、不 push。

## 10. 本文档维护规则

- 每完成一个稳定小版本，更新“当前版本、已完成、验证基线、Git 状态、已知缺口和下一步”。
- 严格区分“已完成”“已确认规划”“长期方向”，不要把规划写成现状。
- 产品决策发生变化时，记录新结论、日期和原因，不要静默删除关键历史约束。
- 不记录 API Key、访问令牌、个人代理配置或其他敏感信息。
- 保持本文档可独立阅读；新对话不应依赖旧聊天才能理解当前项目。
