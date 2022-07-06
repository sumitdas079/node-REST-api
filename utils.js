const fs = require('fs')


// to add product or write data to a json file
function writeData(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) { console.log(err); }
    })
}


// to get body data
function getpostdata(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', () => { resolve(body) })
        } catch (error) {
            reject(err)
        }
    })
}
module.exports = { writeData, getpostdata }