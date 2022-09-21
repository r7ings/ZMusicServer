const express = require('express')
const multer = require('multer')
const fs = require('fs')
const router = express.Router()
// const routerHandlers = require('../routerHandler/uploadUserImgRouterH')
// router.post('/uploadUserImg', routerHandlers.uploadUserImgRouterH)
router.post('/register/uploadUserImg', multer({
    //设置文件存储路径
    dest: 'public/img'
}).array('file', 1), function (req, res, next) {
    console.log(req);
    let files = req.files;
    console.log(files);
    let file = files[0];
    let fileInfo = {};
    let path = 'public/img/' + Date.now().toString() + '.png';
    fs.renameSync('./public/img/' + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = path;
    console.log(11);
    res.send({
        code: 0,
        msg: 'OK',
        data: fileInfo
    })
});
module.exports = router  