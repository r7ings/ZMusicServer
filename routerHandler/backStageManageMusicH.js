const db = require('../db/index')

exports.getMusicList = (req, ress) => {
    db.query('SELECT * FROM zmusic_musicinfo', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        // console.log(111222);
        ress.send(res)
    })
}
exports.changeMusicStatus = (req, ress) => {
    const mid = req.query.mid
    const musicStatus = req.query.targetVal
    // console.log(mid);
    db.query(`UPDATE zmusic_musicinfo SET musicStatus = '${musicStatus}' WHERE mid='${mid}'`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200
        })
    })
}
exports.editMusicInfo = (req, ress) => {
    const mid = req.query.mid
    const musicName = req.query.musicNameIpt
    const musicAuthor = req.query.musicAuthorIpt
    const musicUrl = req.query.musicUrlIpt
    const musicLyricUrl = req.query.musicLryicUrlIpt
    db.query(`UPDATE zmusic_musicinfo SET musicName='${musicName}',musicAuthor='${musicAuthor}',musicUrl='${musicUrl}',musicLyricUrl='${musicLyricUrl}' WHERE mid='${mid}'`, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200
        })
    })
} 