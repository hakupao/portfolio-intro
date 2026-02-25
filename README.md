# Portfolio Intro

一个基于 `HTML + Tailwind CDN + Vanilla JS` 的个人主页模板，采用数据驱动方式渲染内容。

当前版本已经将原本的大单文件拆分为：
- 页面结构（`index.html`）
- Tailwind 配置（`tailwind.config.js`）
- 自定义样式（`styles.css`）
- 渲染逻辑（`main.js`）
- 个人内容数据（`content.js`）

并且采用了更适合维护的约定：
- `data-bind`：给文本节点做内容绑定（替代大量 `id`）
- `data-role`：给 JS 选择器使用的挂载点（替代“语义不清”的 `id`）
- CSS 变量：集中控制字号（改字大小不需要在整页里找类名）

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

页面中的默认文案只是“占位 + 无 JS 时可见的回退内容”，真正渲染以 `content.js` 为准。

### 1) 基本信息与首页文案

在 `window.PORTFOLIO_CONTENT` 中修改：
- `pageTitle`
- `headerLabel`
- `headerLocation`
- `availabilityTitle`
- `hero.name`
- `hero.openTo`
- `hero.role`
- `hero.skill`
- `hero.specialtyLine1`
- `hero.specialtyLine2`

说明：
- `Open to / Role / Skill` 这三个标签文字目前写在 `index.html`（如果想改标签名，改 `index.html`）
- `hero.specialtyLine1/2` 是 Hero 下方的两行补充说明；如果不需要，可以设为空字符串（会自动隐藏）

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
  - 先加载配置脚本，再加载 Tailwind CDN（模板里已按此顺序处理）
  - 颜色主题（`primary`, `accent`, `background`）
  - 字体（`JetBrains Mono`）
  - 动画（`blink`, `heartbeat`）
- `styles.css`
  - 顶部 `:root` 的字号变量（推荐优先改这里）
  - CRT 扫描线叠层
  - 扫描条动画
  - 项目悬停位移动画

### 快速改字号（推荐入口）

打开 `styles.css` 顶部的 `:root`，常用变量：
- `--font-size-hero`
- `--font-size-hero-location`
- `--font-size-type-line`
- `--font-size-project-title`
- `--font-size-contact-link`

这样改字体大小时，不需要在 `index.html` / `main.js` 里找很多 `text-*` 类。

## 为什么 `class` 可以很多，但 `id` 不应该满天飞？

- `class` 多（尤其 Tailwind）是正常的：每个类只负责一个小样式，组合起来形成界面。
- `id` 应该少：它是全局唯一，通常用于锚点、表单关联、少量 JS 挂载点。
- 如果只是给 JS 找元素做数据绑定，更推荐 `data-*`（比如 `data-bind`, `data-role`）。

这个模板现在就是按这个思路整理的，适合作为学习 `HTML + CSS + JS + Tailwind` 的案例。

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
