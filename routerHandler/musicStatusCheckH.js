const db = require('../db/index')
const dayjs = require('../node_modules/dayjs')
exports.musicStatusCheck = (req, ress) => {
    const mid = req.query.mid
    console.log(mid);
    db.query(`SELECT * FROM zmusic_musicinfo WHERE mid = ?`, mid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res[0].musicStatus === 1) return ress.send({ statusCode: 299 })
        var musicItem = res[0]
        console.log(musicItem);
        var time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        db.query('INSERT INTO zmusic_backstage_playrecord(mid,date) VALUES(?,?)', [mid, time], (err, res) => {
            if (err) return ress.cc(statusCode = 101, '查表出错');
            ress.send({ statusCode: 200, musicItem })
        })
    })
}