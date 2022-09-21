const db = require('../db/index')
const dayjs = require('../node_modules/dayjs')

exports.getDaily15 = async (req, ress) => {
    var accountReg = /^[a-zA-Z0-9_-]{4,16}$/;
    const account = req.query.account || ''
    var sql = 'SELECT * FROM zmusic_musicinfo WHERE mid NOT IN(SELECT mid FROM zmusic_favourite WHERE uuid = ?) order by rand() limit 15'
    if (!account) {
        console.log('unlogin');
        db.query('select  *  from  zmusic_musicinfo order by rand() limit 15', (err, res) => {
            if (err) return ress.cc(statusCode = 101, '查表出错');
            console.log(res);
            ress.send({ statusCode: 200, daily15: res, date: dayjs(new Date()).format('YYYY/MM/DD') })
        })
    } else {
        if (!accountReg.test(account)) return ress.cc(statusCode = 78, '账户格式错误');
        console.log('logined');
        new Promise((resolve, reject) => {
            db.query('SELECT uuid FROM zmusic_userinfo WHERE account = ?', account, (err, res) => {
                if (err) return ress.cc(statusCode = 101, '查表出错');
                // console.log(res[0].uuid);
                resolve(res[0].uuid)
            })
        }).then(uuid => {
            console.log(uuid);
            db.query(sql, uuid, (err, res) => {
                if (err) return ress.cc(statusCode = 101, '查表出错'), console.log(err);
                // console.log('????????????');
                // console.log(res);
                ress.send({ statusCode: 200, daily15: res, date: dayjs(new Date()).format('YYYY/MM/DD') })
                // console.log('!!!!!!!!!!!!!');
            })
        })
    }
}