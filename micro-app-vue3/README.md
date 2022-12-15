vite 创建 vue3 开发环境

- npm init @vitejs/app
- 选择开发模板

直接创建模板 npm init @vitejs/app vite-vue3-starter --template vue-ts

npm 7+（需要额外的双横线） npm init @vitejs/app vite-vue3-starter -- --template vue-ts

增加 eslint 来规范 typescript 及 vue yarn add eslint eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin -D -- eslint: ESLint 的核心代码 -- eslint-plugin-vue：ESLint 关于检测 vue 代码规范的插件 -- @typescript-eslint/parser：ESLint 的解析器，用于解析 typescript，从而检查和规范 Typescript 代码 -- @typescript-eslint/eslint-plugin：这是一个 ESLint 插件，包含了各类定义好的检测 Typescript 代码的规范

结合 prettier 和 eslint yarn add prettier eslint-config-prettier eslint-plugin-prettier -D prettier：prettier 插件的核心代码 eslint-config-prettier：解决 ESLint 中的样式规范和 prettier 中样式规范的冲突，以 prettier 的样式规范为准，使 ESLint 中的样式规范自动失效 eslint-plugin-prettier：将 prettier 作为 ESLint 规范来使用

集成 vue-router npm install vue-router@4

集成 vuex npm i vuex@next

使用 element-plus npm i element-plus

使用 prettier 优化代码

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false
}
```

npm i prettier -D

# 格式化所有文件（. 表示所有文件）

npx prettier --write .

集成 eslint 配置 npm i eslint -D 初始化 eslint 配置 npx eslint --init

解决 eslint 与 perttier 的冲突 npm i eslint-plugin-prettier eslint-config-prettier -D 并在 eslintrc.js 中添加 extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],

集成 husky 和 lint-staged

npx husky-init && npm install

解析 jsx "@vitejs/plugin-vue-jsx": "^1.3.0",

tsconfig 中配置

```json
// 不配置则ts找不到对应路径
// import Test from '@/components/Test'
"baseUrl": ".",
"paths": {
"@/*": [
  "./src/*"
  ]
}
```

按需导入 element-plus npm install unplugin-vue-components
