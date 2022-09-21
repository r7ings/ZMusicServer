const db = require('../db/index')

exports.searchMusic = (req, ress) => {
    //模糊查询歌名
    db.query(`select * from zmusic_musicinfo where musicName like '%${req.query.value}%' AND musicStatus != 1`, (err, res) => {
        console.log(111);
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res.length <= 0) return ress.cc(statusCode = 34, '模糊查询无结果');
        console.log(res);
        ress.send({
            statusCode: 200,
            searchResList: res
        })
    })
}
//添加到我喜欢的歌曲
exports.searchMusic_addToFavourite = (req, ress) => {
    var uuid = req.user.uuid
    var mid = req.query.mid
    db.query(`select * from zmusic_favourite where mid = '${mid}' AND uuid = '${uuid}'`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '请先登录');
        if (res.length > 0) return ress.send({ statusCode: 39, message: '已存在于我的喜欢' });
        db.query(`INSERT INTO zmusic_favourite(uuid,mid) VALUES('${uuid}','${mid}') `, (err, res) => {
            // console.log(err);
            if (err) return ress.cc(statusCode = 101, '写入数据库出错');
            // console.log(res);
            ress.send({
                statusCode: 200,
            })
        })
    })
}