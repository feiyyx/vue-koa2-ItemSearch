# 前端
## 运行：

``` bash
cd frontDeemo/

npm install 或 yarn(推荐)

# http://localhost:8080/
npm run serve
```

## 目录

``` bash
frontDeemo
    ├── src
    │   ├── App.vue     // 主组件
    │   ├── assets   // vue-cli的logo
    │   │   └── logo.png
    │   ├── components      //子组件文件
    │   │   ├── cloak.vue       // 遮罩层+许愿选择层
    │   │   ├── loginSignupForm.vue         // 登陆/注册界面
    │   │   ├── pond.vue        // 许愿池
    │   │   └── searchBar.vue       // 搜索栏
    │   ├── config      //配置文件
    │   │   └── api.js      // 后端路径端口
    │   ├── page        // 页面文件
    │   │   ├── addItem.vue         // 添加装备信息
    │   │   └── index.vue       // 目录
    │   ├── router      //vue-router
    │   │   └── router.js       // router配置
    │   ├── store       // vuex
    │   │   ├── actions.js          // action
    │   │   ├── index.js        // state
    │   │   └── mutations.js        //mutation
    │   └── tools
    │   │   └── utils.js        // 自己写的工具
    │   ├── main.js         //入口文件
    ├── static      // 静态文件
    │   ├── css
    │   │   └── main.css        // 通用样式
    │   └── images      // 测试用图片
    ├── vue.config.js       // vue-cli配置
    ├── index.html
    └── package.json
```