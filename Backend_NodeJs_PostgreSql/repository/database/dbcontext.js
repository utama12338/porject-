
var connect = require('./connect');
const sql = require('mssql');

async function query(cmd) {
    const client = await sql.connect(connect.myconfig);
    let res
    try {
        //await client.query('BEGIN')
        try {
            res = await client.query(cmd)
            //await client.query('COMMIT')
        } catch (err) {
            //await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}

async function excute(q, p) {
    let data = {}
    try {
        const { rows, rowCount } = await query(q, p)

        data.isSuccess = rowCount>0?true:false
        data.message = rowCount>0?'OK':'ไม่พบข้อมูล'
        data.rowCount = rowCount
        data.rows = rows
       
    } catch (err) {
        console.log(err,excute)
        data.isSuccess = false
        data.message = 'Database ' + err
        data.rowCount = 0
        data.rows = []
        
    } finally {
        return data
    }
}

module.exports = {

    query,
    excute
};