const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const db = require('../db/index')
//上传头像所需
var multiparty = require("multiparty")
var fs = require('fs')

const dayjs = require('../node_modules/dayjs')
dayjs().locale('zh-cn').format()

var accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
var passwordReg = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,16}$/;
var nicknameReg = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){2,8}$/;

var handler = async (req, ress, type) => {
    var account, password, nickname = undefined
    if (type == 'web') {
        account = req.query.registerAccount
        password = req.query.registerPassword
        nickname = req.query.registerNickname
    } else if (type === 'app') {
        account = req.body.registerAccount
        password = req.body.registerPassword
        nickname = req.body.registerNickname
    }
    //正则判断查表数据是否符合规定 符合规定再操作数据库
    if (!accountReg.test(account) || !passwordReg.test(password) || !nicknameReg.test(nickname)) return ress.cc(statusCode = 154, '数据错误')
    try {
        var res1 = await db.asyncQuery('SELECT account FROM zmusic_userinfo WHERE account = ?', account)
        if (res1.length > 0) return ress.cc(statusCode = 171, '该账号已注册');
        let root = '4'
        let uuid = uuidv4()
        let salt = bcrypt.genSaltSync(12);
        let photoUrl = '/ZMusicFiles/avatar/defaultUserImg.png'
        password = bcrypt.hashSync(password, salt);
        // console.log('!!!!!!!', req.files[0].buffer);
        if (req.files && req.files.length === 1) {
            let avatarFileBuf = req.files[0].buffer
            fs.writeFileSync(__dirname + `/../../ZMusicFiles/avatar/${uuid}.png`, avatarFileBuf);
            photoUrl = `/ZMusicFiles/avatar/${uuid}.png`
        }
        await db.asyncQuery(`insert into zmusic_userinfo(uuid,account,photoUrl,nickname,password,root) 
        values(?,?,?,?,?,'4')`, [uuid, account, photoUrl, nickname, password])
        var time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        await db.asyncQuery('INSERT INTO zmusic_backstage_maindetail_dailyregister(uuid,date) VALUES(?,?)', [uuid, time])
        ress.send({
            statusCode: 200,
            nickname,
            photoUrl,
            root
        });
    } catch (err) {
        console.log('注册error', err)
        ress.cc(statusCode = 101, '注册失败');
    }
}
exports.registerRouterH = (req, ress) => {
    // console.log(111);
    handler(req, ress, 'web')

}
exports.register_app = (req, ress) => {
    handler(req, ress, 'app')
}