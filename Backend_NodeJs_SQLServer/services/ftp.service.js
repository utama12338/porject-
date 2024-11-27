const {format} = require('date-fns');
const fs = require('fs');
const path = require('path');
const client = require('ssh2-sftp-client');
const sftp = new client();
const dotenv = require("dotenv");
dotenv.config();

let config = {
    host: process.env.FTP_HOST_NAME,
    port: process.env.FTP_PORT,
    username: process.env.FTP_USER_NAME,
    privateKey: fs.readFileSync(process.env.FTP_KEY_PATH),
    readyTimeout: 99999,
    retries: 5,// integer. Number of times to retry connecting
    retry_factor: 5,// integer. Time factor used to calculate time between retries
    algorithms: {
        kex: [
          "diffie-hellman-group1-sha1",
          "ecdh-sha2-nistp256",
          "ecdh-sha2-nistp384",
          "ecdh-sha2-nistp521",
          "diffie-hellman-group-exchange-sha256",
          "diffie-hellman-group14-sha1"
        ],
        cipher: [
          "3des-cbc",
          "aes128-ctr",
          "aes192-ctr",
          "aes256-ctr",
          "aes128-gcm@openssh.com",
          "aes256-gcm@openssh.com"
        ],
        serverHostKey: [
          "ssh-rsa",
          "ecdsa-sha2-nistp256",
          "ecdsa-sha2-nistp384",
          "ecdsa-sha2-nistp521"
        ],
        hmac: [
          "hmac-sha2-256",
          "hmac-sha2-512",
          "hmac-sha1"
        ]
      }
      
}

module.exports = {
    getFtpFile,
    upload,
    getFtpList
};
async function getFtpFile(filePath,fileName,callback) {
  
    try {
        await sftp.connect(config);
        let remoteFile = path.join(filePath, fileName);
        const files = await sftp.get(remoteFile);
        sftp.end();
        console.log('files');
        console.log(files);
      callback(files);
       
    } catch (err_1) {
      console.log('err');
      console.log(err_1);
        sftp.end();
        callback(err_1);
    }

}

async function upload(directoryPath,pathName,fileName) {
  const start = Date.now()
  return  await sftp.connect(config).then(() => {
     
      console.log(fileName, 'upload');
    
      let localFile = directoryPath;
      let remoteFile = pathName+ fileName;
      console.log(localFile, 'localFile');
      console.log(remoteFile, 'remoteFile');
      return sftp.put(localFile, remoteFile);

  }).then( (result) => {
      const duration = Date.now() - start
      return result+' duration '+duration/1000+' sec'
  }).then((message) => {
      console.log(message);
      console.log('END')
      sftp.end();
      let data = {}
     
      data.isSuccess = true
      data.message = message
      return data
     
  }).catch((err) => {
      console.log(err, 'catch error');
       sftp.end();
      let data = {}
     
      data.isSuccess = false
      data.message = 'catch error '+err
      return data
  });

}

async function getFtpList(filePath) {
  return  await sftp.connect(config).then(() => {
      return sftp.list(filePath);
  }).then((files) => {
   
      var result = Object.keys(files).map((key) => { 
        return { index: key,
           file_name: files[key].name,
           file_size: (files[key].size / 1024).toFixed(2) + ' KB' ,
           modifyTime: format(new Date(files[key].modifyTime),'yyyy-MM-dd hh:mm:ss'),
           accessTime: format(new Date(files[key].accessTime),'yyyy-MM-dd hh:mm:ss')
          }
          })
     
     
      return result

  }).then((result) => {
      sftp.end();
     
      return result
  }).catch((err) => {
      sftp.end();
     
      return err
    
  });

}