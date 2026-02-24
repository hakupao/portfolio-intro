# Portfolio Intro

一个基于 `HTML + Tailwind CDN + Vanilla JS` 的个人主页模板，采用数据驱动方式渲染内容。

当前版本已经将原本的大单文件拆分为：
- 页面结构（`index.html`）
- Tailwind 配置（`tailwind.config.js`）
- 自定义样式（`styles.css`）
- 渲染逻辑（`main.js`）
- 个人内容数据（`content.js`）

## 在线预览

- GitHub Pages: `https://hakupao.github.io/portfolio-intro/`

## 项目特点

- 单页静态站点，无需构建工具
- 通过 `content.js` 集中维护个人信息和项目列表
- 保留终端/CRT 风格视觉效果（扫描线、打字效果、悬停动画）
- 适合快速部署到 GitHub Pages

## 文件结构

```txt
portfolio_intro/
├─ index.html            # 页面结构（占位容器）
├─ content.js            # 个人资料 / 项目 / 联系方式（主要维护文件）
├─ main.js               # 将 content.js 渲染到页面
├─ styles.css            # CRT 扫描线、hover 等自定义样式
└─ tailwind.config.js    # Tailwind 扩展颜色、字体、动画配置
```

## 如何修改内容（最常用）

主要编辑 `content.js`。

### 1) 基本信息与首页文案

在 `window.PORTFOLIO_CONTENT` 中修改：
- `pageTitle`
- `headerLabel`
- `headerLocation`
- `availabilityTitle`
- `hero.name`
- `hero.country`
- `hero.specialtyLine1`
- `hero.specialtyLine2`

### 2) 项目列表（`projects`）

每个项目对象结构如下：

```js
{
  title: "Project Name",
  stack: "Tech / Stack / Keywords",
  description: "One-line description of what it does and why it matters.",
  href: "https://github.com/yourname/your-repo"
}
```

建议写法：
- `title`: 项目名（简洁）
- `stack`: 技术栈和关键词（利于招聘方快速扫描）
- `description`: 1 句话说明功能 + 场景/价值
- `href`: GitHub / Demo 链接

### 3) 联系方式（`contacts`）

支持 GitHub、邮箱、博客等链接：

```js
{
  label: "https://github.com/yourname",
  href: "https://github.com/yourname",
  showExternalIcon: true,
  muted: false
}
```

## 本地预览

这个项目没有构建步骤，直接打开 `index.html` 即可预览。

也可以在本地起一个静态服务器（可选）：

```powershell
# Python 3
python -m http.server 8000
```

然后访问：`http://localhost:8000`

## GitHub Pages 发布

本仓库已配置为 GitHub Pages：
- Source branch: `main`
- Folder: `/`（根目录）

首页入口文件必须是 `index.html`。

## 样式与动画调整

- `tailwind.config.js`
  - 颜色主题（`primary`, `accent`, `background`）
  - 字体（`JetBrains Mono`）
  - 动画（`blink`, `typing`, `heartbeat`）
- `styles.css`
  - CRT 扫描线叠层
  - 扫描条动画
  - 项目悬停位移动画

## 更新并推送（常用命令）

```powershell
git status
git add .
git commit -m "Update portfolio content"
git push
```

推送后 GitHub Pages 会自动重新构建并发布。

## 后续可扩展（可选）

- 增加 `Experience` / `Skills` / `Timeline` 区块
- 增加中英双语切换（在 `content.js` 中维护两套文案）
- 为项目增加 `demo` 链接或 `tag` 字段
- 为 `projects` 增加排序字段或分组展示
