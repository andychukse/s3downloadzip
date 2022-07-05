# S3downloadzip

## Description
This package helps you download multiple files from AWS s3 or Digitalocean Spaces as a zip file without storing the files. 
You can download multiple files as a zip file.

## Contributing

Thank you for considering to contribute.

## Installation

Type ```npm install s3downloadzip ``` or ```yarn add s3downloadzip``` 


## Usage

```
'use strict';
import {s3DownloadMultiple} from 's3downloadzip';
import aws from 'aws-sdk';


export async function downloadMultiple(req, res) {
  try {

    const bucket = process.env.AWS_S3_BUCKET;

    var files = [
    {name: 'file'},
    {name: 'file'}
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

  } catch (err) {
    throw err;
  }
}

```