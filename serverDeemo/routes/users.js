const router = require('koa-router')()
const Monk = require('monk'); 
const url = 'localhost:27017/deemo';
const mongodb = Monk(url);
const crypto = require("crypto");

const item = mongodb.get('test');
const test = mongodb.get('users');
const session = mongodb.get('sessions');

// 挂载api路径
router.prefix('/api')

/** 
* 登陆 
* @api {
*     username {String} 
*     password {String}
*   } 
* }
* @returns {
*    username  {String}  用户名
*    role  {String}   权限
*    store  {String}   存储
*    code  {Number}     0—succuss，1-failure 
*    status  {String}   状态
*    error  {String}   错误
* }
* 
*/
router.post('/login',  async (ctx, next) => {
  let data,tempJudge;
  let cookie = `koa:sess:${ctx.cookies.get('koa:sess')}`;
  if(cookie === 'koa:sess:undefined') {
    let { username, password } = ctx.request.body;
    
    let md5 = crypto.createHash("md5");
    md5.update(password);
    let checkMd5 = md5.digest("hex");

    data = await test.find({
      'username': username
    });
    
    if(data.length !== 0) {
      if(data[0].password === checkMd5) {
        ctx.session = {
          'username' : data[0].username,
          'role': data[0].role,
        }
        ctx.body = {
          "username": data[0].username,
          "role": data[0].role,
          "code" : 0,
          "store": data[0].store
        }
      } else {
        ctx.body = {
          'error' : 'ERROR!',
          'code':1
        }
      }
    }
  } else {
    tempJudge = await session.find({
      'sid': cookie
    });
    if(tempJudge[0].sid === cookie) {
      ctx.body = {
        'code': 0,
        "username": tempJudge[0].username,
        "role": tempJudge[0].role,
        'status': 'logining',
      }
    } else {
      ctx.body = {
        'code': 1,
        'error' : 'ERROR!'
      }
    }
    
  }
  return ctx.body

})

// 进入网页时的cookie/session检查
/** 
* 登陆 
* @api {}
* @returns {
  *    username  {String}  用户名
  *    role  {String}   权限
  *    store  {String}   存储
  *    code  {Number}     0—succuss，1-failure 
  *    status  {String}   状态
  *    error  {String}   错误
  * }
  * 
  */
router.post('/loginCheck',  async (ctx, next) => {
  let cookie = ctx.cookies.get('koa:sess');
  let data, store;
  if(!cookie) {
    ctx.body = {
      'code': 1,
      'error' : 'ERROR!'
    }
  } else {
    data = await session.find({
      'sid': `koa:sess:${cookie}`
    });
    if (data !== []) {
      store = await test.find({
        'username': data[0].username
      });
      console.log(store)
      ctx.body = {
        "username": data[0].username,
        "role": data[0].role,
        "store": store[0].store,
        'status': 'logining',
        'code': 0,
      }
      console.log(data)
    } else {
      ctx.body = {
        'code': 1,
        'error' : 'ERROR!'
      }
    }
    
  }
  return ctx.body

})

/** 
* 注销
* @api {}
* @returns {
  *    code  {Number}     0—succuss，1-failure 
  *    status  {String}   状态
  *    error  {String}   错误
  * }
  * 
  */
router.post('/loginout',  async (ctx, next) => {
  let cookie = ctx.cookies.get('koa:sess');
  console.log(cookie)

  if(cookie) {
    ctx.session = null;
    ctx.body = {
      'code': 0,
      'status' : 'loginout'
    }
  } else {
    ctx.body = {
      'code': 1,
      'error' : 'ERROR!'
    }
  }
})

/** 
* 注册
* @apis {
*     username {String} 
*     password {String}
*     passwordCheck {String}
*   } 
* }
* @returns {
  *    username  {String}  用户名
  *    role  {String}   权限
  *    store  {String}   存储
  *    code  {Number}     0—succuss，1-failure 
  *    status  {String}   状态
  *    error  {String}   错误
  * }
  * 
  */
router.post('/signup',  async (ctx, next) => {
  let cookie = ctx.cookies.get('koa:sess');
  let { username, password, passwordCheck} = ctx.request.body;
  let checkuser = await test.find({
    'username': username
  })
  console.log(checkuser)

  if(password !== passwordCheck ) {
    ctx.body = {
      'code': 1,
      'error' : 'password ERROR!',
      'status': 'password error'
    }
    return ctx.body
  }
  if(checkuser.length===0) {
    if(cookie) {
      ctx.body = {
        'code': 1,
        'error' : 'ERROR!',
        'status': 'logined'
      }
    } else {
      let md5 = crypto.createHash("md5");
      md5.update(password);
      let passwordMd5 = md5.digest("hex");

      let signin = await test.insert({ 
        "username": username,
        'password': passwordMd5,
        'type': 'user',
        "role": "2",
        "store": []
      })
      ctx.session = {
        'username' : username,
        'role': "2"
      }
      ctx.body = {
        'code': 0,
        "username": username,
        "role": "user",
        "store": []
      }
    }
  } else {
    ctx.body = {
      'code': 1,
      'error' : 'username EXIST',
      'status': 'signin failure'
    }
  }
  
})

/** 
*处理上传数据
* @apis {
*  itemdata {Object}
*** e.g -----------
* itemdata {Object} {
*  name,               {String}
*  type,               {String}
*  component,         {String}
*  nickname,           {String}
*  baseAttributes,     {String}
*  exAtrributes,       {String}
*   seriesAtrributes,   {String}
*   description,        {String}
*   url,                {String}
* }
*---------------------
* @returns {
*    code  {Number}     0—succuss，1-failure 
*    status  {String}   状态
*    error  {String}   错误
* }
* 
*/
router.post('/upload',  async (ctx, next) => {

  let cookie = ctx.cookies.get('koa:sess');
  if(!cookie) {
    return ctx.body = {
      'code': 1,
      'error' : 'ERROR!'
    }
  }

  let imgURL = '', img = '';
  let urlReg = /[\w]*.((png)|(jpg)|(jpeg))/g;
  let check; 
  
  check = await item.find({
    "name": ctx.request.body.name,
  });


  if(check.length !== 0) {
    return ctx.body = {
      'code': 1,
      'error' : 'EXIST',
    }
  }

  img = ctx.request.files.imgFile.path.match(urlReg);
  imgURL = `http://localhost:8000/images/${img}`;

  check = await item.insert({ 
    "name": ctx.request.body.name,
    "type": ctx.request.body.type,
    "component": ctx.request.body.component,
    "nickname": ctx.request.body.nickname,
    "baseAttributes": ctx.request.body.baseAttributes,
    "exAtrributes": ctx.request.body.exAtrributes,
    "seriesAtrributes": ctx.request.body.seriesAtrributes,
    "description": ctx.request.body.description,
    "url": imgURL,
    "rare": "史诗"
  }) 

  console.log(ctx.request.files.imgFile.path)
  ctx.body =  {
    "code": 0,
    "status": "insert success"
  }
})


/** 
* 存储用户数据
* @apis {
*   item {Object}
*   username {String}
* }
* @returns {
*    code  {Number}     0—succuss，1-failure 
*    status  {String}   状态
*    error  {String}   错误
* }
*/
router.post('/store',  async (ctx, next) => {
  let cookie = ctx.cookies.get('koa:sess');
  let req_item = ctx.request.body[0], username = ctx.request.body[1];
  let id, update, checkuser;
  id = req_item._id

  if(!cookie) {
    console.log(cookie)
    return ctx.body = {
      'code': 1,
      'status' : 'ERROR!'
    }
    
  } else {
    update = await item.find({
      "_id": id
    })
    checkuser = await test.find({
      "username": username
    })
    if(update.length === 0 || checkuser.length === 0) {
      return ctx.body = {
        'code': 1,
        'status' : 'ERROR!'
      }
    }
    for(let i = 0; i < checkuser[0].store.length; i++) {
      if(checkuser[0].store[i].name === req_item.name) {
        return ctx.body = {
          'code': 1,
          'status' : 'ERROR!'
        }
      }
    }
    checkuser[0].store.push(req_item)

    update = await test.update({'username': username},{$set:{'store': checkuser[0].store}})
    console.log(update);
    ctx.body = {
      'code': 0,
      'error' : 'store sucess'
    }
  }
})

/** 
* 删除用户数据
* @apis {
*   item {Object}
*   username {String}
* }
* @returns {
  *    code  {Number}     0—succuss，1-failure 
  *    status  {String}   状态
  *    error  {String}   错误
  * }
  */
router.post('/delete',  async (ctx, next) => {
  let cookie = ctx.cookies.get('koa:sess');
  let req_item = ctx.request.body[0], username = ctx.request.body[1];
  let id, update, checkuser;
  id = req_item._id

  if(!cookie) {
    console.log(cookie)
    return ctx.body = {
      'code': 1,
      'status' : 'ERROR!'
    }
  } else {
    update = await item.find({
      "_id": id
    })
    checkuser = await test.find({
      "username": username
    })
    if(update.length === 0 || checkuser.length === 0) {
      return ctx.body = {
        'code': 1,
        'status' : 'ERROR!'
      }
    }
    for(let i = 0; i < checkuser[0].store.length; i++) {
      if(checkuser[0].store[i].name === req_item.name) {
        checkuser[0].store.splice(i, 1);
        console.log(checkuser[0].store)
        break;
      }
    }
    update = await test.update({'username': username},{$set:{'store': checkuser[0].store}})
    console.log(update);
    ctx.body = {
      'code': 0,
      'error' : 'delete sucess'
    }
  }
})

module.exports = router
