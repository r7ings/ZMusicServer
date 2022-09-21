const db = require('../db/index')

exports.getPlayingList = (req, ress) => {
    let uuid = req.user.uuid
    db.query('SELECT * FROM zmusic_userplayinglist WHERE uuid = ? ORDER BY id DESC', uuid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        if (res.length <= 0) return ress.send({ statusCode: 200 });
        let playingList = []
        for (let index in res) {
            playingList.push(
                {
                    mid: res[index].mid,
                    musicName: '',
                    musicAuthor: '',
                    musicUrl: '',
                    musicLyricUrl: '',
                    musicStatus: ''
                }
            )
        }
        let str = ''
        playingList.forEach(item => {
            str += item.mid + "','"
        });
        str = "'" + str.substring(-1, str.length - 2)
        // console.log(str);
        db.query(`SELECT * FROM zmusic_musicinfo WHERE mid in (${str}) `, (err, res) => {
            if (err) return ress.cc(statusCode = 101, '查表出错');
            //遍历插入数据
            for (let i = 0; i < playingList.length; i++) {
                for (const index in res) {
                    if (playingList[i].mid == res[index].mid) {
                        playingList[i].musicName = res[index].musicName
                        playingList[i].musicAuthor = res[index].musicAuthor
                        playingList[i].musicLyricUrl = '/ZMusicFiles/music/' + res[index].mid + '/' + res[index].musicLyricUrl
                        playingList[i].musicUrl = '/ZMusicFiles/music/' + res[index].mid + '/' + res[index].musicUrl
                        playingList[i].musicStatus = res[index].musicStatus
                    }
                }
            }
            // console.log(playingList);
            ress.send({
                statusCode: 500,
                playingList
            })
        })
        // ress.send({ playingList })
    })
}
exports.getFavouriteList = (req, ress) => {
    let uuid = req.user.uuid
    db.query('SELECT * FROM zmusic_favourite WHERE uuid = ? ORDER BY id DESC', uuid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错1');
        if (res.length <= 0) return ress.send({ statusCode: 200 });
        let favouriteList = []
        for (let index in res) {
            favouriteList.push(
                {
                    mid: res[index].mid,
                    musicName: '',
                    musicAuthor: '',
                    musicUrl: '',
                    musicLyricUrl: '',
                    musicStatus: ''
                }
            )
        }
        let str = ''
        favouriteList.forEach(item => {
            str += item.mid + "','"
        });
        str = "'" + str.substring(-1, str.length - 2)
        // '1','2','3','3dc9a5ef-5f92-4d45-b2ed-15219818d57b'
        db.query(`SELECT * FROM zmusic_musicinfo WHERE mid in (${str})`, (err, res) => {
            if (err) return ress.cc(statusCode = 101, '查表出错2');
            //遍历插入数据
            for (let i = 0; i < favouriteList.length; i++) {
                for (const index in res) {
                    if (favouriteList[i].mid == res[index].mid) {
                        favouriteList[i].musicName = res[index].musicName
                        favouriteList[i].musicAuthor = res[index].musicAuthor
                        favouriteList[i].musicLyricUrl = '/ZMusicFiles/music/' + res[index].mid + '/' + res[index].musicLyricUrl
                        favouriteList[i].musicUrl = '/ZMusicFiles/music/' + res[index].mid + '/' + res[index].musicUrl
                        favouriteList[i].musicStatus = res[index].musicStatus
                    }
                }
            }
            // console.log(playingList);
            ress.send({
                statusCode: 500,
                favouriteList
            })
        })
        // ress.send({ playingList })
    })
} 