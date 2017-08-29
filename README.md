# coding-task Coding任务管理系统

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Follow)](https://github.com/willin)

前端基于Vue/Vuex/Vuetify,通过Mockjs模拟测试数据,后端基于Sequelize/Koa的Coding团队任务管理系统. 一个完全前后端分离的完整项目演示.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [TODOs](#todos)
  - [UI](#ui)
  - [功能](#%E5%8A%9F%E8%83%BD)
- [前端](#%E5%89%8D%E7%AB%AF)
  - [技术及框架](#%E6%8A%80%E6%9C%AF%E5%8F%8A%E6%A1%86%E6%9E%B6)
  - [目录结构](#%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84)
  - [路由设计](#%E8%B7%AF%E7%94%B1%E8%AE%BE%E8%AE%A1)
- [服务器端](#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%AB%AF)
  - [技术及框架](#%E6%8A%80%E6%9C%AF%E5%8F%8A%E6%A1%86%E6%9E%B6-1)
  - [项目结构](#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)
  - [安装调试](#%E5%AE%89%E8%A3%85%E8%B0%83%E8%AF%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## TODOs

### UI

- 过场动画
  - [ ] 加载进度条
  - [ ] 路由切换过渡
- [ ] 四象限UI
  - [ ] 筛选 (权重, 项目, 团队, 用户, 标签, 状态等)
- [ ] 时间轴UI
  - [ ] 筛选 (与四象限大部分重叠)
- 统计模块
  - [x] 图表引入 (如:Echarts)
  - [ ] 用户统计
  - [ ] 项目统计
  - [ ] 团队综合统计

### 功能

- [x] 数组筛选方法
- [x] Webpack打包优化
- [x] 任务按时间排序
- [x] 筛选路由匹配

## 前端

### 技术及框架

包括但不限于:

- ES6/7 Vanilla JS
- ESLint (代码规范)
- Vue (MVVM框架)
- Vuex (统一状态管理)
- Vue Router (路由)
- Vuetify (UI框架)
- ECharts (常规图表框架)
- Axios (AJAX封装库)
- Mock.js (模拟数据服务)
- Babel (ES6/7代码转译浏览器可执行)
- Webpack (打包工具)

### 目录结构

```bash
.
├── build # webpack 配置目录
├── mock # 模拟数据服务器 (供前端测试)
├── public # 静态文件目录
├── server # 服务器端项目目录 (参考下面服务器端的具体目录结构)
└── src # 前端源码目录
    ├── app.vue # layout
    ├── component # 组件目录
    │   ├── timetogo.vue # 时间显示组件
    │   ├── moment # moment 组件
    │   └── ... # 其它组件
    ├── main.js # 入口文件
    ├── router # 路由
    │   ├── quadrant # 四象限路由
    │   ├── statistics # 统计路由
    │   └── timeline # 时间轴路由
    └── store # Vuex状态管理
```

### 安装调试

```bash
yarn
# 或 npm i
yarn dev
# 或 npm run dev
```

#### 注意事项

默认配置中给了一个测试应用的全部信息, 这些是不能修改的.

```js
{
  'Client ID': '613677f36f6961ef1ddc39714d51b7b2',
  'Client Secret': new Buffer('NjljOTAxZTNjMWI2ZTM1YmMxNDU0MjhlNGExMGMzYmMxYTMwMWE0NQ==', 'base64').toString(),
  'Callback URL': 'http://localhost:3993/api/coding/callback'
}
```

可以创建一个自己的应用,然后就可以任意修改配置文件了. 创建应用的地址: <https://coding.net/user/account/setting/applications>

---

带服务器端的真实环境测试:

```bash
yarn start
```

在此之前可能会需要手动同步更新所有数据:

```js
// 创建一个js文件并执行
const sync = require('./server/cron/sync');

(async () => {
  console.log(await sync());
})();
```

### 打包及产品化

创建产品环境配置文件:

```
./src/config/_production.js
```

```bash
yarn build
# or
npm run build
```

### 路由设计

```bash
/quadrant # 四象限展示
  # 复合路由
  /team/:team
  /project/:project
  /user/:user
  /status/:status
  /priority/:priority
  /deadline/:date
  /label/:label
  /order/:filter/(:order)? # :order desc/asc 默认为 desc
  # 复合路由示例
  /user/:user/project/:project
/timeline # 时间轴展示
  # 复合路由
  /team/:team
  /project/:project
  /user/:user
  /status/:status
  /priority/:priority
  /deadline/:date
  /label/:label
  /order/:filter/(:order)? # :order desc/asc 默认为 desc
  # 复合路由示例
  /user/:user/project/:project
/statistics #统计信息
  /team/:team
  /project/:project
  /user/:user
```

---

## 服务器端

获取 Coding 账号的访问令牌: <https://coding.net/user/account/setting/tokens>

需要赋予的两项权限:

- `team` 读 获取团队相关基本信息
- `project` 读 授权项目信息、项目列表，仓库信息，公钥列表、成员，任务列表

### 技术及框架

包括但不限于:

- ES6/7
- ESLint (代码规范)
- Koa (服务器框架)
- Koa Router (路由)
- Sequelize (数据库ORM)
- Cron (计划任务)
- PM2 (守护进程)

### 项目结构

```bash
.
server
├── coding.config.js # PM2 配置
├── config # 配置文件目录
│   ├── _development.js # 参考示例自行创建用于开发环境
│   └── _sample.js # 示例配置文件
├── cron # 计划任务目录
├── index.js # 服务器入口文件
├── lib # 通用类
└── model # 数据库模型
```

### 安装调试

```bash
cd server
yarn
# 或 npm i
yarn start
# 或 npm start
```
