import dotenv from 'dotenv';
import {
  GetObjectRequest,
  HeadObjectOutput,
  HeadObjectRequest,
  PutObjectOutput,
  PutObjectRequest,
  S3,
} from '@aws-sdk/client-s3';
import { StandardRetryStrategy } from '@aws-sdk/middleware-retry';
import fs from 'fs';

dotenv.config();

const FILE_NAME = 'test.txt';
const uploadData = {
  mimetype: 'application/octet-stream',
  data: fs.createReadStream(`files/${FILE_NAME}`),
};

const s3 = new S3({
  region: process.env.AWS_REGION,
  maxAttempts: 3,
  systemClockOffset: 0,
  retryStrategy: new StandardRetryStrategy(() => Promise.resolve(5)),
});

const s3Params = {
  Bucket: process.env.S3_BUCKET_NAME,
  Key: FILE_NAME,
  ContentType: uploadData.mimetype,
  ACL: 'public-read',
  Body: uploadData.data,
}

console.log('date: ', Date.now());

s3.putObject(s3Params);