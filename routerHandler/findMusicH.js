const db = require('../db/index')

exports.getCards = (req, ress) => {
    db.query(`SELECT * FROM zmusic_findmusiccards`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200,
            cards: res
        })
    })
}
//获取对应位置卡片的歌曲信息
exports.getInfos = (req, ress) => {
    const placeId = req.query.placeId
    db.query(`SELECT * FROM zmusic_findmusic_cardsinfo WHERE placeId='${placeId}' ORDER BY id`, (err, res) => {
        if (err) return console.log(err), ress.cc(statusCode = 101, '查表出错');
        if (res.length <= 0) return ress.send({ statusCode: 888 }) //当前曲库无歌曲
        let musicMidArr = []
        res.forEach(item => {
            musicMidArr.push(item.mid)
        });
        console.log(musicMidArr);
        //解决低版本mysql的sql语句In数组的问题
        let str = ''
        musicMidArr.forEach(item => {
            str += item + "','"
        });
        str = "'" + str.substring(-1, str.length - 2)
        db.query(`SELECT * FROM zmusic_musicinfo WHERE mid IN (${str}) ORDER BY id`, (err, res) => {
            if (err) return console.log(err), ress.cc(statusCode = 101, '查表出错');
            ress.send({
                statusCode: 200,
                showingList: res
            })
        })
    })
}