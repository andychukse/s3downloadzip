require('dotenv').config();
const express = require('express'),
    app = express(),
    {s3DownloadMultiple} = require('./index');
const aws = require('aws-sdk');
const httpMocks = require('node-mocks-http');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  Bucket: process.env.AWS_S3_BUCKET,
  signatureVersion: 'v4',
});

console.log(process.env.AWS_S3_BUCKET);
const files = [
    {name: 'courses/files/2020/01/module_11582901183282-681582xr90110r8328q62.mp4'},
    {name: 'courses/files/2020/01/module_11582901320037-ej15820t9013382003vu7.mp4'}
    ];
const res = httpMocks.createResponse();

s3DownloadMultiple({
    s3: s3, 
    files: files, 
    bucket: process.env.AWS_S3_BUCKET,
    res,
    fileName: 'sample_file'
})
    .catch(err=>console.log(err));
    
app.listen(8200,()=>console.log("server running"))