# 后端

## 运行：

``` bash
cd serverDeemo/

npm install 或 yarn(推荐)

# http://localhost:3000/
npm start
```

## 数据库（MongoDB）

- 使用了Robo3T，连接地址：
> http://localhost:27017/deemo

- 具体键值对形式与js文件写在mongodb-data内

``` bash
|- deemo // Database名
    |- sessions  //存储sessions
    |- test      //其实是装备的Collections
    |- users     //存储账号信息
```

## 目录

``` bash
serverDeemo
    ├── app.js // 入口文件
    ├── bin
    │   └── www // 运行文件
    ├── package.json
    ├── public // 静态文件
    │   ├── images // 存储upload图片文件夹
    │   ├── javascripts // koa-generation默认生成文件夹
    │   └── stylesheets // koa-generation默认生成文件夹
    │       └── style.css // koa-generation默认css
    ├── routes // koa-router
    │   ├── index.js // 存储
    │   └── users.js // 登陆/注册相关
    ├── views // koa-generation默认生成文件夹x

```