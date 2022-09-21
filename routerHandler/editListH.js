const db = require('../db/index')
//取消喜欢
exports.cancelLike = (req, ress) => {
    let uuid = req.user.uuid
    let mid = req.query.mid
    db.query(`DELETE FROM zmusic_favourite WHERE uuid ='${uuid}'AND mid = '${mid}' `, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200
        })
    })
}
//从播放列表数据库移除
exports.removeFromPlayingList = (req, ress) => {
    let uuid = req.user.uuid
    let mid = req.query.mid
    db.query(`DELETE FROM zmusic_userplayinglist WHERE uuid ='${uuid}'AND mid = '${mid}' `, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200
        })
    })
}
//把播放列表变为指定列表（日推等）
exports.playList = async (req, ress) => {
    let uuid = req.user.uuid
    let list = req.query.list
    // return console.log(uuid, list);
    try {
        await db.asyncQuery(`DELETE FROM zmusic_userplayinglist WHERE uuid ='${uuid}'`)
        let str = ''
        for (var i = 0; i < list.length; i++) {
            str += `,('${uuid}','${JSON.parse(list[i]).mid}')`
        }
        db.asyncQuery(`INSERT INTO zmusic_userplayinglist(uuid,mid) VALUES ${str.slice(1)}`).then(res => {
            ress.send({ statusCode: 200 })
        })
    } catch (err) {
        if (err) return ress.cc(statusCode = 101, '出错了');
    }

}
//把正在播放的列表替换为用户的喜欢的列表
exports.playFavouriteList = async (req, ress) => {
    let uuid = req.user.uuid
    try {
        await db.asyncQuery(`DELETE FROM zmusic_userplayinglist WHERE uuid ='${uuid}'`)
        let res = await db.asyncQuery(`SELECT * FROM zmusic_favourite WHERE uuid ='${uuid}'`)
        let str = ''
        for (var i = 0; i < res.length; i++) {
            str += `,('${uuid}','${res[i].mid}')`
        }
        db.asyncQuery(`INSERT INTO zmusic_userplayinglist(uuid,mid) VALUES ${str.slice(1)}`).then(res => {
            ress.send({ statusCode: 200 })
        })
    } catch (err) {
        ress.cc(statusCode = 101, '出错了');
    }

}
//向播放列表添加一首歌
exports.playingListSingleAdd = (req, ress) => {
    let uuid = req.user.uuid
    let mid = req.query.mid
    db.query(`INSERT INTO zmusic_userplayinglist(uuid,mid) VALUES('${uuid}','${mid}')`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '添加出错');
        ress.send({ statusCode: 200 })
    })
}
//清空播放列表
exports.clearPlayingList = (req, ress) => {
    let uuid = req.user.uuid
    db.query(`DELETE FROM zmusic_userplayinglist WHERE uuid='${uuid}'`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '删除出错');
        ress.send({ statusCode: 200 })
    })
}