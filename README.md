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

### 其他编辑器

此插件不仅对默认编辑器提供了输入支持，其他编辑器也可以使用 KaTeX 语法，并实现在文章中渲染，块级公式使用 `$$` 包裹，行内公式使用 `$` 包裹 即可。

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
