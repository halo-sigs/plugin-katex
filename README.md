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
此插件安装之后，文章页使用KaTeX.js渲染公式，插件支持2个配置项。
1. inline_selector
   
CSS-Selector语法，用来查找渲染的行内公式Dom。

默认值为：`[math-inline]`（本插件扩展默认编辑器生成的行内公式Dom），如需兼容其他编辑器，则设置为相应的Selector即可。

example:

bytemd: `.math-inline`

stackedit: `.katex--inline`

如同时使用多个编辑器，CSS Selector之间用`,`隔开即可。

example：`[math-inline],.math-inline,.katex--inline`

2. display_selector

CSS-Selector语法，用来查找渲染的块级公式Dom。

默认值为：`[math-display]`

bytemd: `.math-display`

stackedit: `.katex--display`

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
