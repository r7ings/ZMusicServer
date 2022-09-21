const db = require('../db/index')
const fs = require('fs')
//判断歌词编码模式
const jschardet = require("jschardet")
//中文乱码
const iconv = require('iconv-lite');

exports.departLyric = (req, ress) => {
    const mid = req.query.mid
    //没有歌词的回调
    var nolyric = function () {
        ress.send({ statusCode: 222, message: '当前歌曲暂无歌词' })
    }
    fs.readFile(__dirname + `/../../ZMusicFiles/music/${mid}/${mid}.lrc`, { encoding: 'binary' }, (err, data) => {
        if (err) return nolyric();
        //监测编码格式
        let type = undefined
        let encoding = jschardet.detect(data).encoding
        encoding === 'UTF-8' ? type = 'utf-8' : type = 'gbk'
        // console.log(type);
        var buf = Buffer.from(data, 'binary')
        var str = iconv.decode(buf, type);
        //ansi 和utf8的编码格式都支持了
        //格式化歌词
        var formatLyricTime = function (time) { // 格式化歌词的时间 转换成 sss:ms
            const regMin = /.*:/
            const regSec = /:.*\./
            const regMs = /\./

            const min = parseInt(time.match(regMin)[0].slice(0, 2))
            let sec = parseInt(time.match(regSec)[0].slice(1, 3))
            const ms = time.slice(time.match(regMs).index + 1, time.match(regMs).index + 3)
            if (min !== 0) {
                sec += min * 60
            }
            return Number(sec + '.' + ms)
        }
        const regNewLine = /\n/
        const lineArr = str.split(regNewLine) // 每行歌词的数组
        const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/
        let lyricsObjArr = []
        lineArr.forEach(item => {
            if (item === '') return
            const obj = {}
            const time = item.match(regTime)
            obj.lyric = item.split(']')[1].trim() === '' ? '' : item.split(']')[1].trim()
            obj.time = time ? formatLyricTime(time[0].slice(1, time[0].length - 1)) : 0
            obj.uid = Math.random().toString().slice(-6)
            if (obj.lyric === '') {
                //这一行没有歌词
            } else {
                lyricsObjArr.push(obj)
            }
        })
        // console.log(lyricsObjArr);
        ress.send({ statusCode: 200, lyricArr: lyricsObjArr })
        //---------------------
    })

}