require('dotenv').config();

const express = require('express');
const app = express();
const { s3DownloadMultiple } = require('./index');
// const express = require('express'),
//     app = express(),
//     {s3DownloadMultiple} = require('./index');
const aws = require('aws-sdk');
const httpMocks = require('node-mocks-http');

const PORT = 8200;

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//   Bucket: process.env.AWS_S3_BUCKET,
//   signatureVersion: 'v4',
// });

// console.log(process.env.AWS_S3_BUCKET);


// const res = httpMocks.createResponse();

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/download', async (req, res) => {

    const request = httpMocks.createRequest({
        method: 'GET',
        url: '/download',
    });

    const response = httpMocks.createResponse();

    const bucket = process.env.AWS_S3_BUCKET;

    const files = [
        {name: 'images/2022/2/simple-academic-resume-template-cwf1Y9.png'},
        {name: 'images/2022/1/modern-one-template-dark-exZZrw.png'}
        ];

        var fileName = 'sample_file'; //you can set optional zip file name here, if empty it will generate a random name

        const s3 = new aws.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        Bucket: bucket,
        signatureVersion: 'v4'
        // endpoint: process.env.AWS_S3_ENDPOINT,
      });



      await s3DownloadMultiple({
        s3: s3, 
        files: files, 
        bucket: bucket,
        res,
        fileName: fileName 
    });

});

var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});


module.exports = server 
// app.listen(PORT,()=>console.log("server running on Port: "+PORT))