# Portfolio Intro

一个基于 `HTML + Tailwind CDN + Vanilla JS` 的数据驱动个人主页模板。

## 技术栈

- `index.html`: 页面结构与挂载点
- `content.js`: 个人资料、项目、联系方式数据
- `main.js`: 数据绑定与交互逻辑
- `styles.css`: 视觉风格与动画（CRT、打字、滚动提示）
- `tailwind.config.js`: Tailwind 主题扩展（颜色、字体、心跳动画）

## 核心设计约定

- `data-bind`: 文本绑定路径（例如 `hero.name`）
- `data-bind-title`: 绑定 `title` / `aria-label`
- `data-role`: JS 行为挂载点（避免滥用 `id`）
- CSS 变量：集中管理字号、动画节奏

## 当前交互行为

- Hero 名字（`hero.name`）以“逐字打字机”方式出现，最终呈现为完整黑底白字块。
- `01_Selected_Works` / `02_Connect` 区块使用 `IntersectionObserver` 做滚动 reveal。
- 首屏底部显示 `SCROLL TO MORE` 引导，点击后平滑下滚；到页面底部后自动隐藏。
- 对 `prefers-reduced-motion: reduce` 提供降级，动画自动关闭。

## 文件结构

```txt
portfolio_intro/
├─ index.html
├─ content.js
├─ main.js
├─ styles.css
├─ tailwind.config.js
└─ README.md
```

## 内容维护（最常用）

主要编辑 `content.js` 中的 `window.PORTFOLIO_CONTENT`：

- `pageTitle`, `headerLabel`, `headerLocation`, `availabilityTitle`
- `hero.greetingPrefix`, `hero.name`, `hero.openTo`, `hero.role`, `hero.skill`, `hero.scrollHint`
- `hero.specialtyLine1`, `hero.specialtyLine2`
- `sections.works`, `sections.connect`
- `projects[]`, `contacts[]`, `footer.*`

说明：
- `Open to / Role / Skill` 标签名在 `index.html` 中，若要改标签文案需改 HTML。
- `hero.specialtyLine1/2` 为空字符串时会自动隐藏对应行。

## 样式与动画调参

优先编辑 `styles.css` 顶部 `:root` 变量：

- 字号：
  - `--font-size-hero`
  - `--font-size-hero-location`
  - `--font-size-type-line`
  - `--font-size-project-title`
  - `--font-size-contact-link`
- 名字打字速度：
  - `--hero-name-type-step-ms`
  - `--hero-name-type-start-delay-ms`

## 本地预览

无构建步骤，推荐两种方式：

1. 直接打开 `index.html`
2. 本地静态服务（推荐）

```powershell
python -m http.server 8000
```

访问：`http://localhost:8000`

## 发布（GitHub Pages）

仓库可直接用 GitHub Pages（`main` 分支根目录）。

常用命令：

```powershell
git status
git add .
git commit -m "Update portfolio"
git push
```

## 维护建议

- 保持 `content.js` 只放“数据”，`main.js` 只放“渲染与行为”。
- 新增交互时优先使用 `data-role` 作为挂载点。
- 新增样式优先做变量化，避免分散硬编码值。
