# plugin-katex

为默认编辑器和文章渲染提供 KaTeX 支持。

## 使用方式

1. 下载，目前提供以下两个下载方式：
    - GitHub Releases：访问 [Releases](https://github.com/halo-sigs/plugin-katex/releases) 下载 Assets 中的 JAR 文件。
    - Halo 应用市场：<https://halo.run/store/apps/app-ISCsX>。
2. 安装，插件安装和更新方式可参考：<https://docs.halo.run/user-guide/plugins>。

## 用法说明

### 默认编辑器

在默认编辑器中，使用 `$` 开头和结尾的语句将会被渲染为 KaTeX 行内公式，输入 `$$` 并回车可以插入 KaTeX 块级公式。

### 文章页渲染公式

此插件安装之后，文章页使用 KaTeX.js 渲染公式，插件支持 2 个配置项。

1. 行内公式 CSS 选择器

   CSS Selector 语法，用来查找渲染的行内公式 Dom。

   默认值为：`[math-inline]`（本插件扩展默认编辑器生成的行内公式 Dom），如需兼容其他编辑器，则设置为相应的 Selector 即可。

   已知编辑器:

   [ByteMD](https://www.halo.run/store/apps/app-HTyhC)：`.math-inline`

   [StackEdit](https://www.halo.run/store/apps/app-hDXMG)：`.katex--inline`

   如同时使用多个编辑器，CSS Selector 之间用 `,` 隔开即可。

   如：`[math-inline],.math-inline,.katex--inline`

2. 块级公式 CSS 选择器

   CSS Selector 语法，用来查找渲染的块级公式 Dom。

   默认值为：`[math-display]`

   已知编辑器:

   [ByteMD](https://www.halo.run/store/apps/app-HTyhC)：`.math-display`

   [StackEdit](https://www.halo.run/store/apps/app-hDXMG)：`.katex--display`

## 开发环境

```bash
git clone git@github.com:halo-sigs/plugin-katex.git

# 或者当你 fork 之后

git clone git@github.com:{your_github_id}/plugin-katex.git
```

```bash
cd path/to/plugin-katex
```

```bash
# macOS / Linux
./gradlew pnpmInstall

# Windows
./gradlew.bat pnpmInstall
```

```bash
# macOS / Linux
./gradlew build

# Windows
./gradlew.bat build
```

修改 Halo 配置文件：

```yaml
halo:
  plugin:
    runtime-mode: development
    classes-directories:
      - "build/classes"
      - "build/resources"
    lib-directories:
      - "libs"
    fixedPluginPath:
      - "/path/to/plugin-katex"
```
