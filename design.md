# Stargazer 设计报告

3100000172 楼洵  
3110000125 闫铮

## 起源

Stargazer 是一个帮助开发者管理在 GitHub 上收藏的代码库的工具. GitHub 是如今全球最大的开放代码协作平台, 数以万计的高质量代码库都在 GitHub 上进行开发和排错工作, 近年来诸多的包管理工具也都开始支持 GitHub, 如 Node.js 官方的 npm, Ruby 官方的 rubygems, 甚至 Google 开发的新语言 Go 中可以直接在 import 声明中使用 GitHub 的库地址.

GitHub 本身虽然提供了收藏 (star) 的功能, 但是浏览起来十分的不方便, 一页只能显示几十个库, 而分类只能根据库的主语言, 当收藏的数量以千计算的时候显然这种浏览方式极其不方便, 而且用户也无法根据特定的条件找出之前收藏的某个库.

作为 GitHub 的重度用户, 我们都在其上收藏了大量高质量的代码库, 而又经常受到这一功能使用不便的困扰, 因此自然萌生了开发一个方便好用的代码库收藏管理工具的想法.

## 简介

Stargazer 旨在通过以下方式帮助用户更高的整理, 检索自己的 GitHub 收藏:

- 通过 GitHub OAuth 登录, 安全可靠
- 基于 tag 的分类功能
- 可以对代码库的名称, 作者, 描述, tag等进行综合检索的功能
- 简洁, 直观的 UI
- 在手机/平板上也可以进行方便的检索

并且可能有以下扩展功能:

- 使用 GitHub 上的 follow 关系来查看朋友们的收藏, 或订阅更新
- 每日/周/月的热门代码库榜单
- 扩展至 README 的全文检索功能

## 后端

- 框架: Sinatra, 一个简洁的基于 Ruby 的为快速开发 Web 程序而设计的 DSL (和框架)
- 数据库: 倾向于使用 CouchDB, 一种用 Erlang 编写新型的文档型数据库, 无需 schema, 非常适合 GitHub API 返回的数据类型; 也可能采用传统的 MySQL 或者 PostgreSQL.
- 模板语言: Haml, 语法简洁的模板语言, 可以简化模板的开发, 同时提高代码可读性
- 部署工具: Mina, 基于 Rack 的部署工具, 我们有一套成熟的部署方案
- 调试辅助: Shotgun, 每次页面刷新都重新载入代码; byebug, 6个字母 = 断点, 极其实用的分析辅助.

后端通过一个 Ruby 框架 Sinatra，和高性能可扩展易用的 CouchDB，实现一组精致的 RESTful API。由于前端使用动态的前端框架，所以后端不用负责将数据渲染生成网页，通过理解前端的请求，返回正确的 JSON，或者对数据库做出正确的操作。

## 前端

- Ember.js: Ember.js 是一个基于 Javascript 的前端 MVC 框架，用于创建动态的 Web 应用。
- Bootstrap: Bootstrap 是一个由 Twitter 推出的简洁易用的前端框架。
- jQuery: jQuery 是一个快速简单的 JavaScript library, 它简化了HTML 文件的traversing, 事件处理、动画、Ajax 互动, 从而方便了网页制作的快速发展。

前端通过 Ember.js 同后段 RESTful API 进行交流，获取用户期望的数据，然后通过前端 jQuery 将数据动态渲染到之前使用 Bootstrap 前端框架精心设计的 HTML 页面上。
