const db = require('../db/index')
exports.getBinaryFile = (req, resq) => {
    // console.log(req.query);
    //前端发来的请求参数 mid:音乐id
    let mid = req.query.mid
    // console.log(mid);
    db.query('SELECT * FROM zmusic_musicinfo WHERE mid=?', mid, (err, res) => {
        //出错返回
        if (err) return resq.cc(statusCode = 101, '查表出错');
        //不出错拿到查询到的misicUrl 去服务器本地读取歌曲链接并用send()响应给前端
        // console.log(res[0]);
        if (res[0] === undefined) return resq.cc(statusCode = 103, '未查询到歌曲')
        if (res[0].musicStatus == 1) return resq.cc(statusCode = 102, '歌曲状态异常')
        let musicName = res[0].musicName
        let musicAuthor = res[0].musicAuthor
        let mid = res[0].mid
        let musicLyricUrl = '' + mid + '/' + res[0].musicLyricUrl
        let musicUrl = '' + mid + '/' + res[0].musicUrl
        resq.send({
            statusCode: 200,
            musicName,
            musicAuthor,
            musicLyricUrl,
            musicUrl
        });
    })
}

exports.checkMusicStatus = (req, resq) => {
    let mid = req.query.mid
    // console.log(mid);
    // console.log(mid);
    db.query('SELECT * FROM zmusic_musicinfo WHERE mid=?', mid, (err, res) => {
        //出错返回
        // console.log(res);
        if (err) return resq.cc(statusCode = 101, '查表出错');
        if (res[0] === undefined) return resq.cc(statusCode = 103, '未查询到歌曲')
        let mid = res[0].mid
        let musicStatus = res[0].musicStatus
        let musicName = res[0].musicName
        let musicAuthor = res[0].musicAuthor
        let musicLyricUrl = '' + mid + '/' + res[0].musicLyricUrl
        let musicUrl = '' + mid + '/' + res[0].musicUrl
        // console.log(musicStatus);
        resq.send({
            statusCode: 200,
            mid,
            musicStatus,
            musicName,
            musicAuthor,
            musicLyricUrl,
            musicUrl
        });
    })
}
