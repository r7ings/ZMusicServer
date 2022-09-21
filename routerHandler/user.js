const db = require('../db/index')
exports.login = (req, resp) => {
    db.query('SELECT 1', (err, res) => {
        if (err) return console.log('error');
        console.log(res);
    })
    resp.send('loginSuccess')
} 