[English](./README.md) | 简体中文

<h1 align="center">Ant Design Pro Vue</h1>

<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>

<div align="center">

[![Backers on Open Collective](https://opencollective.com/ant-design-pro-vue/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/ant-design-pro-vue/sponsors/badge.svg)](#sponsors) [![License](https://img.shields.io/npm/l/package.json.svg?style=flat)](https://github.com/sendya/ant-design-pro-vue/blob/master/LICENSE)
[![Release](https://img.shields.io/github/release/sendya/ant-design-pro-vue.svg?style=flat)](https://github.com/sendya/ant-design-pro-vue/releases/latest)
[![Travis branch](https://travis-ci.org/sendya/ant-design-pro-vue.svg?branch=master)](https://travis-ci.org/sendya/ant-design-pro-vue)

</div>

- 预览: https://panshengxi.com
- 首页: https://panshengxi.com
- 文档: https://panshengxi.com/docs/getting-started
- 更新日志: https://panshengxi.com/docs/changelog
- 常见问题: https://panshengxi.com/docs/faq
- 分支: 
  - feature/demand_load: 按需加载 Antd 组件

Overview
----

基于 [Ant Design of Vue](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/) 实现的 [Ant Design Pro](https://pro.ant.design/) 


环境和依赖
----

- node
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现



项目运行
----

- 安装依赖
```
npm install
```

- 开发模式运行
```
npm run serve
```

- 编译项目
```
npm run build
```

- Lints and fixes files
```
npm run lint
```



其他说明
----

- **关于 Issue 反馈 (重要!重要!重要!) 请在开 *Issue* 前，先阅读该内容：[Issue / PR 编写建议](https://github.com/sendya/ant-design-pro-vue/issues/90)** 

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请更新您的 cli

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码, `vue.config.js` 下的 `lintOnSave` 值改为 `false`

- 开启组件按需加载 `/src/main.js` L7 修改为 `import '@/components/antd.js'`

- 修改 Ant Design 配色，在文件 `vue.config.js` 中，其他 less 变量覆盖参考 [ant design](https://ant.design/docs/react/customize-theme-cn) 官方说明
```ecmascript 6
npm install style-resources-loader vue-cli-plugin-style-resources-loader less-loader less -S
 pluginOptions: {
    'style-resources-loader': {//配置less
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/common.less')]
    }
  }
```
