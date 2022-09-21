const db = require('../db/index')
const dayjs = require('../node_modules/dayjs')
dayjs().locale('zh-cn').format()

exports.tokenApiHandler = (req, ress) => {
    // console.log(req.user);
    let uuid = req.user.uuid
    db.query('SELECT * FROM zmusic_userinfo WHERE uuid = ?', uuid, (err, res) => {
        console.log(12232323);
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return ress.cc(statusCode = 153, '用户不存在')
        if (res[0].status == 1) return ress.cc(statusCode = 152, '用户状态异常')
        let account = res[0].account
        let nickname = res[0].nickname
        let photoUrl = res[0].photoUrl || ''
        let recentPlay = res[0].recentPlay || ''
        let favourite = res[0].favourite || ''
        let customList = res[0].customList || ''
        let root = res[0].root
        //登陆统计
        var time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        db.query(`INSERT INTO zmusic_backstage_maindetail_dailylogin(uuid,date) VALUES(?,?) `, [uuid, time], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '写入出错'), console.log(err);
            ress.send({
                statusCode: 200,
                account,
                nickname,
                photoUrl,
                recentPlay,
                favourite,
                customList,
                root
            })
        })

    })
    console.log(4566789);
}