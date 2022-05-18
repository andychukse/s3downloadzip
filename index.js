'use strict';
const archiver = require('archiver'),
	  aws = require('aws-sdk'),
	  stream = require('stream');

const randomString = async (N) {
  return Array(N + 1)
    .join((Math.random().toString(36) + '00000000000000000').slice(2, 18))
    .slice(0, N);
}

module.exports = {
	  s3DownloadMultiple : async({s3, files, bucket,res}) => {
		  try {

		   let fileName = randomString(10);
		   let theFile = fileName +'.zip';

		   const Bucket = bucket;

		   res.attachment(theFile);
		   var archive = archiver('zip', {
		    store: true
		  });

		  files.forEach(function(file) {
		    if (file.name) {
		      var params = {
		        Bucket: Bucket,
		        Key: file.name
		      };

		      // Lazy requesting - only request when something is listening
		      var fStream = new stream.PassThrough();
		      var sent = false;
		      fStream.on('newListener', function(event) {
		        if (!sent && event === 'data') {
		          var req = s3.getObject(params);
		          var rStream = req.createReadStream();
		          rStream.pipe(fStream);
		          rStream.on('error', err => fStream.emit('error', err));
		          sent = true;
		        }
		      });

		      var fileDate = file.createdAt ? file.createdAt : new Date();

		      archive.append(fStream, {name: path.basename(file.name), date: fileDate});
		    } 
		  });

		  archive.pipe(res);
		  //archive.pipe(fs.createWriteStream(theFile));
		  archive.finalize();

		  } catch (err) {
		    throw err;
		  }
		}
	}