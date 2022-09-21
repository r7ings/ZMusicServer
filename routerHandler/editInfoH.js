const db = require('../db/index')
const bcrypt = require('bcryptjs');
var fs = require('fs')

var accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
var passwordReg = /^(?![a-zA-Z]+$)(?!\d+$)(?![^\da-zA-Z\s]+$).{6,16}$/;
var nicknameReg = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){2,8}$/;

exports.editPassword = (req, ress) => {
    let account = req.query.userAccount
    let password = req.query.oldUserPassword
    let newPassword = req.query.userPassword
    if (password === newPassword) return ress.cc(statusCode = 105, '新旧密码相同');
    if (!accountReg.test(account) || !passwordReg.test(password) || !passwordReg.test(newPassword)) return ress.cc(statusCode = 154, '非法请求，数据错误')
    db.query('SELECT * FROM zmusic_userinfo WHERE account = ?', account, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        if (!bcrypt.compareSync(password, res[0].password)) return ress.cc(statusCode = 154, '旧密码不正确')
        let salt = bcrypt.genSaltSync(12);
        let photoUrl = res[0].photoUrl
        newPassword = bcrypt.hashSync(newPassword, salt);
        db.query('UPDATE zmusic_userinfo SET password=? WHERE account=?', [newPassword, account], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '修改出错');
            if (res.affectedRows === 1) {
                ress.send({
                    statusCode: 200,
                    photoUrl
                });
            } else {
                return ress.cc(statusCode = 101, '未知错误')
            }
        })
    })
}
exports.editNickname = (req, ress) => {
    let account = req.user.account
    let nickname = req.query.userNickname
    if (!nicknameReg.test(nickname)) return ress.cc(statusCode = 154, '非法请求，数据错误')
    db.query('SELECT * FROM zmusic_userinfo WHERE account = ?', account, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        let photoUrl = res[0].photoUrl
        db.query('UPDATE zmusic_userinfo SET nickname=? WHERE account=?', [nickname, account], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '修改出错');
            if (res.affectedRows === 1) {
                ress.send({
                    statusCode: 200,
                    nickname,
                    photoUrl
                });
            } else {
                return ress.cc(statusCode = 101, '未知错误')
            }
        })
    })
}
exports.changeAvatar = async (req, ress) => {
    var uuid = undefined
    if (req.user) {
        uuid = req.user.uuid
        console.log('?????????')
    } else if (req.body.account) {
        console.log('!!!!!!!!!', req.body.account)
        let res1 = await db.asyncQuery(`SELECT uuid FROM zmusic_userinfo WHERE account = ?`, req.body.account)
        console.log(res1);
        uuid = res1[0].uuid
    }
    console.log('@@@@', uuid, req.files[0].buffer)
    if (!req.files[0].buffer) return ress.cc(statusCode = 10, '文件上传失败');
    //文件上传成功 先删除原先的头像文件
    db.query('SELECT * FROM zmusic_userinfo WHERE uuid = ?', uuid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        //去掉22位网络地址字符串 剩下的是文件名
        let oldPhotoUrl = '/../..' + res[0].photoUrl.substr(22)
        fs.unlink(__dirname + oldPhotoUrl, err => {
            //这里出现err是因为第一次更换头像
            return console.log(err);
        })
        //解决缓存
        let str = Date.now()
        let avatarFileBuf = req.files[0].buffer
        fs.writeFile(__dirname + `/../../ZMusicFiles/avatar/${uuid}${str}.png`, avatarFileBuf, (err) => {
            if (err) return ress.cc(statusCode = 10, '写入头像失败');
        });
        let photoUrl = `/ZMusicFiles/avatar/${uuid}${str}.png`
        db.query('UPDATE zmusic_userinfo SET photoUrl=? WHERE uuid = ?', [photoUrl, uuid], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '更新数据库出错');
            ress.send({
                statusCode: 200,
                photoUrl
            })
        })
    })
}