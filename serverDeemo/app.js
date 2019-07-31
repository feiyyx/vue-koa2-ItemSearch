const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const logger = require('koa-logger')
const cors = require('@koa/cors');
const koabody = require('koa-body');
const helmet = require('koa-helmet')
const static = require('koa-static')
const session = require('koa-session-minimal')
const MongoStore = require('koa-generic-session-mongo')
const path = require('path')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)
app.keys = ['some secret key'];
// middlewares
app.use(koabody({
  urlencoded:true,
  text: true,
  json: true,
  multipart: true, // 支持文件上传
  formidable:{
    uploadDir:path.join(__dirname,'public/images/'), // 设置文件上传目录
    keepExtensions: true,    // 保持文件的后缀
    maxFieldsSize:500 * 1024 * 1024, // 文件上传大小
    onFileBegin:(name,file) => { // 文件上传前的设置
      console.log(`name: ${name}`);
      //console.log(file);
    },
  }
}))
app.use(json())
app.use(logger())
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 6000,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
//app.use(koaBody());
app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
  }
}));
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

app.use(session({ 
  store: new MongoStore({
    host: 'localhost',
    db: 'deemo',
    collection: 'sessions',
    port: '27017',
  }),
  key: 'koa:sess',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
  cookie: {                   // 与 cookie 相关的配置
    domain: 'localhost',    // 写 cookie 所在的域名
    path: '/',              // 写 cookie 所在的路径
    maxAge: 60000,      // cookie 有效时长
    httpOnly: true,         // 是否只用于 http 请求中获取
    overwrite: true       // 是否允许重写
  }
}));

// logger
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST");
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

})


// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(8000);
console.log('Program run in 8000 port.');

module.exports = app
