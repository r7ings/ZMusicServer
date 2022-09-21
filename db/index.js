const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: '',
    password: '',
    database: ''
})
db.asyncQuery = (sql, params) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params || '', (err, res) => {
            if (err) return reject(err)
            resolve(res)
        })
    })
}
module.exports = db