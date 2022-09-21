const express = require('express')
const app = express()
//跨域中间件
const cors = require('cors')
app.use(cors())
//解析文件中间件
const multer = require('multer');
app.use(multer().any())
//解析token中间件
const config = require('./config')
const expressJWT = require('express-jwt')
//unless填入不需要验证token的请求地址
// /^\/replaceMe\/.*/
app.use(expressJWT({ secret: config.jwtSecretKey, }).unless(
    {
        path: [
            '/defaultPlay',
            '/register',
            '/register/register_app',
            '/register/uploadUserImg',
            '/searchMusic',
            '/departLyric',
            '/checkStatus',
            '/getDaily15',
            '/editInfo/changeAvatar',
            { url: /^\/login\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/register\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/backStage\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/defaultPlay\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/findMusic\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/departLyric\/.*/, methods: ['GET', 'POST'] },
            { url: /^\/backStageShowingManage\/.*/, methods: ['GET', 'POST'] },
        ],

    }
))
//解析表单中间件
app.use(express.urlencoded({
    extended: false
}))
//全局错误处理中间件
app.use((req, res, next) => {
    res.cc = (statusCode = 100, err) => {
        res.send({
            statusCode,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//用户路由
const userRouter = require('./router/user')
app.use(userRouter)
//token
const tokenApi = require('./router/tokenApi')
app.use(tokenApi)
//初始化播放器路由
const defaultPlayRouter = require('./router/defaultPlay')
app.use(defaultPlayRouter)
//登陆路由
const loginRouter = require('./router/loginRouter')
app.use(loginRouter)
//注册路由
const registerRouter = require('./router/registerRouter')
app.use(registerRouter)
//上传头像
const uploadUserImgRouter = require('./router/uploadUserImgRouter')
app.use(uploadUserImgRouter)
//修改信息
const editInfoRouter = require('./router/editInfo')
app.use(editInfoRouter)
//获取默认播放列表
const getDefaultPlayingList = require('./router/getList')
app.use(getDefaultPlayingList)
//后台新增歌曲
const backStageUploadMusic = require('./router/backStageUploadMusic')
app.use(backStageUploadMusic)
//搜索歌曲
const searchMusic = require('./router/searchMusic')
app.use(searchMusic)
//后台管理歌曲路由
const backStageManageMusic = require('./router/backStageManageMusic')
app.use(backStageManageMusic)
//前台编辑各种列表路由
const editList = require('./router/editList')
app.use(editList)
//发现音乐模块信息路由
const findMusic = require('./router/findMusic')
app.use(findMusic)
//后台管理各平台展示页信息路由
const backStageShowingManage = require('./router/backStageShowingManage')
app.use(backStageShowingManage)
//解析歌词路由
const departLyric = require('./router/departLyric')
app.use(departLyric)
//后台大屏可视化数据总路由
const backStageMainDetail = require('./router/backStageMainDetail')
app.use(backStageMainDetail)
//监测歌曲状态及记录播放歌曲信息路由
const checkStatus = require('./router/musicStatusCheck')
app.use(checkStatus)
//每日推荐15
const getDaily15 = require('./router/getDaily15')
app.use(getDaily15)

//错误处理
app.use(function (err, req, res, next) {
    //token错误
    if (err.name === 'UnauthorizedError') return res.send({ statusCode: 99, message: '登录态失效' })

})

//开启服务
app.listen(9990, () => {
    console.log('serve running at');
})