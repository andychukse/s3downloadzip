const express = require('express'),
    app = express(),
    {s3DownloadMultiple} = require('./index');

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  Bucket: process.env.S3_BUCKET,
  signatureVersion: 'v4',
});

const files = {};

s3DownloadMultiple({
    s3: s3, 
    files: files, 
    bucket: process.env.S3_BUCKET,
    res})
    .catch(err=>console.log(err));
    
app.listen(8000,()=>console.log("server running"))