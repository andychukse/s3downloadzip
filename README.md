# S3downloadzip

## Contributing

Thank you for considering to contribute.

## Installation

Type ```npm install andychukse/s3downloadzip ``` or ```yarn add andychukse/s3downloadzip``` 


## Usage

```
import s3DownloadMultiple from 's3downloadzip';
import aws from 'aws-sdk';


export async function downloadMultiple(req, res) {
  try {

  	const bucket = process.env.AWS_BUCKET;

  	var files = [{name: 'filename'}];

  	const s3 = new aws.S3({
	  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	  Bucket: bucket,
	  endpoint: process.env.AWS_ENDPOINT,
	});



	await s3DownloadMultiple(s3, files, bucket,res);

	} catch (err) {
    throw err;
  }

```