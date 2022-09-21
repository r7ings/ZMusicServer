const db = require('../db/index')
const dayjs = require('../node_modules/dayjs')
var customParseFormat = require('../node_modules/dayjs/plugin/customParseFormat')

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require("tencentcloud-sdk-nodejs");

const MonitorClient = tencentcloud.monitor.v20180724.Client;
const clientConfig = {
    credential: {
        secretId: "",
        secretKey: "",
    },
    region: "",
    profile: {
        httpProfile: {
            endpoint: "",
        },
    },
};

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取

dayjs.extend(customParseFormat)
var formatData = (res) => {
    var temp = []
    for (let i = 0; i < 7; i++) {
        temp[i] = { date: dayjs(Date.now()).subtract(i, 'day').format('YYYY-MM-DD'), detail: [] }
    }
    for (let i = 0; i < 7; i++) {
        res.forEach(item => {
            if (temp[i].date === item.date.format('YYYY-MM-DD')) {
                temp[i].detail.push({
                    uuid: item.uuid
                })
            }
        })
    }
    for (let i = 0; i < 7; i++) {
        temp[i].date = dayjs(temp[i].date, 'YYYY-MM-DD').format('MM-DD')
    }
    return temp.reverse()
}
let sqlStr_uuid = `SELECT date,zmusic_backstage_maindetail_dailylogin.uuid,zmusic_userinfo.account,zmusic_userinfo.nickname FROM zmusic_backstage_maindetail_dailylogin
JOIN
zmusic_userinfo
ON
zmusic_backstage_maindetail_dailylogin.uuid = zmusic_userinfo.uuid
WHERE
zmusic_backstage_maindetail_dailylogin.date>DATE_SUB(NOW(),INTERVAL 7 day) 
ORDER BY 
zmusic_backstage_maindetail_dailylogin.date ASC`
let sqlStr_mid = `SELECT date,zmusic_backstage_playRecord.mid,zmusic_musicinfo.musicName FROM zmusic_backstage_playRecord
JOIN
zmusic_musicinfo
ON
zmusic_backstage_playRecord.mid = zmusic_musicinfo.mid
WHERE
zmusic_backstage_playRecord.date>DATE_SUB(NOW(),INTERVAL 7 day) 
ORDER BY 
zmusic_backstage_playRecord.date ASC`
exports.getDailyLogin = (req, ress) => {
    db.query('SELECT * FROM zmusic_backstage_maindetail_dailylogin WHERE date>DATE_SUB(NOW(),INTERVAL 7 day) ORDER BY date ASC', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        res.forEach(item => {
            item.date = dayjs(item.date)
        })
        var dailyLoginArr = formatData(res, 'uuid')
        ress.send({
            statusCode: 200,
            // message: '?????',
            dailyLoginArr
        })
    })
}
exports.getDailyRegister = (req, ress) => {
    // console.log(123);
    db.query('SELECT * FROM zmusic_backstage_maindetail_dailyregister WHERE date>DATE_SUB(NOW(),INTERVAL 7 day) ORDER BY date ASC', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        res.forEach(item => {
            item.date = dayjs(item.date)
        })
        var dailyRegisterArr = formatData(res, 'uuid')
        ress.send({
            statusCode: 200,
            // message: '?????',
            dailyRegisterArr
        })
    })
}
exports.getCardListDetail = async (req, ress) => {
    // console.log(123);
    var cardListDetail = []
    db.query('SELECT * FROM zmusic_findmusiccards', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        res.forEach(item => {
            cardListDetail.push({
                pid: item.id,
                name: item.name,
                value: 0
            })
        })
        db.query('SELECT * FROM zmusic_findmusic_cardsinfo', (err, res) => {
            if (err) return ress.cc(statusCode = 101, '查表出错');
            res.forEach(item => {
                switch (item.placeId) {
                    case '1':
                        cardListDetail.forEach(item => {
                            if (item.pid == 1) item.value++
                        })
                        break;
                    case '2':
                        cardListDetail.forEach(item => {
                            if (item.pid == 2) item.value++
                        })
                        break;
                    case '3':
                        cardListDetail.forEach(item => {
                            if (item.pid == 3) item.value++
                        })
                        break;
                    case '4':
                        cardListDetail.forEach(item => {
                            if (item.pid == 4) item.value++
                        })
                        break;
                    case '5':
                        cardListDetail.forEach(item => {
                            if (item.pid == 5) item.value++
                        })
                        break;
                }
            })
            ress.send({
                statusCode: 200,
                cardListDetail
            })
        })
    })
}

exports.getTotalUser = (req, ress) => {
    // console.log(123);
    db.query('SELECT COUNT(*) FROM zmusic_userinfo', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        ress.send({
            statusCode: 200,
            userTotal: res[0]["COUNT(*)"]
        })
    })
}

exports.getTotalMusic = (req, ress) => {
    // console.log(123);
    db.query('SELECT COUNT(*) FROM zmusic_musicinfo', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        // console.log(res['COUNT(*)']);
        ress.send({
            statusCode: 200,
            musicTotal: res[0]["COUNT(*)"]
        })
    })
}
exports.getScrollData = (req, ress) => {
    // console.log(123);
    db.query(sqlStr_uuid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        res.forEach(item => {
            item.date = dayjs(item.date).format('MM-DD HH:mm')
        })
        // console.log(res['COUNT(*)']);
        ress.send({
            statusCode: 200,
            data: res
        })
    })
}
exports.getTencentData = async (req, ress) => {
}
exports.getDailyPlay = (req, ress) => {
    db.query(sqlStr_mid, (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        // console.log(res);
        res.forEach(item => {
            item.date = dayjs(item.date)
        })
        var playRecord = formatData(res)
        ress.send({
            statusCode: 200,
            // message: '?????',
            playRecord
        })
    })
}
exports.getTopFive = (req, ress) => {
    db.query('SELECT DISTINCT count( * ) AS count,a.mid,b.musicName,b.musicAuthor,b.musicUrl,b.musicLyricUrl FROM zmusic_backstage_playRecord a JOIN zmusic_musicinfo b ON a.mid=b.mid GROUP BY a.mid  ORDER BY count DESC LIMIT 5 ', (err, res) => {
        if (err) return ress.cc(statusCode = 101, '查表出错');
        console.log(res);
        var playCount = res
        ress.send({ statusCode: 200, playCount })
    })
}
