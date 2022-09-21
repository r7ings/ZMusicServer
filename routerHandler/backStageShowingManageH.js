const db = require('../db/index')

exports.changeCardName = (req, ress) => {
    const pid = req.query.pid
    const newName = req.query.newName
    db.query(`UPDATE zmusic_findmusiccards SET name='${newName}' WHERE id = '${pid}' `, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200
        })
    })
}
exports.changeCardList = (req, ress) => {
    const pid = req.query.pid
    const musicMidList = req.query.newList || []
    db.query(`DELETE FROM zmusic_findmusic_cardsinfo WHERE placeId ='${pid}' `, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '清空原列表时出错');
        let str = ''
        for (var i = 0; i < musicMidList.length; i++) {
            str += `,('${pid}','${musicMidList[i]}')`
        }
        db.query(`INSERT INTO zmusic_findmusic_cardsinfo(placeId,mid) VALUES ${str.slice(1)}`, (err, res) => {
            if (err) return ress.cc(statusCode = 101, '添加出错'), console.log(err);
            ress.send({ statusCode: 200 })
        })
    })
}
exports.singleAddToCard = (req, ress) => {
    const pid = req.query.pid
    const mid = req.query.mid
    db.query(`INSERT INTO zmusic_findmusic_cardsinfo(placeId,mid) VALUES('${pid}','${mid}')`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '添加出错');
        ress.send({ statusCode: 200 })
    })
}
