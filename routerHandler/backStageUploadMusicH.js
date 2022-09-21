const { v4: uuidv4 } = require('uuid');
const db = require('../db/index')
const fs = require('fs')
const unlock = require('../unlock')

const path = require('path')
exports.backStageUploadMusic = (req, ress) => {
    let musicBuf
    let lyricBuf
    let lyricStr = req.query.lyricStr
    if (!req.files[0].buffer) return ress.cc(statusCode = 10, '文件上传失败');
    if (req.files.length > 1) lyricBuf = req.files[1].buffer
    musicBuf = req.files[0].buffer
    let musicInfo = JSON.parse(req.query.musicInfo)
    let musicName = musicInfo.musicName.trim()
    let musicAuthor = musicInfo.musicAuthor.trim()
    let musicType = musicInfo.musicType
    //逆向解锁网易云音乐ncm文件
    if (musicType === 'ncm') {
        // musicBuf = unlock.unlockNCM(musicBuf)
        //这里还返回了解析出来的歌曲图片buf musicBuf.imgBuf
        musicBuf = unlock.unlockNCM(musicBuf).musicBuf
        musicType = 'mp3'
        // console.log(musicBuf);
    }
    //检查歌曲是否已经存在在数据库
    db.query('SELECT * FROM zmusic_musicinfo WHERE musicName = ? AND musicAuthor = ?', [musicName, musicAuthor], (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        // console.log(res);
        // ress.send();
        if (res.length > 0) return ress.cc(statusCode = 171, '歌曲已存在');
        //歌曲不在数据库
        let mid = uuidv4()
        //创建歌曲目录
        fs.mkdirSync(__dirname + `/../../ZMusicFiles/music/${mid}`, err => {
            if (err) return ress.cc(statusCode = 10, '创建目录失败');
        })
        //写入歌曲buffer文件
        fs.writeFileSync(__dirname + `/../../ZMusicFiles/music/${mid}/${mid}.${musicType}`, musicBuf, (err) => {
            if (err) return ress.cc(statusCode = 10, '写入歌曲失败');
        });
        //写入歌词文件
        if (lyricBuf) {
            console.log('有歌词文件');
            fs.writeFileSync(__dirname + `/../../ZMusicFiles/music/${mid}/${mid}.lrc`, lyricBuf, (err) => {
                if (err) console.log(err, musicName, '写入歌词出错');
            });
        } else if (lyricStr) {
            console.log('有歌词字符串');
            fs.writeFileSync(__dirname + `/../../ZMusicFiles/music/${mid}/${mid}.lrc`, lyricStr, (err) => {
                if (err) console.log(err, musicName, '写入歌词出错');
            })
        } else {
            console.log(musicName, '--没有上传歌词');
        }
        //写入文件不出错的话写入歌曲信息到数据库
        db.query(`insert into zmusic_musicinfo(mid,musicName,musicAuthor,musicUrl,musicLyricUrl) 
        values(?,?,?,?,?)`, [mid, musicName, musicAuthor, mid + '.' + musicType, mid + '.lrc'],
            (err, res) => {
                if (err) return ress.cc(statusCode = 101, '写入数据库失败');
                if (res.affectedRows === 1) {
                    ress.send({
                        statusCode: 200,
                        message: `歌曲${musicName}上传成功,id:${mid}`,
                        mid
                    });
                }
            })
    })


}