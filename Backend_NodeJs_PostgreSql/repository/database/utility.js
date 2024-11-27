function sendDbResponse(err, rowCount, data, callback) {
    if (err) {
        // console.log(err);
        // if (err) {
          //  throw err;
            callback();
        // }
       
    } else {
        if (rowCount < 1) {
           
            callback(null, false);
        }
        else {
            callback(null, data, rowCount);
        }
    }
}

function sendDbStoreResponse(err, rowCount, data, callback) {
    if (err) {
        console.log(err);
        // if (err) {
          //  throw err;
            callback();
        // }
       
    } else {
       
            callback(null, data, rowCount);
        
    }
}

function buildRow(columns, data) {
    var row = {};
    columns.forEach(function (column) {
        row[column.metadata.colName] = column.value
    });
    
    
    data.push(row);
  
}

module.exports = {
    sendDbResponse: sendDbResponse,
    buildRow: buildRow,
    sendDbStoreResponse:sendDbStoreResponse
}