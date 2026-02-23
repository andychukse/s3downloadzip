'use strict';
const archiver = require('archiver'),
	  { GetObjectCommand } = require('@aws-sdk/client-s3'),
	  stream = require('stream');

const randomString = (N = 12) => {
  return Array(N + 1)
    .join((Math.random().toString(36) + '00000000000000000').slice(2, 18))
    .slice(0, N);
};
const path = require('path');

module.exports = {
  s3DownloadMultiple: async ({ s3, files, bucket, res, fileName = '' }) => {
    try {
      const name = fileName ? fileName : randomString(10);
      const theFile = name + '.zip';
      const Bucket = bucket;

      res.attachment(theFile);
      const archive = archiver('zip', { store: true });

      files.forEach(function (file) {
        if (file.name) {
          const params = {
            Bucket: Bucket,
            Key: file.name,
          };

          const fStream = new stream.PassThrough();

          // Kick off async S3 request and pipe body into PassThrough
          s3.send(new GetObjectCommand(params))
            .then((response) => {
              response.Body.pipe(fStream);
              response.Body.on('error', (err) => fStream.emit('error', err));
            })
            .catch((err) => fStream.emit('error', err));

          const fileDate = file.createdAt ? file.createdAt : new Date();

          archive.append(fStream, { name: path.basename(file.name), date: fileDate });
        }
      });

      archive.pipe(res);
      archive.finalize();
    } catch (err) {
      throw err;
    }
  },
};