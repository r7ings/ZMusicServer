const db = require('../db/index')
const bcrypt = require('bcryptjs');
//jwt
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')
const config = require('../config')

const dayjs = require('../node_modules/dayjs')
dayjs().locale('zh-cn').format()

var accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
var passwordReg = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,16}$/;
exports.loginRouterHandler = (req, ress) => {
    console.log('login');
    console.log(req.query)
    let account = req.query.loginAccount
    let password = req.query.loginPassword
    //正则判断查表数据是否符合规定 符合规定再查表
    if (!accountReg.test(account) || !passwordReg.test(password)) return ress.cc(statusCode = 154, '非法请求，数据错误')
    db.query('SELECT * FROM zmusic_userinfo WHERE account = ?', account, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        if (!bcrypt.compareSync(password, res[0].password)) return ress.cc(statusCode = 154, '密码不正确')
        let uuid = res[0].uuid
        let nickname = res[0].nickname
        let photoUrl = res[0].photoUrl || ''
        let recentPlay = res[0].recentPlay || ''
        let favourite = res[0].favourite || ''
        let customList = res[0].customList || ''
        let root = res[0].root
        //去除用户信息中的密码 生成token
        const jwtUserInfo = { ...res[0], password: '', photoUrl: '' }
        // console.log(jwtUserInfo);
        const tokenStr = jwt.sign(jwtUserInfo, config.jwtSecretKey, { expiresIn: '24h' })
        const token = 'Bearer ' + tokenStr
        //登陆统计
        var time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        db.query(`INSERT INTO zmusic_backstage_maindetail_dailylogin(uuid,date) VALUES(?,?) `, [uuid, time], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '写入出错');
            ress.send({
                statusCode: 200,
                account,
                nickname,
                photoUrl,
                recentPlay,
                favourite,
                customList,
                root,
                token
            });
        })
    })
}
exports.backStageLoginRouterHandler = (req, ress) => {
    let account = req.query.account
    let password = req.query.password
    if ((account != 'admin' && account != 'editor') || password.length < 6) return ress.cc(statusCode = 154, '账号或密码错误')
    db.query('SELECT * FROM zmusic_backstage_userinfo WHERE account = ?', account, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        if (password != res[0].password) return ress.cc(statusCode = 154, '密码不正确')
        let root = res[0].root
        ress.send({
            statusCode: 200,
            account,
            root,
        });
    })
}
exports.LoginTest = async (req, ress) => {
    console.log(11111111111);
    ress.send('111')
    await db.asyncQuery('select * from zmusic_userinfo where uuid = ?', '4a5ba52a-d007-401c-893a-9c35c6a555eb').then(res => {
        console.log(res);
    })
    console.log(66666666);
}