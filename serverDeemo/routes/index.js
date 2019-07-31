const Router = require('koa-router');
const Monk = require('monk'); 
const url = 'localhost:27017/deemo';
const router = require('koa-router')()
const mongodb = Monk(url);
let routerRest = new Router();

const test = mongodb.get('test');
const session = mongodb.get('sessions');

/**
 * 获取装备详细信息
 * @api {JSON} {
 *     name {String} 
 *     nickname {String}
 *   } 
 * }
 * @return {JSON} 
 */
routerRest.post('/string', async (ctx, next) => {
  console.log(ctx.request.body, 'body');
  const data1 = await test.find({
    name: new RegExp(ctx.request.body.name)
  });
  ctx.body = data1; 
})



/** 
* 用于生成suggetList  
* @api {JSON} {
*     name {String} 
*     nickname {String}
*   } 
* }
* @return {Array} 
*/
routerRest.post('/name', async (ctx, next) => {
  console.log(ctx.request.body, 'body');
  let nameArray = [];
  let tempObj = {};
  const data1 = await test.find({"$or": [
    {name: new RegExp(ctx.request.body.name)},
    {nickname: new RegExp(ctx.request.body.nickname)}
  ]});
  for(let i = 0; i<data1.length; i++) {
    tempObj = {
      'name': data1[i].name,
      'id': data1[i]._id
    }
    nameArray.push(tempObj);
  };
  ctx.body = nameArray;
})


router.use('/api', routerRest.routes(), routerRest.allowedMethods());

module.exports = router


