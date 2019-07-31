# vue-koa2-ItemSearch

# 前言

- 以前还是个网瘾少年的时候总想写一个可以查询+许愿的DNF装备查询的应用，这个坑其实很早很早以前就挖了，但是大三下真的太忙了，只有在暑假才能好好的写一写

- 写的时候不由得感慨时光过得真快，一转眼DNF已经弃坑了，身边的人也不怎么玩了，可能把这个坑填完也算是追忆一下自己的青春吧hhhhhh

- 由于是本菜鸟的练手作品，所以代码难免写得稀烂，以及还有好多可以优化的地方没有去优化，代码和命名也不那么规范，希望各位走过路过的大佬们多提宝贵意见Orz

# 技术栈

- vue2 + vuex + vue-router + webpack + koa2 + koa-body + koa-session-minimal + mongodb

- 使用了vue-cli和koa-generation两个框架

# 项目运行

## 克隆到本地

> git clone https://github.com/bailicangdu/vue2-elm.git  

## 前端运行：

```
cd frontDeemo/

npm install 或 yarn(推荐)

#http://localhost:8080/
npm run serve
```

## 后端运行：

```
cd serverDeemo/

npm install 或 yarn(推荐)

#http://localhost:3000/
npm start
```

## 数据库（MongoDB）

- 使用了Robo3T，连接地址：
> http://localhost:27017/deemo

- 具体键值对形式与js文件写在serverDeemo内

```
|- deemo // Database名
    |- sessions  //存储sessions
    |- test      //其实是装备的Collections
    |- users     //存储账号信息
```

# 预期目标

- [x] 模糊查询生成suggest列表 -- 完成
- [x] 显示查询装备的完整信息 -- 完成
- [x] 管理员/普通用户登陆 -- 完成
- [x] 使用cookie+session记录登录状态 -- 完成
- [x] 管理员向服务器上传新装备信息(包括图片) -- 完成
- [x] 装备许愿选定/取消 -- 完成
- [x] 装备许愿数据上传、保存游客许愿数据(LocalStorage) -- 完成
